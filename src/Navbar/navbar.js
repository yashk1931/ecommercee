import React from "react";
import { Link } from 'react-router-dom';
import './navbar.css';

export default function Navbars({ cartItems, cartOpen, setCartOpen, removeItem }) {
  
  const totalAmount = cartItems.reduce((total, item) => {
  const price = Number(item.price);
  return total + price * item.quantity;
}, 0);

  return (
    <header>
      <div className="navbar">
        <Link to="/" className="sneakers">
          <h1 className="name">SneakerShop</h1>
        </Link>

        <nav className="navs">
          <ul className="nav-icon">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link>Men</Link>
              <ul className="drop">
                <li><Link to="/men/sneakers" onClick={() => window.scrollTo(0, 0)}>Sneakers</Link></li>
                <li><Link to="/men/skechers" onClick={() => window.scrollTo(0, 0)}>Skechers</Link></li>
                <li><Link to="/men/formal" onClick={() => window.scrollTo(0, 0)}>Formal</Link></li>
              </ul>
            </li>
            <li>
              <Link>Women</Link>
              <ul className="drop">
                <li><Link to="/women/sneakers" onClick={() => window.scrollTo(0, 0)}>Sneakers</Link></li>
                <li><Link to="/women/formal" onClick={() => window.scrollTo(0, 0)}>Formal</Link></li>
              </ul>
            </li>
            <li>
              <Link to="/Login">Login</Link>
              <Link to="/Signup">Signup</Link>
            </li>
          </ul>
        </nav>

        <p className="cart-icon" onClick={() => setCartOpen(true)}>
          &#x1F6D2; {cartItems.length}
        </p>
      </div>

      <div className={`cart-sidebar ${cartOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setCartOpen(false)}>&times;</button>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} width="60" />
              <div>
                <h4>{item.name}</h4>
                <p>${item.price} &times; {item.quantity}</p>
              </div>
              <button className="Product-remove-bttn" onClick={() => removeItem(index)}>&times;</button>
            </div>
          ))
        )}
        {cartItems.length > 0 && (
          <div className="cart-total">
            <hr />
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
          </div>
        )}
      </div>


    </header>
  );
}
