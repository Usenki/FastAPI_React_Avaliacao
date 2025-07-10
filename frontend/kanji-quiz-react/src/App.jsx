import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import KanjiList from './pages/KanjiList';
import AddKanji from './pages/AddKanji';
import Favorites from './pages/Favorites';
import Quiz from './pages/Quiz';
import KanjiDetails from './pages/KanjiDetails';
import './style.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/kanjis" element={<KanjiList />} />
        <Route path="/add-kanji" element={<AddKanji />} />
        <Route path="/kanji/favorites" element={<Favorites />} />
        <Route path="/kanji/quiz" element={<Quiz />} />
        <Route path="/kanji/:id" element={<KanjiDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
