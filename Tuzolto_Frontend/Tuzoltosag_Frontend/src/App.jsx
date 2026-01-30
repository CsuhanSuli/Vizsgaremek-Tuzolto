import "./App.css";
import AllMission from "./components/LoggedOut/Missions/AllMission";
import AllCar from "./components/LoggedOut/Cars/AllCar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoggedOutLayout from "./components/LoggedOut/LoggedOutLayout";
import AllFirefighter from "./components/LoggedOut/Firefighters/AllFirefighter";



function App() {
  return (
    <>
      <LoggedOutLayout>
            <Router>
              <Routes>
                <Route path="" element={<AllMission />} />
                <Route path="/FireFighters" element={<AllFirefighter />} />
                <Route path="/Cars" element={<AllCar />} />
                {/*<Route path="/Login" element={<Login/>} />*/}
              </Routes>
            </Router>
      </LoggedOutLayout>
    </>
  );
}

export default App;
