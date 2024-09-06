import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./sign.css";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, email });

    try {
      const result = await fetch(
        "http://localhost:5000/api/addEmployeeSignUp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );
      const token = await result.json();
      console.log(token)
      Cookies.set("token", token.token, { expires: 100 });
      alert("signup is successfull");
      setEmail("");
      setName("");
      navigate("/login");
    } catch (err) {
      setEmail("");
      setName("");
      console.log(err)
      alert("user already exist");
    }
  };

  return (
    <div className="signUpFormContainer">
      <form className="auth-form shadow p-3" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="email"
          placeholder=" Enter Your Email"
          value={email}
          className="p-1"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder=" Enter Your Name"
          value={name}
          className="p-1"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-danger">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
