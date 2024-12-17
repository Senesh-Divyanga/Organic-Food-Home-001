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
            <img src={assets1.logoImage} alt="Logo" className="logo back-arrow-logo" />
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

        {/* Navbar Links, Cart and Sign In Inside Hamburger Menu */}
        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <li onClick={() => handleNavClick("home")}>Home</li>
          <li onClick={() => handleNavClick("products")}>Products</li>
          <li onClick={() => handleNavClick("about")}>About Us</li>
          <li onClick={() => handleNavClick("contact-us")}>Contact Us</li>
          {/* Cart and Sign In Buttons inside the menu */}
          <div className="navbar-right mobile-menu">
            <Link to="/cart" className="cart-icon" onClick={() => setIsMenuOpen(false)}>
              <img src={assets1.basketIcon} alt="Cart" />
              {cartCount > 0 && <div className="dot">{cartCount}</div>}
            </Link>
            <button className="sign-in-button" onClick={() => setShowLogin(true)}>
              Sign In
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
