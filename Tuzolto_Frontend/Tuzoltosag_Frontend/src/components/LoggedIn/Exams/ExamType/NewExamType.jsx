import { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoggedInLayout from "../../LoggedInLayout";
import api from "../../../Login/api";

function NewExamType() {
  const navigate = useNavigate();
  
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
    setAnswer("");
    
    api.post("examType/store", formData)
      .then(() => {
        setFormData({
          typeName: "",
        });
        setAnswer("Sikeres mentés!");

        setTimeout(() => {
          navigate("/ExamType");
        }, 1500);
      })
      .catch((error) => {
        console.error("Mentési hiba:", error.response || error);
        const errorMsg = error.response?.data?.message || "Hiba a mentés során!";
        setAnswer(errorMsg);
      });
  };

  return (
    <LoggedInLayout>
      <Container className="py-4">
        <h1 className="mb-4">Új vizsga típus hozzáadása</h1>
        
        <Form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
          <Form.Group className="mb-3">
            <Form.Label><strong>Típus neve:</strong></Form.Label>
            <Form.Control
              required
              type="text"
              name="typeName"
              value={formData.typeName}
              onChange={handleChange}
              placeholder="Például: Tűzvédelmi szakvizsga"
            />
          </Form.Group>
          
          <div className="d-flex gap-2">
            <Button type="submit" variant="danger">
              Hozzáadás
            </Button>
            <Button variant="secondary" onClick={() => navigate("/ExamType")}>
              Mégse
            </Button>
          </div>
        </Form>

        {answer && (
          <div className={`mt-3 alert ${answer.includes("Hiba") ? "alert-danger" : "alert-success"}`}>
            {answer}
          </div>
        )}
      </Container>
    </LoggedInLayout>
  );
}

export default NewExamType;