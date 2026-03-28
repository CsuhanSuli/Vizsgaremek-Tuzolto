import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllMission from "./components/LoggedOut/Missions/AllMission";
import AllCar from "./components/LoggedOut/Cars/AllCar";
import LoginForm from "./components/Login/LoginForm";
import AllCarTools from "./components/LoggedIn/CarTools/AllCarTools";
import LoggedInLayout from "./components/LoggedIn/LoggedInLayout";
import NewCarTool from "./components/LoggedIn/CarTools/NewCarTool";
import UpdateTool from "./components/LoggedIn/CarTools/UpdateTool";
import ToolDetails from "./components/LoggedIn/CarTools/ToolDetails";
import NewReviewDate from "./components/LoggedIn/CarTools/NewReviewDate";
import UpdateReviewDate from "./components/LoggedIn/CarTools/UpdateReviewDate"

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
                <Route path="/editCarTool/:id" element={<UpdateTool />} />
                <Route path="/carToolDetails/:id" element={<ToolDetails />} />
                <Route path="/newReviewDate/:id" element={<NewReviewDate/>} />
                <Route path="/updateReviewDate/:id" element={<UpdateReviewDate/>} />
              </Routes>
            </Router>

    </>
  );
}

export default App;
