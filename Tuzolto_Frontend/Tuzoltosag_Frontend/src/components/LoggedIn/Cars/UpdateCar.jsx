import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";

function UpdateCar() {

    const location = useLocation();
  const props = location.state;


    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: props.name,
        typeId: props.typeId,
        imageName: props.imageName,
    });

    const [answer, setAnswer] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
/*
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            imageName: e.target.files[0]
        });
    };*/

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/api/schedule/put/${props.id}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),

        })
        .then(() => {
            props.name = formData.name;
            props.typeId = formData.typeId;
            props.imageName = formData.imageName;

            navigate(`/CarsLoggedIn`)
        })
        .catch(error => {
            console.log(formData)
            console.error(error)
            setAnswer("Hiba a mentés során!")
        })

    }
    const [carType, setCarType] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/cartype/index")
        .then((response) => response.json())
        .then((data) => setCarType(data))
        .catch((error) => console.error(error));
    }, [])

    return(
        <>
            <LoggedInLayout>
                <h1>Új autó hozzáadása</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Autó neve:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Típusa:</Form.Label>
                        <Form.Select
                            name="typeId"
                            value={formData.typeId}
                            onChange={handleChange}
                        >
                            <option value="" disabled>---Válasszon!---</option>
                            {carType.map((props) => (
                                <option key={props.id} value={props.id}>
                                    {props.typename}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className="mb-3">
                    <Form.Label>Kép feltöltés:</Form.Label>
                    <Form.Control
                            required
                            type="text"
                            name="imageName"
                            value={formData.imageName}
                            onChange={handleChange}
                        />
                    {/*<Form.Control
                        type="file"
                        name="imageName"
                        onChange={handleFileChange}
                    />*/}
                    </Form.Group>
                    <Button disabled={!formData.typeId} type="submit" variant="danger">Hozzáadás</Button>
                </Form>
                {answer && <div>{answer}</div>}
            </LoggedInLayout>
        </>
    )


}

export default UpdateCar;