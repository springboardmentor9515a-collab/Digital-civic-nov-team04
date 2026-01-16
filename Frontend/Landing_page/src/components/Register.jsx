import { useState, useEffect } from 'react';
import './Register.css';

function Register({ onRegister, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    role: 'citizen',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector('.register-container')?.classList.add('animate-in');
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...submitData } = formData;
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok) {
        document.querySelector('.register-container')?.classList.add('success-animation');
        setTimeout(() => {
          if (onRegister) onRegister(data.user);
        }, 800);
      } else {
        setError(data.message || 'Registration failed');
        document.querySelector('.register-container')?.classList.add('shake');
        setTimeout(() => {
          document.querySelector('.register-container')?.classList.remove('shake');
        }, 500);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      document.querySelector('.register-container')?.classList.add('shake');
      setTimeout(() => {
        document.querySelector('.register-container')?.classList.remove('shake');
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
    <div className="register-wrapper">
      <div className="register-container">
        <div className="register-header">
          <div className="register-logo">
            <div className="logo-icon">🚀</div>
            <h1>Join DigitalCivic</h1>
          </div>
          <p className="register-subtitle">Start making a difference in your community</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className={`form-label ${focusedField === 'name' ? 'focused' : ''}`}>
              Full Name
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                placeholder="John Doe"
                required
                className="form-input"
              />
              <div className="input-glow"></div>
            </div>
          </div>

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
            <label htmlFor="location" className={`form-label ${focusedField === 'location' ? 'focused' : ''}`}>
              Location
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                onFocus={() => setFocusedField('location')}
                onBlur={() => setFocusedField(null)}
                placeholder="City, State"
                required
                className="form-input"
              />
              <div className="input-glow"></div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="role" className={`form-label ${focusedField === 'role' ? 'focused' : ''}`}>
              I am a
            </label>
            <div className="input-wrapper">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                onFocus={() => setFocusedField('role')}
                onBlur={() => setFocusedField(null)}
                className="form-input form-select"
              >
                <option value="citizen">Citizen</option>
                <option value="official">Government Official</option>
              </select>
              <div className="input-glow"></div>
            </div>
          </div>

          <div className="form-row">
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
                  placeholder="Min. 6 characters"
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

            <div className="form-group">
              <label htmlFor="confirmPassword" className={`form-label ${focusedField === 'confirmPassword' ? 'focused' : ''}`}>
                Confirm Password
              </label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Confirm password"
                  required
                  className="form-input"
                />
                <div className="input-glow"></div>
              </div>
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
            className={`register-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <span className="button-arrow">→</span>
              </>
            )}
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account?{' '}
            <button className="link-button" onClick={onSwitchToLogin}>
              Sign In
            </button>
          </p>
        </div>

        <div className="register-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </div>
    </div>
  );
}

export default Register;

