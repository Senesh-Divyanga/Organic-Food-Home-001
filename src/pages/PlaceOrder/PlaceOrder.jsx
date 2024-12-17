import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ElementsConsumer, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const { cartItems, totalCartQuantity } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate the total price
    const price = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(price);

    // Create a payment intent on the server
    axios.post("/create-payment-intent", {
      amount: price * 100, // Convert to cents
    })
    .then(response => setClientSecret(response.data.clientSecret))
    .catch(error => console.error("Error creating payment intent", error));
  }, [cartItems]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    // Confirm the payment with the card details
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error("Error processing payment: ", error);
      setLoading(false);
      alert(error.message);
    } else if (paymentIntent.status === "succeeded") {
      alert("Payment successful!");
      // Redirect to a success page or order summary page
      navigate("/order-success");
    }
  };

  return (
    <div className="order-container">
      <h1>Complete Your Order</h1>
      <h2>Total: ${totalPrice.toFixed(2)}</h2>

      <form onSubmit={handleSubmit}>
        <div className="card-element-container">
          <CardElement />
        </div>
        <button disabled={!stripe || loading} type="submit">
          {loading ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
