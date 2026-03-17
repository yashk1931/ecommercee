import './App.css';
import Navbars from './Navbar/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from "react";

import Sneakers from './Navbar/component/men/Sneakers';
import Skechers from './Navbar/component/men/Skechers';
import Formal from './Navbar/component/men/Formal';

import WoSneakers from './Navbar/component/women/WSneaker';
import WoFormal from './Navbar/component/women/WFormal';

import Home from './Home/home';
import Login from './Navbar/component/Login';
import Signup from './Navbar/component/Signup';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.warn("Error reading user:", error);
      return null;
    }
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (user) {

      fetch(`http://localhost:5000/cart/${user._id}`)
        .then(res => res.json())
        .then(data => {

          console.log("Cart data:", data);

          if (data.success) {
            setCartItems(data.cart || []);
          }

        })
        .catch(err => console.log("Cart load error:", err));

    }

  }, [currentUser]);

  async function addtocart(item) {

  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("Please login first");
    window.location.href = "/login";
    return;
  }

  try {

    const res = await fetch("/api/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user._id,
        item: item
      })
    });

    const data = await res.json();

    if (data.success) {
      setCartItems(data.cart);
    }

  } catch (error) {

    console.log("Add to cart error:", error);

  }

}
 async function removeItem(index) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("Please login first");
    return;
  }

  try {

    const res = await fetch("/api/remove-from-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user._id,
        index: index
      })
    });

    const data = await res.json();

    if (data.success) {
      setCartItems(data.cart);
    }

  } catch (error) {

    console.log("Remove cart error:", error);

  }

}


  return (

    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>

      <Navbars cartItems={cartItems} cartOpen={cartOpen} setCartOpen={setCartOpen} removeItem={removeItem} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/men/sneakers' element={<Sneakers addtocart={addtocart} />}/>
        <Route path='/men/skechers' element={<Skechers addtocart={addtocart} />}/>
        <Route path='/men/formal' element={<Formal addtocart={addtocart} />}/>
        <Route path='/women/sneakers' element={<WoSneakers addtocart={addtocart} />}/>
        <Route path='/women/formal' element={<WoFormal addtocart={addtocart} />}/>
        <Route path='/login' element={<Login setCurrentUser={setCurrentUser} />}/>
        <Route path='/signup' element={<Signup setCurrentUser={setCurrentUser} />}/>
      </Routes>

    </Router>
  );
}

export default App;
