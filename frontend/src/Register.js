import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
    await axios.post("http://localhost:8000/auth/register", {
      username,
      email,
      password,
    });

      alert("Account created successfully!");
      navigate("/");
    } catch (err) {
  console.log("Register failed", err);

  if (err.response) {
    alert(err.response.data.detail);
  } else {
    alert("Could not connect to server");
  }
  
}
  };

  return (
  <>
    <form onSubmit={handleRegister}>
      <input
        placeholder="Username"
        autoComplete="off"
        onChange={(e) => setUsername(e.target.value)}
      />

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

      <button type="submit">Register</button>
    </form>
    

    <p>
      Already have an account?{" "}
      <Link to="/">Login</Link>
    </p>
  </>
);
}

export default Register;