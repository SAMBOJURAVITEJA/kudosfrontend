
import './Welcome.css';
import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <div className="welcome-container">
      <div className="welcome-content bg-primary">
        <h1>Welcome to KudoSpot</h1>
        <p>Promote engagement by sharing kudos with your colleagues!</p>
        <Link to="/landing">
          <button className="welcome-btn">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
