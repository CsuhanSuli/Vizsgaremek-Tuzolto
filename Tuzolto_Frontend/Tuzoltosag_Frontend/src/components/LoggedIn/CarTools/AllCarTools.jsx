import ViewOneCarTool from "./ViewOneCarTool";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LoggedInLayout from "../LoggedInLayout";
import "./CarTools.css"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"



export default function AllCarTools() {
    const [carTools, setCarTools] = useState([]);

  const location = useLocation();
  const props = location.state;


    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/NewTool/${props.id}`, {state:props})
    }
    
useEffect(() => {
  fetch(`http://127.0.0.1:8000/api/tools/show/${props.id}`)
    .then(async (res) => {
      //console.log("STATUS:", res.status);

      if (!res.ok) {
        throw new Error("API hiba");
      }

      return res.json();
    })
    .then(async (tools) => {
      //console.log("TOOLS:", tools);

      const enriched = await Promise.all(
        tools.map(async (tool) => {
          const res = await fetch(
            `http://127.0.0.1:8000/api/review/latestDate/${tool.id}`
          );

          // console.log("review status:", res.status, tool.id);

          let review = null;
          if (res.ok) {
            review = await res.json();
          }

          return {
            ...tool,
            reviewDate: review?.reviewDate ?? "Nincs adat"
          };
        })
      );

      //console.log("ENRICHED:", enriched);
      setCarTools(enriched);
    })
    .catch(err => console.error("ERROR:", err));
}, []);
    /*
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/tools/show/" + props.id)
            .then(response => response.json())
            .then(data => setCarTools(data))
            .catch(error => console.error(error));
    }, [])*/

    return(
        <>  
        <LoggedInLayout>
            <h1>Autó szerszámai</h1>
            {carTools.map(item => {
                return (
                  console.log(item.carId),
                    <ViewOneCarTool
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        place={item.car_place.place}
                        reviewDate={item.reviewDate}
                        placeId = {item.placeId}
                        carId = {item.carId}
                    ></ViewOneCarTool>
                )
            })}
            <Button onClick={handleClick} variant="danger">Új eszköz hozzáadása</Button>
        </LoggedInLayout>
        </>
    )
}