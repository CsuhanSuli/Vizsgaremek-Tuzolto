import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import LoggedInLayout from "../../LoggedInLayout";

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
    console.log(formData);
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/forumType/store", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        console.log(formData);
        setFormData({
          typeName: "",
        });
        setAnswer("Sikeres mentés!");
      })
      .catch((error) => {
        console.log(formData);
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
          <Button type="submit" variant="danger" onClick={handleSubmit}>
            Hozzáadás
          </Button>
        </Form>
        {answer && <div>{answer}</div>}
      </LoggedInLayout>
    </>
  );
}

export default NewForumType;
