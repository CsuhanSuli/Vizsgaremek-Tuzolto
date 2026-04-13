import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ViewOneForumType from "./ViewOneForumType";
import LoggedInLayout from "../../LoggedInLayout";
import api, { isAdmin } from "../../../Login/api";

export default function AllForumType() {
    const [forum, setForum] = useState([]);
    const userIsAdmin = isAdmin();
    const navigate = useNavigate();

    useEffect(() => {
        api.get("forumType/index")
            .then((response) => setForum(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleNavigate = () => {
        navigate("/NewForumType");
    };

    return (
        <LoggedInLayout>
            <h1>Fórum típusok</h1>
            {forum.length > 0 ? (
                forum.map((row) => (
                    <ViewOneForumType
                        key={row.id}
                        id={row.id}
                        typeName={row.typeName}
                    />
                ))
            ) : (
                <p style={{ textAlign: "center", fontWeight:"bold" }}>Nincsenek elérhető fórum típusok.</p>
            )}

            {userIsAdmin && (
                <Button onClick={handleNavigate} variant="danger" className="mt-3">
                    Új típus hozzáadása
                </Button>
            )}
        </LoggedInLayout>
    );
}