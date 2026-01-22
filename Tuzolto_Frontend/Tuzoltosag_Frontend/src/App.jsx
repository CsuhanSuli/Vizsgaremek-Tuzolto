import './App.css'
import AllMission from './components/AllMission';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogoutLayout from './components/LogoutLayout';
function App() {

  return (
    <>

      <LogoutLayout>
        <Router>
          <Routes>
            <Route path="/Home" element={<AllMission />} />
            {/*<Route path="/FireFighters" element={<FireFighters/>} />
            <Route path="/Cars" element={<Cars/>} />
            <Route path="/Login" element={<Login/>} />*/}
          </Routes>
        </Router>
      </LogoutLayout>
    </>
  )
}

export default App
