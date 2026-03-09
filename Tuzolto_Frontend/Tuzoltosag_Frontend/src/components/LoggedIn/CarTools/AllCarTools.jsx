import ViewOneCarTool from "./ViewOneCarTool";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LoggedInLayout from "../LoggedInLayout";
import "./CarTools.css"

export default function CarTools() {
    const [carTools, setCarTools] = useState([]);


    const location = useLocation();
    const props = location.state;


    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/tools/show/" + props.id)
            .then(response => response.json())
            .then(data => setCarTools(data))
            .catch(error => console.error(error));
    }, [])

    return(
        <>  
        <LoggedInLayout>
            <h1>Autó szerszámai</h1>
            {carTools.map(item => {
                console.log(item);
                return (
                    <ViewOneCarTool
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        place={item.car_place.place}
                    ></ViewOneCarTool>
                )
            })}
        </LoggedInLayout>
        </>
    )
}