import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../../utils/localStorage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.css';

const AdminAuth = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const admin = users.find((u) => u.email === email && u.password === password && u.role === 'admin');

    if (admin) {
      setCurrentUser(admin);
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.find((u) => u.email === email);

    if (exists) {
      setError('Admin already exists with this email');
      return;
    }

    const newAdmin = {
      email,
      password,
      role: 'admin'
    };

    users.push(newAdmin);
    localStorage.setItem('users', JSON.stringify(users));
    setCurrentUser(newAdmin);
    navigate('/admin/dashboard');
  };

  const handleSubmit = isLogin ? handleLogin : handleSignup;

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">{isLogin ? 'Admin Login' : 'Admin Signup'}</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <button type="submit" className="btn btn-outline-danger  w-100">{isLogin ? 'Login' : 'Sign Up'}</button>
          </form>
          <div className="text-center mt-3">
            <button 
              type="button" 
              className="btn btn-link text-muted" 
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
