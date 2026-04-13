import { useEffect, useState } from "react"
import LoggedInLayout from "../LoggedInLayout";
import ViewOneUser from "./ViewOneUser";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import api from "../../Login/api"; // Axios példány importálása

export default function AllUsers() {

    const navigate = useNavigate()

    const handleChange = () => {
        navigate("/NewUserExam")
    }

    const [exams, setExams] = useState([]);

    useEffect(() => {
        // Átírva axios-ra (api példány használatával)
        api.get("user/index")
            .then(response => {
                // Axiosnál az adatok a response.data-ban vannak
                setExams(response.data);
            })
            .catch(error => {
                console.error("Hiba a dolgozók lekérésekor:", error);
            });
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
                <Button variant="danger" onClick={handleChange}>Új vizsga bejegyzése</Button>
            </LoggedInLayout>
        </>
    )
}