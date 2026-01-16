import { useState, useEffect } from 'react';
import './Login.css';

function Login({ onLogin, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    // Add entrance animation
    const timer = setTimeout(() => {
      document.querySelector('.login-container')?.classList.add('animate-in');
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success animation
        document.querySelector('.login-container')?.classList.add('success-animation');
        setTimeout(() => {
          if (onLogin) onLogin(data.user);
        }, 800);
      } else {
        setError(data.message || 'Login failed');
        // Shake animation on error
        document.querySelector('.login-container')?.classList.add('shake');
        setTimeout(() => {
          document.querySelector('.login-container')?.classList.remove('shake');
        }, 500);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      document.querySelector('.login-container')?.classList.add('shake');
      setTimeout(() => {
        document.querySelector('.login-container')?.classList.remove('shake');
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <div className="logo-icon">🗳️</div>
            <h1>Welcome Back</h1>
          </div>
          <p className="login-subtitle">Sign in to continue your civic journey</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className={`form-label ${focusedField === 'email' ? 'focused' : ''}`}>
              Email Address
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="you@example.com"
                required
                className="form-input"
              />
              <div className="input-glow"></div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className={`form-label ${focusedField === 'password' ? 'focused' : ''}`}>
              Password
            </label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your password"
                required
                className="form-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
              <div className="input-glow"></div>
            </div>
          </div>

          {error && (
            <div className="error-message animate-error">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={`login-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <span className="button-arrow">→</span>
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <button className="link-button" onClick={onSwitchToRegister}>
              Sign Up
            </button>
          </p>
        </div>

        <div className="login-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;


