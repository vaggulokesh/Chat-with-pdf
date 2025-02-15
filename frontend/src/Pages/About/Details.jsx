import Accordion from "react-bootstrap/Accordion";
import Questions from "../Questions.js";
import "./About.css";
const Details = () => {
  return (
    <Accordion defaultActiveKey="0">
      <div className="questions">
        {Questions.map((items) => (
          <Accordion.Item eventKey={items.id} key={items.eventKey}>
            <Accordion.Header className="dt-heading">
              {items.question}
            </Accordion.Header>
            <Accordion.Body className="dt-headings">
              {items.answer}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </div>
    </Accordion>
  );
};
export default Details;
