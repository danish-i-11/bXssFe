import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      // Set JWT in a cookie for XSS demo (insecure, for testing only)
      document.cookie = `token=${res.data.token}; path=/`;
      localStorage.setItem('isAdmin', res.data.isAdmin);
      setIsLoggedIn(true);
      navigate('/'); // Always go to feedback page after login
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-xl shadow-lg w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-bold">Login</button>
        <div className="text-center mt-2">
          <span>Don't have an account? </span>
          <button type="button" className="text-blue-400 underline" onClick={() => navigate('/signup')}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
