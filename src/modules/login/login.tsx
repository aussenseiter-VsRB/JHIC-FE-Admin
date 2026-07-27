import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pageData from "./login.json";
import "./css/login.css";
import LoginForm from "./components/LoginForm";

interface LoginPageData {
  page: { title: string; subtitle: string };
  form: {
    usernameLabel: string;
    usernamePlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    submitButton: string;
  };
  footer: { text: string };
}

const data = pageData as unknown as LoginPageData;

function Login() {
  const { page, form, footer } = data;
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username dan password wajib diisi.");
      return;
    }

    console.log("Login:", { username, password });
    navigate("/dashboard");
  };

  return (
    <div className="login">
      <LoginForm
        title={page.title}
        subtitle={page.subtitle}
        form={form}
        footerText={footer.text}
        username={username}
        password={password}
        error={error}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Login;
