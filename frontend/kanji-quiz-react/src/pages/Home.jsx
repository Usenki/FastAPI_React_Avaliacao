import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import "../style.css";

export default function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h1 className="home-title">Bem-vindo ao Kanji App!</h1>

      <div className="container">
        <div className="social-media-post">
          <div className="post-header">Funções</div>
          <div className="post-content">
            <li><Link to="/kanjis" className="text-link">📖 Lista de Kanjis</Link></li>
            <li><Link to="/add-kanji" className="text-link">➕ Adicionar Kanji</Link></li>
            <li><Link to="/kanji/favorites" className="text-link">⭐ Favoritos</Link></li>
            <li>
              <span 
                onClick={handleLogout} 
                className="text-link" 
                style={{ cursor: 'pointer', userSelect: 'none' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleLogout(); }}
              >
                🚪 Logout
              </span>
            </li>
            <div className="wave-pattern-background"></div>
          </div>
          <div className="post-footer">
            <Link to="/kanji/quiz" className="website-link">Começar o quiz</Link>
          </div>
          <div className="japanese-text-vertical">日本語</div>
        </div>
      </div>
    </div>
  );
}
