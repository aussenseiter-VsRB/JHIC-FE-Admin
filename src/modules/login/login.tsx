import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pageData from "./login.json";
import "./css/login.css";

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

    // TODO: integrate with auth service
    console.log("Login:", { username, password });
    navigate("/dashboard");
  };

  return (
    <div className="login">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">{page.title}</h1>
          <p className="login-subtitle">{page.subtitle}</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <div className="login-field">
            <label className="login-label" htmlFor="username">
              {form.usernameLabel}
            </label>
            <input
              className="login-input"
              id="username"
              type="text"
              placeholder={form.usernamePlaceholder}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="password">
              {form.passwordLabel}
            </label>
            <input
              className="login-input"
              id="password"
              type="password"
              placeholder={form.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button className="login-submit" type="submit">
            {form.submitButton}
          </button>
        </form>

        <div className="login-footer">
          <p className="login-footer-text">{footer.text}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
