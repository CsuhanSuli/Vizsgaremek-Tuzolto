import "./App.css";
import AllMission from "./components/LoggedOut/Missions/AllMission";
import AllCar from "./components/LoggedOut/Cars/AllCar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/Login/LoginForm";
import ViewOneCarTool from "./components/LoggedIn/CarTools/ViewOneCarTool";
import LoggedInLayout from "./components/LoggedIn/LoggedInLayout"

function App() {
  return (
    <>
            <Router>
              <Routes>
                <Route path="" element={<AllMission />} />
                <Route path="/Cars" element={<AllCar />} />
                <Route path="/Login" element={<LoginForm/>} />
                <Route path="/LoggedIn" element={<LoggedInLayout />} />
                <Route path="/carTools/:id" element={<ViewOneCarTool />} />
              </Routes>
            </Router>

    </>
  );
}

export default App;
