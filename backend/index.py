import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
from langchain.vectorstores.faiss import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=API_KEY)

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.DEBUG)


def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            page_text = page.extract_text()
            if page_text:  
                text += page_text
    return text

def get_text_chunks(text):
    if not text.strip():
        raise ValueError("No text found in the provided PDF files")
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks

def get_conversational_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context. If the answer is not in
    the provided context, just say "Answer is not available in the context" without making up an answer.\n\n
    Context:\n {context}\n
    Question:\n {question}\n
    Answer:
    """
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.9)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain

def get_vector_store(text_chunks):
    if not text_chunks:
        raise ValueError("Text chunks are empty, cannot generate embeddings")
    
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_store.save_local("faiss_index")

@app.route('/process_pdfs', methods=['POST'])
def process_pdfs():
    try:
        pdf_files = request.files.getlist("pdf_files")
        if not pdf_files:
            return jsonify({"error": "No PDF files provided"}), 400
        
        for pdf in pdf_files:
            if not pdf.filename.endswith('.pdf'):
                return jsonify({"error": "Invalid file type. Only PDF files are allowed."}), 400
        
        raw_text = get_pdf_text(pdf_files)  
        if not raw_text:
            return jsonify({"error": "No valid text found in the provided PDFs"}), 400
        
        text_chunks = get_text_chunks(raw_text) 
        get_vector_store(text_chunks)  
        return jsonify({"message": "PDFs processed successfully"}), 200
    except Exception as e:
        logging.error(f"Error processing PDFs: {e}")
        return jsonify({"error": f"Error processing PDFs: {e}"}), 500

@app.route('/ask_question', methods=['POST'])
def ask_question():
    try:
        user_question = request.json.get("question")
        if not user_question:
            return jsonify({"error": "No question provided"}), 400
        
      
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
        docs = new_db.similarity_search(user_question)

        if not docs:
            return jsonify({"response": "No relevant data found for your question."}), 404

        chain = get_conversational_chain()
        response = chain({"input_documents": docs, "question": user_question}, return_only_outputs=True)
        return jsonify({"response": response["output_text"]}), 200
    except Exception as e:
        logging.error(f"Error answering question: {e}")
        return jsonify({"error": f"Error answering question: {e}"}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
