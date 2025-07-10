import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../style.css';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleBackHome = () => {
    navigate('/home');
  };

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await api.get('/kanji/favorites');
        setFavorites(response.data);
      } catch (err) {
  console.error(err);
  if (err.response) {
    console.log(err.response.data);
    setError(`Erro ao carregar favoritos: ${err.response.status} - ${JSON.stringify(err.response.data)}`);
  } else {
    setError('Erro ao carregar favoritos');
  }
}
 }

    fetchFavorites();
  }, []);

  async function handleRemoveFavorite(kanjiId) {
    setError('');
    setSuccess('');
    try {
      await api.delete(`/kanji/favorites/remove/${kanjiId}`);
      setSuccess('Kanji removido dos favoritos com sucesso!');
      setFavorites(favorites.filter(k => k.id !== kanjiId));
    } catch (err) {
      console.error(err);
      setError('Erro ao remover o kanji dos favoritos');
    }
  }

  return (
    <div>
      <h2 className="home-title">Kanjis Favoritos</h2>
      <div className="page-container">
        {error && <p className="message error">{error}</p>}
        {success && <p className="message success">{success}</p>}
        <ul className="favorites-list">
          {favorites.map(k => (
            <li key={k.id}>
              <div>
                <strong>{k.character}</strong>: {k.meaning}
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemoveFavorite(k.id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
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
