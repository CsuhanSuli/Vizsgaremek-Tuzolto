import ViewOneCarTool from "./ViewOneCarTool";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoggedInLayout from "../LoggedInLayout";
import "./CarTools.css";
import { Button } from "react-bootstrap";

export default function AllCarTools() {
  const [carTools, setCarTools] = useState([]);

  const location = useLocation();
  const props = location.state;

  const navigate = useNavigate();

  const handleClick = () => {
    if (!props.id) return;
    navigate(`/NewTool/${props.id}`, { state: props });
  };

  useEffect(() => {
    if (!props.id) return;

    fetch(`http://127.0.0.1:8000/api/tools/show/${props.id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("API hiba");
        return res.json();
      })
      .then(async (tools) => {
        const enriched = await Promise.all(
          tools.map(async (tool) => {
            const res = await fetch(
              `http://127.0.0.1:8000/api/review/latestDate/${tool.id}`
            );

            let review = null;
            if (res.ok) {
              review = await res.json();
            }

            return {
              ...tool,
              reviewDate: review?.reviewDate ?? "Nincs adat",
            };
          })
        );

        setCarTools(enriched);
      })
      .catch((err) => console.error("ERROR:", err));
  }, [props.id]);

  return (
    <LoggedInLayout>
      <h1>Autó szerszámai</h1>

      {carTools.map((item) => (
        <ViewOneCarTool
          key={item.id}
          id={item.id}
          name={item.name}
          place={item.car_place?.place}
          reviewDate={item.reviewDate}
          placeId={item.placeId}
          carId={item.carId}
        />
      ))}

      <Button onClick={handleClick} variant="danger">
        Új eszköz hozzáadása
      </Button>
    </LoggedInLayout>
  );
}