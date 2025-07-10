import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/authContext';
import '../quiz.css';

export default function Quiz() {
  const { token, logout } = useAuth();
  const [kanjis, setKanjis] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const handleBackHome = () => {
    navigate('/home');
  };

   const navigate = useNavigate();

  useEffect(() => {
    fetchKanjis();
  }, []);

  const fetchKanjis = async () => {
    try {
      const res = await api.get('/kanji/quiz?limit=5', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setKanjis(res.data);
      setFeedback('');
      setFeedbackType('');
      setCurrentIndex(0);
    } catch (err) {
      console.error(err);
      logout();
    }
  };

  if (kanjis.length === 0) return <p>Carregando...</p>;

  const currentKanji = kanjis[currentIndex];
  const options = kanjis.map(k => k.character);

  const handleAnswer = (choice) => {
    if (choice === currentKanji.character) {
      setFeedback('✅ Correto!');
      setFeedbackType('correct');
    } else {
      setFeedback(`❌ Errado! Resposta certa: ${currentKanji.character}`);
      setFeedbackType('incorrect');
    }
    setTimeout(() => {
      setFeedback('');
      setFeedbackType('');
      if (currentIndex + 1 < kanjis.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        fetchKanjis();
      }
    }, 3000);
  };

  return (
    <div><h1 className="quiz-title">Kanji Quiz</h1>
    <div className="quiz-container">
      <h1 className="quiz-question">Qual a resposta?</h1>
      <p className="quiz-meaning"><strong>Significado:</strong> {currentKanji.meaning}</p>

      <div className="quiz-options">
        {options.map((opt, idx) => (
          <button
            key={idx}
            className="quiz-option-button"
            onClick={() => handleAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <p className={`quiz-feedback ${feedbackType}`}>{feedback}</p>

      <button className="quiz-restart-button" onClick={fetchKanjis}>
        Novo Quiz
      </button>
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
