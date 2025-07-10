import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../style.css';

export default function KanjiList() {
  const [kanjis, setKanjis] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleBackHome = () => {
    navigate('/home');
  };

   const navigate = useNavigate();

  useEffect(() => {
    async function fetchKanjis() {
      try {
        const response = await api.get('/kanji/');
        setKanjis(response.data);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar os kanjis');
      }
    }
    fetchKanjis();
  }, []);

  async function handleFavorite(kanjiId) {
    setError('');
    setSuccess('');
    try {
      await api.post(`/kanji/favorites/${kanjiId}`);
      setSuccess('Kanji favoritado com sucesso!');
    } catch (err) {
      console.error(err);
      setError('Erro ao favoritar o kanji');
    }
  }

  return (
    <div><h2 className='home-title'>Lista de Kanjis</h2>
    <div className="kanji-list-container">
      
      {error && <p className="message-error">{error}</p>}
      {success && <p className="message-success">{success}</p>}
      <ul>
        <button 
          onClick={handleBackHome} 
          style={{ marginTop: '1.5rem', backgroundColor: '#0a1f44', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
        >
          Voltar à Home
        </button>
        {kanjis.map(k => (
          <li key={k.id} className="kanji-item">
            <div className="kanji-info">
              <strong>{k.character}</strong>: {k.meaning} (JLPT: {k.jlpt_level})
            </div>
            <div className="kanji-buttons">
              <button onClick={() => handleFavorite(k.id)}>Favoritar</button>
              <Link to={`/kanji/${k.id}`}>
                <button>Ver detalhes</button>
              </Link>
              
            </div>
            
          </li>
        ))}
          <button 
          onClick={handleBackHome} 
          style={{ marginTop: '1.5rem', backgroundColor: '#0a1f44', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
        >
          Voltar à Home
        </button>
      </ul>
    </div>
    </div>
  );
}
