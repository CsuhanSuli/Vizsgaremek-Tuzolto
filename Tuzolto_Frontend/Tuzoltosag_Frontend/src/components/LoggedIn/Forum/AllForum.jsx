import { useEffect, useState } from "react";
import LoggedInLayout from "../LoggedInLayout";
import ViewOneForum from "./ViewOneForum";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../Login/api";

export default function AllForum() {
    const [forum, setForum] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("forum/get")
            .then((response) => setForum(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleNavigate = () => {
        navigate("/NewForum");
    };

    return (
        <>
            <LoggedInLayout>
                <h1>Fórum bejegyzések</h1>
                {forum.length > 0 ? (
                    forum.map((row) => (
                        <ViewOneForum
                            key={row.id}
                            id={row.id}
                            header={row.header}
                            date={row.date}
                            place={row.place}
                            description={row.description}
                            imageName={row.imageName}
                            typeName={row.forum_type?.typeName}
                            typeId={row.typeId}
                        />
                    ))
                ) : (
                    <p>Nincsenek megjeleníthető bejegyzések.</p>
                )}
                <Button onClick={handleNavigate} variant="danger" className="mt-3">
                    Új bejegyzés hozzáadása
                </Button>
            </LoggedInLayout>
        </>
    );
}