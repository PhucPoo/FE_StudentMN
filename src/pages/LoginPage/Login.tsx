import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await onLogin({ username, password });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Username */}
    <div className="flex flex-col">
      <Label htmlFor="username" className="mb-2 text-gray-700">
        Username
      </Label>
      <Input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        placeholder="Enter your username"
        className="py-2 px-3"
      />
    </div>

    {/* Password */}
    <div className="flex flex-col">
      <Label htmlFor="password" className="mb-2 text-gray-700">
        Password
      </Label>
      <Input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Enter your password"
        className="py-2 px-3"
      />
      {/* Quên mật khẩu */}
      <a
        href="/forgot-password"
        className="mt-2 text-sm text-blue-600 hover:underline self-end"
      >
        Quên mật khẩu?
      </a>
    </div>

    {error && <p className="text-red-500 text-sm">{error}</p>}

    {/* Submit button */}
    <Button type="submit" className="w-full mt-4">
      Login
    </Button>
  </form>
</div>

  );
}
