import React, { useState, useRef } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import ProductView from "./pages/ProductView/ProductView";
import { CartProvider } from "./context/CartContext";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const homeRef = useRef(null);
  const footerRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to a section
  const scrollToSection = (section) => {
    if (section === "contact-us") {
      footerRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      homeRef.current?.scrollToSection(section);
    }
  };

  // Render Back Arrow in Navbar only on ProductView page
  const showBackArrow = location.pathname.includes("/product-view");

  return (
    <CartProvider>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="app" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Navbar with optional back arrow */}
        <Navbar
          setShowLogin={setShowLogin}
          scrollToSection={scrollToSection}
          showBackArrow={showBackArrow}
          onBack={() => navigate(-1)} // Navigate to the previous page
        />

        {/* Main Content with padding to prevent overlap */}
        <div className="content" style={{ flexGrow: 1, paddingTop: "70px" }}>
          <Routes>
            <Route path="/" element={<Home ref={homeRef} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/product-view/:id" element={<ProductView />} />
          </Routes>
        </div>

        {/* Footer */}
        <div ref={footerRef}>
          <Footer />
        </div>
      </div>
    </CartProvider>
  );
};

export default App;
