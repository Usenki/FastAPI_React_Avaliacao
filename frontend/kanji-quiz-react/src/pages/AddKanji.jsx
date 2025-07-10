import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../style.css';

export default function AddKanji() {
  const [form, setForm] = useState({
    character: '',
    meaning: '',
    onyomi: '',
    kunyomi: '',
    jlpt_level: ''
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    try {
      await api.post('/kanji/', form);
      setMessage('Kanji adicionado com sucesso!');
      setForm({
        character: '',
        meaning: '',
        onyomi: '',
        kunyomi: '',
        jlpt_level: ''
      });
    } catch (err) {
      setMessage('Falha em adicionar kanji');
      setIsError(true);
      console.error(err);
    }
  };

  const handleBackHome = () => {
    navigate('/home');
  };

  return (
    <div>
      <h2 className="home-title">Adicionar Kanji</h2>
      <div className="page-container">
        <form onSubmit={handleSubmit}>
          <input
            name="character"
            placeholder="Character"
            value={form.character}
            onChange={handleChange}
            required
          />
          <input
            name="meaning"
            placeholder="Meaning"
            value={form.meaning}
            onChange={handleChange}
            required
          />
          <input
            name="onyomi"
            placeholder="Onyomi"
            value={form.onyomi}
            onChange={handleChange}
          />
          <input
            name="kunyomi"
            placeholder="Kunyomi"
            value={form.kunyomi}
            onChange={handleChange}
          />
          <input
            name="jlpt_level"
            placeholder="JLPT Level"
            value={form.jlpt_level}
            onChange={handleChange}
          />
          <button type="submit">Adicionar Kanji</button>
        </form>

        {message && (
          <p className={`message ${isError ? 'error' : ''}`}>
            {message}
          </p>
        )}

        <button 
          onClick={handleBackHome} 
          style={{ marginTop: '1.5rem', backgroundColor: '#0a1f44', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
        >
          Voltar à Home
        </button>
      </div>
    </div>
  );
}
