import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ViewOneExamType from "./ViewOneExamType";
import LoggedInLayout from "../../LoggedInLayout";
import api, { isAdmin } from "../../../Login/api";

export default function AllExamType() {
    const [examType, setExamType] = useState([]);
    const userIsAdmin = isAdmin();
    const navigate = useNavigate();

    useEffect(() => {
        api.get("examType/index")
            .then(response => setExamType(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleNavigate = () => {
        navigate("/NewExamType");
    };

    return (
        <LoggedInLayout>
            <h1>Vizsga típusok</h1>
            {examType.length > 0 ? (
                examType.map((row) => (
                    <ViewOneExamType
                        key={row.id}
                        id={row.id}
                        typeName={row.typeName}
                    />
                ))
            ) : (
                <p style={{ textAlign: "center", fontWeight:"bold" }}>Nincsenek rögzített vizsga típusok.</p>
            )}
            
            {userIsAdmin && (
                <Button onClick={handleNavigate} variant="danger" className="mt-3">
                    Új típus hozzáadása
                </Button>
            )}
        </LoggedInLayout>
    );
}