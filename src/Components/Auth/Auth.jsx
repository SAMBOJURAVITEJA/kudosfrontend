
import {useNavigate} from "react-router-dom"
import "./Auth.css";

function AuthPage() {
  const navigate=useNavigate()
  return (
    <div className="auth-container">
      <div className="auth-div-container w-50">
      <h1 className="text-danger mb-5">Express Your Kudos </h1>
      <div className="auth-navigation  w-50 ">
        < button className="btn btn-success" onClick={()=>navigate("/login")}>Login</button>
        <button  onClick={()=>navigate("/signup")} className="btn btn-danger">Signup</button>
      </div>
    </div>
    </div>
  );
}

export default AuthPage;
