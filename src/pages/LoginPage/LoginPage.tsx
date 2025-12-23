import { useNavigate } from "react-router-dom";
import LoginForm from "./Login";
import { login } from "@/service/authService";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    const res = await login(credentials); // ⬅️ nhận response

    if (!res?.success) return;

    const { user } = res;

    // 🔥 Điều hướng theo role
    if (user.role === "Admin") {
      navigate("/dashboard");
    } else if (user.role === "Student") {
      navigate("/student");
    } else if (user.role === "Teacher") {
      navigate("/teacher");
    } else {
      navigate("/"); 
    }
  };

  return <LoginForm onLogin={handleLogin} />;
}
