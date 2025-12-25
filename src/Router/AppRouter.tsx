import Dashboard from "@/pages/Dashboard";
import DatabaseManagement from "@/pages/DatabaseManagement";
import Grades from "@/pages/Grades";
import LoginPage from "@/pages/LoginPage/LoginPage";
import MajorList from "@/pages/Admin/Major/MajorList";
import NotFound from "@/pages/NotFound";
import DecentralizationPage from "@/pages/Admin/Permission/DecentralizationPage";
import PermissionList from "@/pages/Admin/Permission/PermissionList";
import Profile from "@/pages/Profile/Profile";
import StudentInfo from "@/pages/Admin/Student/StudentInfo";
import TeacherList from "@/pages/Admin/Teacher/TeacherList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountList from "@/pages/Admin/Account/AccountList";
import ClassList from "@/pages/Admin/Class/ClassList";
import DashboardStudent from "@/pages/Admin/Student/dashboardStudent";
import DashboardTeacher from "@/pages/Admin/Teacher/dashboardTeacher";
import ClassListByTeacher from "@/pages/Admin/Teacher/managerClassByTeacher";
import SubjectList from "@/pages/Subject/subjectList";
import CourseSectionInfo from "@/pages/Admin/CourseSection/CourseSectionInfo";
// import EnrollmentInfo from "@/pages/Student/Enrollment/EnrollmentInfo";



const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* Admin */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/permission-list" element={<PermissionList />} />
        <Route path="/decentralization" element={<DecentralizationPage />} />
        <Route path="/class" element={<ClassList />} />
        <Route path="/account" element={<AccountList />} />
        <Route path="/major" element={<MajorList />} />
        <Route path="/subject" element={<SubjectList />} />
        <Route path="/courseSection" element={<CourseSectionInfo />} />
        <Route path="/teacher-info" element={<TeacherList />} />
        <Route path="/database" element={<DatabaseManagement />} />
        <Route path="/student-info" element={<StudentInfo />} />


         {/* Student */}
        <Route path="/student" element={<DashboardStudent />} />
        <Route path="/grades" element={<Grades />} />
        {/* <Route path="/enrollment" element={<EnrollmentInfo />} /> */}

         {/* Teacher */}
        <Route path="/teacher" element={<DashboardTeacher />} />
        <Route path="/enter-grades" element={<Grades />} />
        <Route path="/class-by-teacher" element={<ClassListByTeacher />} />
        {/* Common */}
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
