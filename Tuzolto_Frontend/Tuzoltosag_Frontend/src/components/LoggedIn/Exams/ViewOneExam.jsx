import { useLocation } from "react-router-dom";

export default function ViewOneExam(props) {
    
    const location = useLocation();
    const loc = location.state;

    return(
        <>
        <h2>{props.name}</h2>
        </>
    )

}