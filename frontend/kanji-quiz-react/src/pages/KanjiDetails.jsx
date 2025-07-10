import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import '../kanjiDetails.css';

export default function KanjiDetails() {
  const { id } = useParams();
  const [kanji, setKanji] = useState(null);
  const [error, setError] = useState('');
  const handleBackHome = () => {
    navigate('/home');
  };

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchKanji() {
      try {
        const response = await api.get(`/kanji/${id}`);
        setKanji(response.data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar o kanji');
      }
    }
    fetchKanji();
  }, [id]);

  if (error) return <p className="error-message">{error}</p>;
  if (!kanji) return <p className="loading-message">Carregando...</p>;

  return (
    <div><h2 className="kanji-details-title">Detalhes do Kanji</h2>
    <div className="kanji-details-container">
      
      <h2 className="kanji-details-item">
        <strong>Caracter:</strong> 
      </h2>
      <p className='kanji-icon'>
        {kanji.character}
      </p>
      <p className="kanji-details-item">
        <strong>Significado:</strong> {kanji.meaning}
      </p>
      <p className="kanji-details-item">
        <strong>Onyomi:</strong> {kanji.onyomi}
      </p>
      <p className="kanji-details-item">
        <strong>Kunyomi:</strong> {kanji.kunyomi}
      </p>
      <p className="kanji-details-item">
        <strong>JLPT Level:</strong> {kanji.jlpt_level}
      </p>
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
