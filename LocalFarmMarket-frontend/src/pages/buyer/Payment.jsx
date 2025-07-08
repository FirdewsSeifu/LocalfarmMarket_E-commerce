import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/payment.css";

const Payment = () => {
  const [orderId, setOrderId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize payment when component mounts if orderId is in location state
  useEffect(() => {
    if (location.state?.orderId) {
      setOrderId(location.state.orderId);
    }
  }, [location.state]);

  // Check for payment verification if redirected back from Chapa
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get("paymentId");
    const error = queryParams.get("error");

    if (paymentId) {
      verifyPayment(paymentId);
    } else if (error) {
      setError("Payment processing failed. Please try again.");
    }
  }, [location.search]);

  const initializePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await axios.post(
        "/api/payments/initialize",
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Redirect to Chapa payment page
      window.location.href = response.data.paymentUrl;
    } catch (err) {
      console.error("Payment initialization failed:", err);
      setError(
        err.response?.data?.message ||
          "Failed to initialize payment. Please try again."
      );
      setIsProcessing(false);
    }
  };

  const verifyPayment = async (paymentId) => {
    setIsProcessing(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/payments/status/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === "successful") {
        navigate("/order-success", { state: { paymentId } });
      } else {
        setError("Payment failed or was not completed");
      }
    } catch (err) {
      console.error("Payment verification failed:", err);
      setError("Failed to verify payment status");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Details</h2>
      
      {error && <div className="payment-error">{error}</div>}

      <form onSubmit={initializePayment} className="payment-form">
        <label>Order ID</label>
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
          disabled={isProcessing}
        />

        <div className="payment-methods">
          <h3>Select Payment Method</h3>
          <div className="method-option">
            <input
              type="radio"
              id="chapa"
              name="paymentMethod"
              value="chapa"
              defaultChecked
            />
            <label htmlFor="chapa">Pay with Chapa (Credit/Debit Card, Mobile Money)</label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing || !orderId}
          className="pay-button"
        >
          {isProcessing ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>

      <div className="payment-info">
        <p>You will be redirected to Chapa's secure payment page to complete your transaction.</p>
        <p>All payments are processed securely. We do not store your card details.</p>
      </div>
    </div>
  );
};

export default Payment;