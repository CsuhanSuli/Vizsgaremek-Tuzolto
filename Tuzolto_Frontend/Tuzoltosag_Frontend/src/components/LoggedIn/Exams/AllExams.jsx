import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import ViewOneExam from "./ViewOneExam";

export default function AllExams() {
    
    const location = useLocation();
    const props = location.state;


    const [exams, setExams] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/examUser/show/${props.id}`)
            .then(response => response.json())
            .then(data => setExams(data))
            .catch(error => console.error(error));
    }, [])


    return(
        <>
            <LoggedInLayout>
                <h1>{props.name} vizsgái</h1>
                {exams.map((row) => {
                    return(
                        <ViewOneExam
                            key = {row.id}
                            id = {row.id}
                            examDate = {row.examDate}
                        ></ViewOneExam>
                    )
                })}
            </LoggedInLayout>
        </>
    )
}