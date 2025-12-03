import { useNavigate } from "react-router-dom";

import LoginForm from "./Login";
import { login } from "@/service/authService";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    await login(credentials);
    navigate("/dashboard"); // chuyển sang dashboard sau khi login
  };

  return <LoginForm onLogin={handleLogin} />;
}
