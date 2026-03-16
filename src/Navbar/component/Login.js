import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setCurrentUser }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (data.success === true) {

        alert("Login successful");

        localStorage.setItem("currentUser", JSON.stringify(data.user));

        if (setCurrentUser) {
          setCurrentUser(data.user);
        }

        navigate("/");

        return;   // important: stop further execution
      }

      alert(data.message);

    } catch (error) {

      console.error(error);
      alert("Server connection failed");

    }
  };

  return (
    <div className="loginform">

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>

      </form>

    </div>
  );
}
