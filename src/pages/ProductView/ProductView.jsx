import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductView.css";
import assets1 from "../../assets1/asets1";
import { useCart } from "../../context/CartContext";  // Assuming you have this context

const ProductView = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const { addToCart, updateCartItemQuantity } = useCart(); // Use context for adding/updating cart

  const products = [
    {
      id: 1,
      title: "Brinjal Moju",
      price: 10.0,
      description: "Delicious homemade Brinjal Moju.",
      detailedDescription: "Brinjal Moju is a unique Sri Lankan dish made with brinjal (eggplant) cooked in a tangy and spicy sauce.",
      mainImage: assets1.brinjalImage,
      sideImages: [assets1.aboutImage, assets1.starIcon, assets1.overlayImage],
    },
    {
      id: 2,
      title: "Pineapple Jam",
      price: 7.5,
      description: "Fresh and organic pineapple jam.",
      detailedDescription: "This pineapple jam is made with ripe, organic pineapples, sugar, and a touch of lemon juice.",
      mainImage: assets1.pineappleImage,
      sideImages: [assets1.aboutImage, assets1.starIcon, assets1.overlayImage],
    },
    {
      id: 3,
      title: "Mango Pickle",
      price: 8.0,
      description: "Rich mango pickle with a kick.",
      detailedDescription: "This mango pickle is made with fresh, organic mango, sugar, and a hint of lime juice.",
      mainImage: assets1.mangoImage,
      sideImages: [assets1.aboutImage, assets1.starIcon, assets1.overlayImage],
    },
    {
      id: 4,
      title: "Mix Vgetables",
      price: 8.0,
      description: "A mix of fresh vegetables.",
      detailedDescription: "A mix of fresh vegetables, perfect for a healthy snack.",
      mainImage: assets1.vegeImage,
      sideImages: [assets1.aboutImage, assets1.starIcon, assets1.overlayImage],
    },
  ];

  // Find the product by ID
  const product = products.find((product) => product.id === parseInt(id));
  if (!product) {
    return <div>Product not found</div>;
  }

  const [mainImage, setMainImage] = useState(product.mainImage);
  const [sideImages, setSideImages] = useState(product.sideImages);
  const [quantity, setQuantity] = useState(1); // Quantity state

  // Handle side image click to update the main image and swap positions
  const handleImageClick = (imageSrc, index) => {
    const newSideImages = [...sideImages];
    const currentMainImage = mainImage;

    // Swap the images
    setMainImage(imageSrc); // Set clicked side image as the main image
    newSideImages[index] = currentMainImage; // Place the current main image in the clicked side image's position

    setSideImages(newSideImages); // Update the side images array
  };

  // Increment quantity
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Decrement quantity (minimum is 1)
  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  // Add product to cart with selected quantity
  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  // Handle cart item quantity update
  const handleUpdateCartQuantity = (newQuantity) => {
    updateCartItemQuantity(product.id, newQuantity);
    setQuantity(newQuantity);
  };

  return (
    <div className="product-view">
      <div className="content">
        <div className="image-side">
          <div className="main-image">
            <img src={mainImage} alt="Main product view" />
          </div>
          <div className="side-images">
            {sideImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Side view ${index + 1}`}
                onClick={() => handleImageClick(image, index)} // Click to swap the image
                className={`side-image ${image === mainImage ? 'active' : ''}`} // Add 'active' class to the main image
              />
            ))}
          </div>
        </div>
        <div className="product-details">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h2>${(product.price * quantity).toFixed(2)}</h2>
          <p>{product.detailedDescription}</p>

          {/* Quantity Control */}
          <div className="quantity-controls">
            <button onClick={handleDecrease} className="quantity-btn">
              <img src={assets1.removeIcon} alt="Decrease" />
            </button>
            <span className="quantity">{quantity}</span>
            <button onClick={handleIncrease} className="quantity-btn">
              <img src={assets1.addIcon} alt="Increase" />
            </button>
          </div>
          <br />

          {/* Add to Cart Button */}
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;





{/* <div className="quantity-controls">
          <button onClick={handleDecrease} className="quantity-btn">
            <img src={assets1.removeIcon} alt="Decrease" />
          </button>
          <span className="quantity">{quantity}</span>
          <button onClick={handleIncrease} className="quantity-btn">
            <img src={assets1.addIcon} alt="Increase" />
          </button>
        </div> */}