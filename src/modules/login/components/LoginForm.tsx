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
          />
        </div>

        <button className="login-submit" type="submit">
          {form.submitButton}
        </button>
      </form>

      <div className="login-footer">
        <p className="login-footer-text">{footerText}</p>
      </div>
    </div>
  );
}

export default LoginForm;
