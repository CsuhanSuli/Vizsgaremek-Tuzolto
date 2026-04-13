import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllMission from "./components/LoggedOut/Missions/AllMission";
import AllCar from "./components/LoggedOut/Cars/AllCar";
import LoginForm from "./components/Login/LoginForm";
import AllCarTools from "./components/LoggedIn/CarTools/AllCarTools";
import LoggedInLayout from "./components/LoggedIn/LoggedInLayout";
import NewCarTool from "./components/LoggedIn/CarTools/NewCarTool";
import UpdateCarTool from "./components/LoggedIn/CarTools/UpdateCarTool";
import ToolDetails from "./components/LoggedIn/CarTools/ToolDetails";
import NewReviewDate from "./components/LoggedIn/CarTools/NewReviewDate";
import UpdateReviewDate from "./components/LoggedIn/CarTools/UpdateReviewDate"
import Calendar from "./components/LoggedIn/Schedule/Calendar";
import AllExams from "./components/LoggedIn/Exams/AllExams";
import NewSchedule from "./components/LoggedIn/Schedule/NewSchedule";
import NewUserExam from "./components/LoggedIn/Exams/NewUserExam";
import NewExam from "./components/LoggedIn/Exams/NewExam";
import AllUsers from "./components/LoggedIn/Users/AllUsers";
import UpdateUser from "./components/LoggedIn/Users/UpdateUser";
import AllForum from "./components/LoggedIn/Forum/AllForum";
import UpdateForum from "./components/LoggedIn/Forum/UpdateForum";
import ForumDetails from "./components/LoggedIn/Forum/ForumDetails";
import NewForum from "./components/LoggedIn/Forum/NewForum";
import NewForumType from "./components/LoggedIn/Forum/ForumType/NewForumType";
import NewExamType from "./components/LoggedIn/Exams/ExamType/NewExamType";
import AllForumType from "./components/LoggedIn/Forum/ForumType/AllForumTypes";
import AllExamType from "./components/LoggedIn/Exams/ExamType/AllExamType";
import AllCars from "./components/LoggedIn/Cars/AllCars";
import NewCar from "./components/LoggedIn/Cars/NewCar";
import UpdateCar from "./components/LoggedIn/Cars/UpdateCar";
import UpdateSchedule from "./components/LoggedIn/Schedule/UpdateSchedule";
import Registration from "./components/LoggedIn/Registration/Registration";

function App() {
  return (
    <>
            <Router>
              <Routes>
                <Route path="/" element={<AllMission />} />
                <Route path="/Cars" element={<AllCar />} />
                <Route path="/Login" element={<LoginForm/>} />

                <Route path="/LoggedIn" element={<LoggedInLayout />} />

                <Route path="/CarTools/:id" element={<AllCarTools />} />
                <Route path="/NewTool/:id" element={<NewCarTool />} />
                <Route path="/EditCarTool/:id" element={<UpdateCarTool />} />
                <Route path="/CarToolDetails/:id" element={<ToolDetails />} />
                <Route path="/NewReviewDate/:id" element={<NewReviewDate/>} />
                <Route path="/UpdateReviewDate/:id" element={<UpdateReviewDate/>} />
                <Route path="/Calendar" element={<Calendar/>} />
                <Route path="/Exams/:id" element={<AllExams/>} />
                <Route path="/NewSchedule" element={<NewSchedule/>} />
                <Route path="/NewUserExam" element={<NewUserExam/>}/>
                <Route path="/NewExam" element={<NewExam/>}/>
                <Route path="/Users" element={<AllUsers/>}/>
                <Route path="/EditUser/:id" element={<UpdateUser/>}/>
                <Route path="/Forum" element={<AllForum/>}/>
                <Route path="/ForumDetails/:id" element={<ForumDetails/>}/>
                <Route path="/EditForum/:id" element={<UpdateForum/>}/>
                <Route path="/NewForum" element={<NewForum/>}/>
                <Route path="/NewForumType" element={<NewForumType/>}/>
                <Route path="/NewExamType" element={<NewExamType/>}/>
                <Route path="/ForumType" element={<AllForumType/>}/>
                <Route path="/ExamType" element={<AllExamType/>}/>
                <Route path="/CarsLoggedIn" element={<AllCars/>}/>
                <Route path="/NewCar" element={<NewCar/>}/>
                <Route path="/UpdateCar/:id" element={<UpdateCar/>}/>
                <Route path="/UpdateSchedule/:id" element={<UpdateSchedule/>}/>
                <Route path="/Registration" element={<Registration/>}/>
              </Routes>
            </Router>

    </>
  );
}

export default App;
