import { useEffect, useState } from "react";
import LoggedInLayout from "../LoggedInLayout";
import ViewOneForum from "./ViewOneForum";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function AllForum() {

    const [forum, setForum] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/forum/get")
            .then(resp => resp.json())
            .then(json => setForum(json))
            .catch(error => console.error(error))
    }, [])

    const navigate = useNavigate()
    const handleChange = () => {
        navigate("/NewForum")
    }

    return(
        <>
            <LoggedInLayout>
                <h1>Fórum bejegyzések</h1>
                {forum.map((row) => (
                    <ViewOneForum
                        key={row.id}
                        id={row.id}
                        header={row.header}
                        date={row.date}
                        place={row.place}
                        description={row.description}
                        imageName={row.imageName}
                        typeName={row.forum_type.typeName}
                        typeId={row.typeId}
                    />
                ))}
                <Button onClick={handleChange} variant="danger">Új bejegyzés hozzáadása</Button>
            </LoggedInLayout>
        </>
    )
}