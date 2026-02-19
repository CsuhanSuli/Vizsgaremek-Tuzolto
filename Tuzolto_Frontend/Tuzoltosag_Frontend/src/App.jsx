import "./App.css";
import AllMission from "./components/LoggedOut/Missions/AllMission";
import AllCar from "./components/LoggedOut/Cars/AllCar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoggedOutLayout from "./components/LoggedOut/LoggedOutLayout";
import Login from "./components/Login/Login";




function App() {
  return (
    <>
      <LoggedOutLayout>
            <Router>
              <Routes>
                <Route path="" element={<AllMission />} />
                <Route path="/Cars" element={<AllCar />} />
                <Route path="/Login" element={<Login/>} />
              </Routes>
            </Router>
      </LoggedOutLayout>
    </>
  );
}

export default App;
