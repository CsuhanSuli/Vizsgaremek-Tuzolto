import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import LoggedInLayout from "../LoggedInLayout";
import ViewOneUser from "./ViewOneUser";

export default function AllUsers() {
    
    const locatipon = useLocation();
    const props = locatipon.state;


    const [exams, setExams] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/user/index`)
            .then(response => response.json())
            .then(data => setExams(data))
            .catch(error => console.error(error));
    }, [])


    return(
        <>
            <LoggedInLayout>
                <h1>Dolgozók</h1>
                {exams.map((row) => {
                    return(
                        <ViewOneUser
                            key = {row.id}
                            id = {row.id}
                            name = {row.name}
                            email = {row.email}
                            fortyHours = {row.fortyHours}
                            isAdmin = {row.isAdmin}
                        ></ViewOneUser>
                    )
                })}
            </LoggedInLayout>
        </>
    )
}