import "./Timeline.css";
const Timeline = () => {
  return (
    <>
      <div className="timeline">
        <div className="timeline-container left-container">
          <h1 className="steps">1</h1>
          <div className="text-box">
            <h2>Upload the PDF</h2>
            <p>
              To start, click the upload button and select the PDF file from
              which you want to retrieve answers. The chatbot will analyze the
              document.
            </p>
          </div>
        </div>
        <div className="timeline-container right-container">
          <h1 className="steps">2</h1>
          <div className="text-box">
            <h2>Ask a Question</h2>
            <p>
              Once the PDF is uploaded, enter your question in the input field.
              The chatbot will process the document and extract relevant
              information.
            </p>
          </div>
        </div>
        <div className="timeline-container left-container">
          <h1 className="steps">3</h1>
          <div className="text-box">
            <h2>Receive Answers</h2>
            <p>
              After processing, the chatbot will provide an accurate answer
              based on the content of the uploaded PDF. You can repeat the
              process for more questions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Timeline;
