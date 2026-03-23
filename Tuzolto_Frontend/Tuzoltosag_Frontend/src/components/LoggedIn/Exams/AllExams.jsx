import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

export default function ToolDetails() {
    
    const locatipon = useLocation();
    const props = locatipon.state;


    const [exams, setExams] = useState();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/examUser/show/${props.id}`)
            .then(response => response.json())
            .then(data => setExams(data))
            .catch(error => console.error(error));
    }, [])

    return(
        <>
        
        </>
    )
}