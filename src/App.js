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
      return;
    }

    if (!item || !item.name) {
      console.log("Invalid item:", item);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/add-to-cart", {
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

      console.log("Add to cart response:", data);

      if (data.success) {
        setCartItems(data.cart);
      }

    } catch (error) {
      console.log("Add to cart error:", error);
    }
  }

  function removeItem(index) {

    const newCart = cartItems
      .map((item, i) =>
        i === index
          ? (item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : null)
          : item
      )
      .filter(item => item !== null);

    setCartItems(newCart);
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