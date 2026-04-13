import ViewOneCarTool from "./ViewOneCarTool";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LoggedInLayout from "../LoggedInLayout";
import "./CarTools.css";
import { Button } from "react-bootstrap";
import api, { isAdmin } from "../../Login/api";

export default function AllCarTools() {
  const [carTools, setCarTools] = useState([]);
  const userIsAdmin = isAdmin();
  const { id } = useParams();

  const location = useLocation();
  const props = location.state;
  const navigate = useNavigate();

  const targetId = id || props?.id;

  const handleClick = () => {
    if (!targetId) return;
    navigate(`/NewTool/${targetId}`, { state: props });
  };

  useEffect(() => {
    if (!targetId) return;

    api.get(`tools/show/${targetId}`)
      .then(async (response) => {
        const tools = response.data;
        
        const enriched = await Promise.all(
          tools.map(async (tool) => {
            try {
              const res = await api.get(`review/latestDate/${tool.id}`);
              return {
                ...tool,
                reviewDate: res.data?.reviewDate ?? "Nincs adat",
              };
            } catch (err) {
              return {
                ...tool,
                reviewDate: "Nincs adat",
              };
            }
          })
        );

        setCarTools(enriched);
      })
      .catch((err) => console.error(err));
  }, [targetId]);

  return (
    <LoggedInLayout>
      <h1>{props?.name ? `${props.name} szerszámai` : "Autó szerszámai"}</h1>

      {carTools.length > 0 ? (
        carTools.map((item) => (
          <ViewOneCarTool
            key={item.id}
            id={item.id}
            name={item.name}
            place={item.car_place?.place}
            reviewDate={item.reviewDate}
            placeId={item.placeId}
            carId={item.carId}
          />
        ))
      ) : (
        <p style={{ textAlign: "center", fontWeight:"bold" }}>Nincsenek szerszámok az autóhoz.</p>
      )}

      {userIsAdmin && (
        <Button onClick={handleClick} variant="danger">
          Új eszköz hozzáadása
        </Button>
      )}
    </LoggedInLayout>
  );
}