import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import LoggedInLayout from "../../LoggedInLayout";
import api from "../../../Login/api";

function NewForumType() {
  const [formData, setFormData] = useState({
    typeName: "",
  });

  const [answer, setAnswer] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    api.post("forumType/store", formData)
      .then(() => {
        setFormData({
          typeName: "",
        });
        setAnswer("Sikeres mentés!");
      })
      .catch((error) => {
        console.error(error);
        setAnswer("Hiba a mentés során!");
      });
  };

  return (
    <>
      <LoggedInLayout>
        <h1>Új fórum típus hozzáadása</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Típus neve:</Form.Label>
            <Form.Control
              required
              type="text"
              name="typeName"
              value={formData.typeName}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit" variant="danger">
            Hozzáadás
          </Button>
        </Form>
        {answer && <div className="mt-3">{answer}</div>}
      </LoggedInLayout>
    </>
  );
}

export default NewForumType;