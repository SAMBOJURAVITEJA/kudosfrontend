
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './Components/Auth/Auth';
import Login from './Components/Login/login';
import Signup from './Components/SignUp/sign';
import Welcome from './Components/Welcome/welcome';
import LandingPage from './Components/LandingPage/landing';
import Kudos from './Components/Kudos/kudos';
import Analytics from './Components/Analytics/analytics';
import Protected from './Components/ProtectedRoute/protected';
import './App.css';

function App() {
  return (
    <div className="appContainer">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route element={<Protected />}>
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/kudos" element={<Kudos />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/welcome" element={<Welcome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
