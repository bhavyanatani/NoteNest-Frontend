import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Alert from './Components/Alert';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import NoteState from './Context/Notes/NoteState';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from './config';

function App() {
  const [alert, setAlert] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true); // For initial auth check

  // Verify token with backend on app load
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setLoadingAuth(false);
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/getUser`, {
          method: "GET",
          headers: { "auth-token": token },
        });
        const json = await response.json();
        if (json._id) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token'); // Invalid token
          setIsAuthenticated(false);
        }
      } catch (err) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        setLoadingAuth(false);
      }
    };
    verifyUser();
  }, []);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 1500);
  };

  if (loadingAuth) {
    return <div className="text-center mt-5">Checking authentication...</div>; // Optional loader
  }

  return (
    <NoteState>
      <Router>
        <Navbar setIsAuthenticated={setIsAuthenticated} />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Home showAlert={showAlert} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  showAlert={showAlert}
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <SignUp
                  showAlert={showAlert}
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
