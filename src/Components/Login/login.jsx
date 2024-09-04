import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");
    console.log(token);
    try {
      const result = await fetch(
        "http://localhost:5000/api/getEmployeeSignin",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: JSON.stringify({ name, email }),
        }
      );
      const data = await result;

      console.log("data", data);

      if (data.ok) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        navigate("/welcome");
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "Signed in unsuccessfully",
        });
        setName("")
        setEmail("")

      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="loginFormContainer">
      <form className="auth-form shadow p-3" onSubmit={handleSubmit}>
        <h2 className="text-primary">Login</h2>
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
          className="p-1"
          placeholder=" Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
