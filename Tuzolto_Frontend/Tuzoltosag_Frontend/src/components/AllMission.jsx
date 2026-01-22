import { useState, useEffect } from "react";
import ViewOneMission from "./ViewOneMission";

function AllMission() {
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
        <ViewOneMission key={row.id} mission={row}/>
      ))}
    </>
  );
}

export default AllMission;