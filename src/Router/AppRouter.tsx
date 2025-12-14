import AccountList from "@/pages/Account/AccountList";
import Dashboard from "@/pages/Dashboard";
import DatabaseManagement from "@/pages/DatabaseManagement";
import Grades from "@/pages/Grades";
import LoginPage from "@/pages/LoginPage/LoginPage";
import MajorList from "@/pages/Major/MajorList";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile/Profile";
import StudentInfo from "@/pages/Student/StudentInfo";
import TeacherList from "@/pages/Teacher/TeacherList";
import { BrowserRouter, Routes, Route } from "react-router-dom";



const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* Admin */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<AccountList />} />
        <Route path="/major" element={<MajorList />} />
        <Route path="/teacher-info" element={<TeacherList />} />
        <Route path="/database" element={<DatabaseManagement />} />
        <Route path="/student-info" element={<StudentInfo />} />

         {/* Student */}
        <Route path="/student" element={<Grades />} />
        <Route path="/grades" element={<Grades />} />

        {/* Common */}
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
