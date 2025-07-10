import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import '../style.css';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async e => {
    e.preventDefault();
    try {
      const response = await api.post('/register/', form);
      const token = response.data.access_token;

      if (token) {
        localStorage.setItem('token', token);
        setMessage('Registrado com sucesso!');
        setTimeout(() => navigate('/home'), 1500);
      }
    } catch (err) {
      setMessage('Falha no registro');
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className='home-title'>Registrar</h2>
      <div className="form-container">
        <form onSubmit={handleRegister}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Confirmar</button>
          {message && <p>{message}</p>}
        </form>
        <p style={{ marginTop: '1rem' }}>
          Já tem conta?{' '}
          <Link to="/login" className="text-link">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}
