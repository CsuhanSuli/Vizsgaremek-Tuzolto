import { useState, useEffect } from "react";
import ViewOneFirefighter from "./ViewOneFirefighter";

function AllFirefighter() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/forum/get")
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
        <ViewOneFirefighter key={row.id} firefighter={row}/>
      ))}
    </>
  );
}

export default AllFirefighter;