
import './landing.css';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-container text-center">
 
      <div className="p-4  w-50 shadow">
      <h1 className="text-info mb-3">Dashboard</h1>
      <div className="options ">
        <Link to="/kudos">
          <button className="landing-btn">Give Kudos</button>
        </Link>
        <Link to="/analytics">
          <button className="landing-btn">View Analytics</button>
        </Link>
      </div>
      </div>
    </div>
  );
}

export default LandingPage;
