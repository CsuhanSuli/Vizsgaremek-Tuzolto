import { Row, Col, Button } from "react-bootstrap";

export default function ViewOneExamType(props) {

    /*
    const deleteClick = () => {
        const confirmDelete = window.confirm("Biztosan törli ezt a vizsgát?");
    
        if(!confirmDelete)            
            return;
    
        fetch(`http://127.0.0.1:8000/api/id=${props.id}`)
            navigate(`/carToolDetails/${props.id}`, {state:props})
            .catch(error => {console.error(error)});
    }
    */

    return(
        <>

            <Row className="row">
                <Col lg={6} md={6} sm={12}>
                    <p><strong>{props.typeName}</strong></p>
                </Col>

                <Col lg={4} md={6} sm={12}>
                    <Button variant="danger">Törlés</Button>
                </Col>
                <br />
                <hr />
            </Row>
        </>
    )

}