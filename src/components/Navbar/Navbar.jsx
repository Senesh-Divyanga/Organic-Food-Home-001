import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import assets1 from "../../assets1/asets1";
import { useCart } from "../../context/CartContext";

const Navbar = ({ setShowLogin, scrollToSection, showBackArrow, onBack }) => {
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Check if current route is Product View
  const isProductViewPage = location.pathname.startsWith("/product-view");

  const handleNavClick = (section) => {
    setMenu(section);
    scrollToSection(section);
    setIsMenuOpen(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        {/* Use logo as Back Arrow on ProductView Page */}
        {isProductViewPage && (
          <button className="back-arrow" onClick={onBack}>
            <img
              src={assets1.logoImage}
              alt="Logo"
              className="logo back-arrow-logo"
            />
          </button>
        )}

        {/* Logo Always Visible except on Product View */}
        {!isProductViewPage && (
          <Link to="/">
            <img src={assets1.logoImage} alt="Logo" className="logo" />
          </Link>
        )}

        {/* Hamburger Menu - Always Visible */}
        <div
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Wrap menu items, cart, and sign-in in the toggle */}
        <div
          className={`navbar-menu-wrapper ${isMenuOpen ? "active" : ""}`}
        >
          {/* Menu Items */}
          {!isProductViewPage && (
            <ul className="navbar-menu">
              <li onClick={() => handleNavClick("home")}>Home</li>
              <li onClick={() => handleNavClick("products")}>Products</li>
              <li onClick={() => handleNavClick("about")}>About Us</li>
              <li onClick={() => handleNavClick("contact-us")}>Contact Us</li>
            </ul>
          )}

          {/* Cart Icon */}
          <Link to="/cart" className="cart-icon">
            <img src={assets1.basketIcon} alt="Cart" />
            {cartCount > 0 && <div className="dot">{cartCount}</div>}
          </Link>

          {/* Sign In Button */}
          <button className="sign-in-button" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
