import Chat from "./Chatbot.module.css";
import React, { useContext, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FileContext } from "../FileContext";
import { Conversation } from "../ConversationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

const Bot = () => {
  const fileTypes = ["PDF"];
  const { file, setFile } = useContext(FileContext);
  const [input, setInput] = useState("");
  const [spinner, setSpinner] = useState(false);
  const { conversations, setConversations } = useContext(Conversation);

  const handleChange = (files) => {
    if (files.length > 0) {
      setFile(Array.from(files));
    } else {
      toast.warn("Upload a file");
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const search = async () => {
    if (!file || file.length === 0) {
      toast.warn("Upload a file");
    } else if (input.length === 0) {
      toast.warn("Ask a question");
    } else {
      setSpinner(true);
      const formData = new FormData();
      file.forEach((f) => {
        formData.append("pdf_files", f);
      });

      try {
        const processResponse = await axios.post(
          "http://localhost:5000/process_pdfs",
          formData
        );
        if (processResponse.status === 200) {
          const response = await axios.post(
            "http://localhost:5000/ask_question",
            { question: input }
          );
          console.log("Response: ", response.data.response);
          setConversations([
            ...conversations,
            { input: input, answer: response.data.response },
          ]);
          setInput("");
        }
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          toast.error(error.response.data.error || "Error executing search");
        } else if (error.request) {
          console.error("Error request:", error.request);
          toast.error("No response from server");
        } else {
          console.error("Error message:", error.message);
          toast.error("Error executing search");
        }
      } finally {
        setSpinner(false);
      }
    }
  };

  const EnterEvent = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <>
      <div className={Chat.botcontainer}>
        <h1>Chat with PDF</h1>
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
        <p>
          {file.length > 0
            ? `File name: ${file[0].name}`
            : "No file uploaded yet"}
        </p>
        <div className={Chat.inputbox}>
          <Form.Floating>
            <Form.Control
              id="floatingPasswordCustom"
              type="text"
              placeholder="Message to Author"
              className={Chat.inputs}
              required
              value={input}
              onChange={handleInputChange}
              onKeyDown={EnterEvent}
            />
            <label htmlFor="floatingPasswordCustom">Ask a Question?</label>
          </Form.Floating>
          <button onClick={search}>
            <FontAwesomeIcon beat icon={faMagnifyingGlass} />
          </button>
        </div>
        <ToastContainer
          theme="colored"
          pauseOnFocusLoss
          draggable
          autoClose={5000}
          pauseOnHover
        />
        <div>
          {conversations
            .slice()
            .reverse()
            .map((chat, index) => (
              <div key={index}>
                <p>
                  <b>Question : </b>
                  {chat.input}
                </p>
                <p>
                  <b>Response : </b>
                  {chat.answer}
                </p>
              </div>
            ))}
        </div>
      </div>
      {spinner && <Spinner />}
    </>
  );
};

export default Bot;
