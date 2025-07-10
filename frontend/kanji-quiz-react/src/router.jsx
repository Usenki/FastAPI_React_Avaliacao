import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Favorites from './pages/Favorites';
import { useAuth } from './contexts/authContext';
import AddKanji from './pages/AddKanji';
import KanjiList from './pages/KanjiList';
import KanjiDetails from './pages/KanjiDetails';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {
          
        }
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {

        }
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/kanjis" 
          element={
            <PrivateRoute>
              <KanjiList />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/add-kanji" 
          element={
            <PrivateRoute>
              <AddKanji />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/kanji/favorites" 
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/kanji/quiz" 
          element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/kanji/:id" 
          element={
            <PrivateRoute>
              <KanjiDetails />
            </PrivateRoute>
          } 
        />

        {

        }
        <Route 
          path="*" 
          element={
            <PrivateRoute>
              <Navigate to="/home" />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
