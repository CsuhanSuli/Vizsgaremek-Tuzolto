import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ViewOneCar from "./ViewOneCar";
import LoggedInLayout from "../LoggedInLayout";
import api, { isAdmin } from "../../Login/api";

export default function AllCars() {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();
    const userIsAdmin = isAdmin();

    useEffect(() => {
        api.get("car/get")
            .then(resp => {
                setCars(resp.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleChange = () => {
        navigate("/NewCar");
    };

    return (
        <>
            <LoggedInLayout>
                <h1>Autók</h1>
                {cars.length > 0 ? (
                    cars.map((row) => (
                        <ViewOneCar
                            key={row.id}
                            id={row.id}
                            name={row.name}
                            imageName={row.imageName}
                            typename={row.cartypes?.typename || "Ismeretlen típus"}
                        />
                    ))
                ) : (
                    <p>Betöltés...</p>
                )}
                
                {userIsAdmin && (
                    <Button onClick={handleChange} variant="danger" className="mt-3">
                        Új autó hozzáadása
                    </Button>
                )}
            </LoggedInLayout>
        </>
    );
}