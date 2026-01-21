import { useState, useEffect } from "react";

function AllMission() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("")
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
        <ViewOneMission key={row.id} missio={row} />
      ))}
    </>
  );
}

export default AllMission;