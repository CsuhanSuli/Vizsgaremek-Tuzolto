import './App.css'
import AllMission from './components/LoggedOut/Missions/AllMission';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoggedOutLayout from './components/LoggedOut/LoggedOutLayout';
function App() {

  return (
    <>

      <LoggedOutLayout>
        <Router>
          <Routes>
            <Route path="" element={<AllMission />} />
            {/*<Route path="/FireFighters" element={<FireFighters/>} />
            <Route path="/Cars" element={<Cars/>} />
            <Route path="/Login" element={<Login/>} />*/}
          </Routes>
        </Router>
      </LoggedOutLayout>
    </>
  )
}

export default App
