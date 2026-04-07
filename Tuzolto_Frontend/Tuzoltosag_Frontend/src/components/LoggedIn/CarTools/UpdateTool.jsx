import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";

function UpdateTool() {
    const navigate = useNavigate();
    const location = useLocation();
    const props = location.state;
    
    const [formData, setFormData] = useState({
        name: props.name,
        placeId: props.placeId,
        carId: props.carId,
    });

    const [answer, setAnswer] = useState("");

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;

        const newValue = type === "checkbox" ? (checked ? 1 : 0) : value;

        let updatedData = {
            ...formData,
            [name]: newValue
        };

        if (name === "isHappend" && newValue === 0) {
            updatedData.isSuccesfull = 0;
        }

        setFormData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/api/tools/put/${props.id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(formData),

        })
        .then(() => {
            props.name = formData.name
            props.placeId = formData.placeId
            props.carId = formData.carId
            setAnswer("Sikeres mentés!")
            navigate(`/CarTools/${props.carId}`, {state:props})
        })
        .catch(error => {
            console.error(error)
            setAnswer("Hiba a mentés során!")
        })

    }
    const [carPlace, setCarPlace] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/carplace/index")
        .then((response) => response.json())
        .then((data) => setCarPlace(data))
        .catch((error) => console.error(error));
    }, [])

        useEffect(() => {
        if (carPlace.length > 0) {
            let foundId = "";

            for (let i = 0; i < carPlace.length; i++) {
                if (carPlace[i].id === props?.placeId) {
                    foundId = carPlace[i].id;
                } else {
                    // semmi
                }
            }

            setFormData(prev => ({
                ...prev,
                placeId: foundId
            }));
        }
    }, [carPlace, props]);



      const [data, setData] = useState(null);

        useEffect(() => {
            fetch("http://127.0.0.1:8000/api/car/get")
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error));
        }, []); 

    return(
        <>
            <LoggedInLayout>
                <h1>Szerszám módosítása</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Szerszám neve:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Helye:</Form.Label>
                        <Form.Select
                            name="placeId"
                            value={formData.placeId}
                            onChange={handleChange}
                        >
                            {carPlace.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.place}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button disabled={!formData.placeId} variant="danger">Módosítások mentése</Button>
                </Form>
                {answer && <div>{answer}</div>}
            </LoggedInLayout>
        </>
    )


}

export default UpdateTool;