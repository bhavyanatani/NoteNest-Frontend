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

function App() {
  const[alert,setAlert] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const showAlert=(message,type)=>{
    setAlert({
      msg : message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  
  return (
    <NoteState>
      <Router>
        <div>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={
                isAuthenticated ? 
                <Home showAlert={showAlert} /> : 
                <Navigate to="/login" />
              } />
              <Route path="/login" element={
                <Login showAlert={showAlert} setIsAuthenticated={setIsAuthenticated} />
              } />
              <Route path="/signup" element={
                <SignUp showAlert={showAlert} setIsAuthenticated={setIsAuthenticated} />
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
