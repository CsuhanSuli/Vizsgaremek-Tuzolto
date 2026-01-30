import { useState, useEffect } from "react";
import ViewOneCar from "./ViewOneCar";

function AllCar() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/car/get")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []); 

  
  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data.map((row) => (
        <ViewOneCar key={row.id} car={row}/>
      ))}
    </>
  );
}

export default AllCar;