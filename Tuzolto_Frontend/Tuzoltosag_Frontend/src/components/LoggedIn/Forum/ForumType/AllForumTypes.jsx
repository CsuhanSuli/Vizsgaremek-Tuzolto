import { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ViewOneForumType from "./ViewOneForumType";
import LoggedInLayout from "../../LoggedInLayout";


export default function AllForumType() {

    const [forum, setForum] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/forumType/index")
            .then(resp => resp.json())
            .then(json => setForum(json))
            .catch(error => console.error(error))
    }, [])

    const navigate = useNavigate()
    const handleChange = () => {
        navigate("/NewForumType")
    }

    return(
        <>
            <LoggedInLayout>
                <h1>Fórum típusok</h1>
                {forum.map((row) => (
                    <ViewOneForumType
                        key={row.id}
                        id={row.id}
                        typeName={row.typeName}
                    />
                ))}
                <Button onClick={handleChange} variant="danger">Új típus hozzáadása</Button>
            </LoggedInLayout>
        </>
    )
}