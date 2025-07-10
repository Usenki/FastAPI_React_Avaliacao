import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import '../style.css';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await api.post('/login/', form); 
      const token = response.data.access_token;

      if (token) {
        localStorage.setItem('token', token);
        navigate('/home');
      }
    } catch (err) {
      setError('Usuário ou senha inválidos');
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className='home-title'>Login</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <p style={{ marginTop: '1rem' }}>
          Não tem conta?{' '}
          <Link to="/register" className="text-link">
            Registrar-se
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
