import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ViewOneCar from "./ViewOneCar";
import LoggedInLayout from "../LoggedInLayout";


export default function AllCars() {

    const [cars, setCars] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/car/get")
            .then(resp => resp.json())
            .then(json => setCars(json))
            .catch(error => console.error(error))
    }, [])

    const navigate = useNavigate()
    const handleChange = () => {
        navigate("/NewCar")
    }

    return(
        <>
            <LoggedInLayout>
                <h1>Autók</h1>
                {cars.map((row) => (
                    <ViewOneCar
                        key={row.id}
                        id={row.id}
                        name={row.name}
                        imageName = {row.imageName}
                        typename = {row.cartypes.typename}
                    />
                ))}
                <Button onClick={handleChange} variant="danger">Új autó hozzáadása</Button>
            </LoggedInLayout>
        </>
    )
}