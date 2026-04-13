import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import ViewOneExam from "./ViewOneExam";
import api, { getUser } from "../../Login/api";

export default function AllExams() {
    const location = useLocation();
    const { id: urlId } = useParams();
    const [exams, setExams] = useState([]);
    
    const currentUser = getUser();
    const targetId = urlId || location.state?.id || currentUser?.id;

    const displayName = location.state?.name || (targetId === currentUser?.id ? "Saját" : "Felhasználó");

    useEffect(() => {
        if (!targetId) return;

        api.get(`examUser/show/${targetId}`)
            .then(response => {
                setExams(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [targetId]);

    return (
        <LoggedInLayout>
            <h1>{displayName} vizsgái</h1>
            {exams.length > 0 ? (
                exams.map((row) => (
                    <ViewOneExam
                        key={row.id}
                        id={row.id}
                        examDate={row.examDate}
                        exam_type={row.exam_type}
                    />
                ))
            ) : (
                <p style={{ textAlign: "center", fontWeight:"bold" }}>Nincsenek megjeleníthető adatok.</p>
            )}
        </LoggedInLayout>
    );
}