import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup({ setCurrentUser }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch("/Backend/signup", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
      },
        body: JSON.stringify({ name, email, password })
});

      const data = await res.json();

      if (data.success === true) {

        alert("Signup successful");

        localStorage.setItem("currentUser", JSON.stringify(data.user));

        if(setCurrentUser){
          setCurrentUser(data.user);
        }

        navigate("/");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);
      alert("Server connection failed");

    }
  };

  return (
    <div className="signupform">

      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />

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

        <button type="submit">Signup</button>

        <p>
          Already have account? <Link to="/login">Login</Link>
        </p>

      </form>

    </div>
  );
}
