import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import ViewOneExam from "./ViewOneExam";

export default function AllExams() {
    
    const locatipon = useLocation();
    const props = locatipon.state;


    const [exams, setExams] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/examUser/show/2`)
            .then(response => response.json())
            .then(data => setExams(data))
            .catch(error => console.error(error));
    }, [])
    /*
        const getClassName = (row) => {
        if (row.dontHave === 0) return "dontHave";
        return "have";
        className={getClassName(row)}
        };*/

    return(
        <>
            <LoggedInLayout>
                <h1>Vizsgáim</h1>
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