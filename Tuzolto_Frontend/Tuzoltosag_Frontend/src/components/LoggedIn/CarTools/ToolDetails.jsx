import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import { Button, Col, Container, Row } from "react-bootstrap";

function ToolDetails() {
    const locatipon = useLocation();
    const props = locatipon.state;


    const [details, setDeatils] = useState();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/review/allDates/${props.id}`)
            .then(response => response.json())
            .then(data => setDeatils(data))
            .catch(error => console.error(error));
    }, [])

    /*
    const deleteClick = () => {
        const confirmDelete = window.confirm("Biztosan törli a dátumot?");
    
        if(!confirmDelete)            
            return;
    
        fetch(`http://127.0.0.1:8000/api/id=${props.id}`)
            navigate(`/carToolDetails/${props.id}`, {state:props})
            .catch(error => {console.error(error)});
    }*/

    return(
        <>
        <LoggedInLayout>
            <Container>
                <Row>
                    <Col lg={6} md={6} sm={12}>
                        <strong><h3>helye:</h3></strong>{}
                        <ul>
                            {details.map((row) => {
                                return(
                                    <li key={row.id}>
                                        {row.name}
                                    </li>
                                )
                            })}
                        </ul>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <Button variant="primary">Új ellenőrzés</Button>
                        <Button variant="secondary">Legutóbbi módosítása</Button>
                        <Button variant="danger">Legutóbbi törlése</Button>
                    </Col>
                </Row>
            </Container>
        </LoggedInLayout>
        </>
    )
}

export default ToolDetails