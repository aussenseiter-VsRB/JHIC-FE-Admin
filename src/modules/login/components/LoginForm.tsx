interface LoginFormProps {
  title: string;
  subtitle: string;
  form: {
    usernameLabel: string;
    usernamePlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    submitButton: string;
  };
  footerText: string;
  username: string;
  password: string;
  error: string;
  loading: boolean;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function LoginForm({
  title,
  subtitle,
  form,
  footerText,
  username,
  password,
  error,
  loading,
  onUsernameChange,
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
          <label className="login-label" htmlFor="username">
            {form.usernameLabel}
          </label>
          <input
            className="login-input"
            id="username"
            type="text"
            placeholder={form.usernamePlaceholder}
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            autoComplete="username"
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
