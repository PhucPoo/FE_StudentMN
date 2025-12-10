import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import StudentInfo from "./pages/Student/StudentInfo";
import Grades from "./pages/Grades";
import DatabaseManagement from "./pages/DatabaseManagement";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage/LoginPage";
import AccountList from "./pages/Account/AccountList";
import TeacherList from "./pages/Teacher/TeacherList";
import MajorList from "./pages/Major/MajorList";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/messages" element={<Messages />} /> */}
          <Route path="/account" element={<AccountList />} />
          <Route path="/major" element={<MajorList />} />
          {/* <Route path="/account" element={<AccountList />} />
          <Route path="/account" element={<AccountList />} /> */}
          <Route path="/student-info" element={<StudentInfo />} />
          <Route path="/teacher-info" element={<TeacherList />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/database" element={<DatabaseManagement />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
