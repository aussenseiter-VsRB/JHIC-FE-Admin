import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pageData from "./login.json";
import "./css/login.css";
import LoginForm from "./components/LoginForm";
import { login, setToken, setUser } from "./services/loginService";
import { SEED_ACCOUNTS, SEED_GROUPS } from "./seedAccounts";

interface LoginPageData {
  page: { title: string; subtitle: string };
  form: {
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    submitButton: string;
  };
  footer: { text: string };
}

const data = pageData as unknown as LoginPageData;

const ROLE_HOME: Record<string, string> = {
  admin: "/dashboard",
  jurnal: "/buat-berita",
  guru: "/dashboard",
};

function Login() {
  const { page, form, footer } = data;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [busyEmail, setBusyEmail] = useState<string | null>(null);

  const handleAuth = async (loginEmail: string, loginPassword: string) => {
    setError("");
    setLoading(true);

    try {
      const response = await login(loginEmail, loginPassword);
      setToken(response.token);
      setUser(response.user);
      navigate(ROLE_HOME[response.user.role] ?? "/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi.";
      setError(message);
    } finally {
      setLoading(false);
      setBusyEmail(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Email dan password wajib diisi.");
      return;
    }

    void handleAuth(email, password);
  };

  const handleQuickLogin = (acc: (typeof SEED_ACCOUNTS)[number]) => {
    setBusyEmail(acc.email);
    void handleAuth(acc.email, acc.password);
  };

  return (
    <div className="login">
      <div className="login-stack">
        <LoginForm
          title={page.title}
          subtitle={page.subtitle}
          form={form}
          footerText={footer.text}
          email={email}
          password={password}
          error={error}
          loading={loading}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
        />

        <div className="login-card login-quick">
          <p className="login-quick-title">Login cepat (akun demo)</p>
          {SEED_GROUPS.map((group) => (
            <div key={group} className="login-quick-group">
              <span className="login-quick-group-label">{group}</span>
              <div className="login-quick-buttons">
                {SEED_ACCOUNTS.filter((acc) => acc.group === group).map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    className="login-quick-btn"
                    disabled={loading}
                    title={acc.note}
                    onClick={() => handleQuickLogin(acc)}
                  >
                    {busyEmail === acc.email ? "Memasuk..." : acc.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Login;
