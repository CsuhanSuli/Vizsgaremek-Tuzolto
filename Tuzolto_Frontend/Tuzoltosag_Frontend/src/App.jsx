import "./App.css";
import AllMission from "./components/LoggedOut/Missions/AllMission";
import AllCar from "./components/LoggedOut/Cars/AllCar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoggedOutLayout from "./components/LoggedOut/LoggedOutLayout";
import LoginForm from "./components/Login/LoginForm";
import LoggedInLayout from "./components/LoggedIn/LoggedInLayout"



function App() {
  return (
    <>    {/*
      <Router>
        <Routes>
          <LoggedOutLayout>
            <Route path="" element={<AllMission />} />
            <Route path="/Cars" element={<AllCar />} />
            <Route path="/Login" element={<LoginForm/>} />
          </LoggedOutLayout>
                
          <LoggedInLayout>

          </LoggedInLayout>
        </Routes>
      </Router>

      <LoggedOutLayout>
            <Router>
              <Routes>
                <Route path="" element={<AllMission />} />
                <Route path="/Cars" element={<AllCar />} />
                <Route path="/Login" element={<LoginForm/>} />
              </Routes>
            </Router>
      </LoggedOutLayout>
*/}
      <LoggedInLayout>
        
      </LoggedInLayout>
      

    </>
  );
}

export default App;
