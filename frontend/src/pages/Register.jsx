import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'tenant', photo: null });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, files } = e.target;
    
    if (name === 'photo' && files && files[0]) {
      const file = files[0];
      setForm(prev => ({ ...prev, [name]: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = e => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Register user
      const { name, email, password, role } = form;
      const res = await axios.post('/api/auth/register', { name, email, password, role });
      localStorage.setItem('token', res.data.token);

      // Upload profile photo if provided
      if (form.photo) {
        const fd = new FormData();
        fd.append('photo', form.photo);
        await axios.post('/api/user/profile-photo', fd, {
          headers: { Authorization: `Bearer ${res.data.token}` }
        });
      }

      // Redirect based on role
      if (res.data.user.role === 'landlord') navigate('/landlord/dashboard');
      else if (res.data.user.role === 'tenant') navigate('/tenant/dashboard');
      else if (res.data.user.role === 'admin') navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        {/* Header Section */}
        <div className="register-header">
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 9H15M9 13H15M9 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text">RentReceipt</span>
          </div>
          
          <div className="header-content">
            <h2 className="main-title">Create your RentReceipt Account</h2>
            <p className="subtitle">Generate legal rent receipts and stay on top of payments.</p>
            
            <div className="feature-tags">
              <span className="tag">🔒 100% Secure</span>
              <span className="tag">📄 Auto PDFs</span>
              <span className="tag">💰 Tax-Ready</span>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="testimonial-box">
          <div className="testimonial-content">
            <p>"RentReceipt has simplified my rental management completely. The automatic PDF generation saves me hours every month!"</p>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User" />
              </div>
              <div className="author-info">
                <span className="author-name">Paras Mittal</span>
                <span className="author-title">Property Manager</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="register-form-container">
          <form onSubmit={handleSubmit} className="register-form">
            {error && (
              <div className="error-message">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                  <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {error}
              </div>
            )}

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 4.23086 7.78014 6.06 6.06M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1749 15.0074 10.8016 14.8565C10.4283 14.7056 10.0887 14.481 9.80385 14.1962C9.51897 13.9113 9.29439 13.5717 9.14351 13.1984C8.99262 12.8251 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="role">Account Type</label>
                <select name="role" id="role" value={form.role} onChange={handleChange} required>
                  <option value="tenant">🏠 Tenant</option>
                  <option value="landlord">🏢 Landlord</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="photo">Profile Photo (Optional)</label>
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    className="file-input"
                  />
                  <label htmlFor="photo" className="file-input-label">
                    {photoPreview ? (
                      <div className="photo-preview">
                        <img src={photoPreview} alt="Preview" />
                        <span>Change Photo</span>
                      </div>
                    ) : (
                      <div className="file-input-content">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Upload Photo</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? (
                <div className="loading-spinner">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Social Proof */}
          <div className="social-proof">
            <div className="trust-indicators">
              <div className="indicator">
                <span className="number">10,000+</span>
                <span className="label">Happy Users</span>
              </div>
              <div className="indicator">
                <span className="number">500K+</span>
                <span className="label">Receipts Generated</span>
              </div>
              <div className="indicator">
                <span className="number">99.9%</span>
                <span className="label">Uptime</span>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <div className="login-link">
            <p>Already have an account? <Link to="/login">Login here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;