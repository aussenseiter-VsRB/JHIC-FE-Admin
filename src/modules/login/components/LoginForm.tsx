interface LoginFormProps {
  title: string;
  subtitle: string;
  form: {
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    submitButton: string;
  };
  footerText: string;
  email: string;
  password: string;
  error: string;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function LoginForm({
  title,
  subtitle,
  form,
  footerText,
  email,
  password,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <div className="login-card">
      <div className="login-header">
        <h1 className="login-title">{title}</h1>
        <p className="login-subtitle">{subtitle}</p>
      </div>

      <form className="login-form" onSubmit={onSubmit}>
        {error && <div className="login-error">{error}</div>}

        <div className="login-field">
          <label className="login-label" htmlFor="email">
            {form.emailLabel}
          </label>
          <input
            className="login-input"
            id="email"
            type="email"
            placeholder={form.emailPlaceholder}
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            autoComplete="email"
            disabled={loading}
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
            onChange={(e) => onPasswordChange(e.target.value)}
            autoComplete="current-password"
            disabled={loading}
          />
        </div>

        <button className="login-submit" type="submit" disabled={loading}>
          {loading ? "Memasuk..." : form.submitButton}
        </button>
      </form>

      <div className="login-footer">
        <p className="login-footer-text">{footerText}</p>
      </div>
    </div>
  );
}

export default LoginForm;
