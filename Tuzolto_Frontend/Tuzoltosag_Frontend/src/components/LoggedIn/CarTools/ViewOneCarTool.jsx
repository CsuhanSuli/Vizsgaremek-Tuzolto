import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//import LoggedInLayout from "../LoggedInLayout";
import "./CarTools.css"

export default function ViewOneCarTool(props) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/editCarTool/${props.id}`, {state:props})
    }
    /*
    const deleteClick = () => {
        const confirmDelete = window.confirm("Biztosan törli ezt az eszközt?");
    
        if(!confirmDelete)            
            return;
    
        fetch(`http://127.0.0.1:8000/api/id=${props.id}`)
            .then(navigate('/carTools'))
            .catch(error => {console.error(error)});
    }*/

    return (
        <>
        <aside className="tableLeft">
                <Col lg={3} md={3} sm={3}>
                Neve
                <p>{props.name}</p>
                </Col>
                <Col lg={3} md={3} sm={3}>
                Helye
                <p>{props.place}</p>
                </Col>
                <Col lg={2} md={2} sm={2}>
                <p>2021.12.12.</p>
                </Col>
                <Col lg={2} md={2} sm={2}>
                    <p>Megjegyzés</p>
                </Col>
                <Col lg={2} md={2} sm={2}>
                    <Button onClick={handleClick}>Módosítás</Button>
                    {/*<Button onClick={deleteClick}>Törlés</Button>*/}
                </Col>
                
        </aside>
        </>
    )
}