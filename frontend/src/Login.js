import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:8000/auth/login",
      {
        email,
        password,
      }
    );

    const token = res.data.access_token;

   
    localStorage.setItem("token", token);

   
    navigate("/dashboard");

  }catch (err) {
  console.log("Login failed", err);

  if (err.response) {
    alert(err.response.data.detail);
  } else {
    alert("No response from server");
  }
}
};

 return (
  <>
    <form onSubmit={handleLogin}>
      <input
        placeholder="Email"
        autoComplete="off"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
    <form onSubmit={handleLogin} autoComplete="off"></form>

    <p>
      Don't have an account?{" "}
      <Link to="/register">Register</Link>
    </p>
  </>
);
}

export default Login;

