import "./App.css";
import AllMission from "./components/LoggedOut/Missions/AllMission";
import AllCar from "./components/LoggedOut/Cars/AllCar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/Login/LoginForm";
import AllCarTools from "./components/LoggedIn/CarTools/AllCarTools";
import LoggedInLayout from "./components/LoggedIn/LoggedInLayout";
import NewCarTool from "./components/LoggedIn/CarTools/NewCarTool";
import UpdateNobel from "../../../../../React/Nobel/Nobel/src/components/UpdateNobel";

function App() {
  return (
    <>
            <Router>
              <Routes>
                <Route path="" element={<AllMission />} />
                <Route path="/Cars" element={<AllCar />} />
                <Route path="/Login" element={<LoginForm/>} />
                <Route path="/LoggedIn" element={<LoggedInLayout />} />
                <Route path="/carTools/:id" element={<AllCarTools />} />
                <Route path="/newTool/:id" element={<NewCarTool />} />
                <Route path="/editCarTool/:id" element={<UpdateNobel />} />
              </Routes>
            </Router>

    </>
  );
}

export default App;
