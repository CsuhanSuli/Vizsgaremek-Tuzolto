import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AllMission from "./components/LoggedOut/Missions/AllMission";
import AllCar from "./components/LoggedOut/Cars/AllCar";
import LoginForm from "./components/Login/LoginForm";
import AllCarTools from "./components/LoggedIn/CarTools/AllCarTools";
import LoggedInLayout from "./components/LoggedIn/LoggedInLayout";
import NewCarTool from "./components/LoggedIn/CarTools/NewCarTool";
import UpdateCarTool from "./components/LoggedIn/CarTools/UpdateCarTool";
import ToolDetails from "./components/LoggedIn/CarTools/ToolDetails";
import NewReviewDate from "./components/LoggedIn/CarTools/NewReviewDate";
import UpdateReviewDate from "./components/LoggedIn/CarTools/UpdateReviewDate";
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
import { isAdmin } from "./components/Login/api";

const AdminRoute = ({ children }) => {
  return isAdmin() ? children : <Navigate replace to="/Calendar" />;
};

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<AllMission />} />
        <Route path="/Cars" element={<AllCar />} />
        <Route path="/Login" element={<LoginForm />} />

        <Route path="/LoggedIn" element={<LoggedInLayout />} />
        <Route path="/Calendar" element={<Calendar />} />
        <Route path="/Forum" element={<AllForum />} />
        <Route path="/ForumDetails/:id" element={<ForumDetails />} />
        <Route path="/CarTools/:id" element={<AllCarTools />} />
        <Route path="/CarToolDetails/:id" element={<ToolDetails />} />
        <Route path="/Exams/:id" element={<AllExams />} />

        <Route path="/NewTool/:id" element={<AdminRoute><NewCarTool /></AdminRoute>} />
        <Route path="/EditCarTool/:id" element={<AdminRoute><UpdateCarTool /></AdminRoute>} />
        <Route path="/NewReviewDate/:id" element={<AdminRoute><NewReviewDate /></AdminRoute>} />
        <Route path="/UpdateReviewDate/:id" element={<AdminRoute><UpdateReviewDate /></AdminRoute>} />
        <Route path="/NewSchedule" element={<AdminRoute><NewSchedule /></AdminRoute>} />
        <Route path="/UpdateSchedule/:id" element={<AdminRoute><UpdateSchedule /></AdminRoute>} />
        <Route path="/NewUserExam" element={<AdminRoute><NewUserExam /></AdminRoute>} />
        <Route path="/NewExam" element={<AdminRoute><NewExam /></AdminRoute>} />
        <Route path="/NewExamType" element={<AdminRoute><NewExamType /></AdminRoute>} />
        <Route path="/ExamType" element={<AdminRoute><AllExamType /></AdminRoute>} />
        <Route path="/Users" element={<AdminRoute><AllUsers /></AdminRoute>} />
        <Route path="/EditUser/:id" element={<AdminRoute><UpdateUser /></AdminRoute>} />
        <Route path="/NewForum" element={<AdminRoute><NewForum /></AdminRoute>} />
        <Route path="/EditForum/:id" element={<AdminRoute><UpdateForum /></AdminRoute>} />
        <Route path="/NewForumType" element={<AdminRoute><NewForumType /></AdminRoute>} />
        <Route path="/ForumType" element={<AdminRoute><AllForumType /></AdminRoute>} />
        <Route path="/CarsLoggedIn" element={<AdminRoute><AllCars /></AdminRoute>} />
        <Route path="/NewCar" element={<AdminRoute><NewCar /></AdminRoute>} />
        <Route path="/UpdateCar/:id" element={<AdminRoute><UpdateCar /></AdminRoute>} />
        <Route path="/Registration" element={<AdminRoute><Registration /></AdminRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;