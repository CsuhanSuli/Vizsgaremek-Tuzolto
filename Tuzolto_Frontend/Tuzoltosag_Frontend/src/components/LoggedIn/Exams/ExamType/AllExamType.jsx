import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ViewOneExamType from "./ViewOneExamType";
import LoggedInLayout from "../../LoggedInLayout";


export default function AllExamType() {

    const [forum, setForum] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/examType/index")
            .then(resp => resp.json())
            .then(json => setForum(json))
            .catch(error => console.error(error))
    }, [])

    const navigate = useNavigate()
    const handleChange = () => {
        navigate("/NewExamType")
    }

    return(
        <>
            <LoggedInLayout>
                <h1>Vizsga típusok bejegyzések</h1>
                {forum.map((row) => (
                    <ViewOneExamType
                        key={row.id}
                        id={row.id}
                        typeName={row.typName}
                    />
                ))}
                <Button onClick={handleChange} variant="danger">Új típus hozzáadása</Button>
            </LoggedInLayout>
        </>
    )
}