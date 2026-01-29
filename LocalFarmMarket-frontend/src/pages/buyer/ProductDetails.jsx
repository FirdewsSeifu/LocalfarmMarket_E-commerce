import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import api from "../../api";
import "../../styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState("");
  const [ratingInput, setRatingInput] = useState(5);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/products/${id}`);
        const data = response.data;
        setProduct(data);
        setReviews(data.reviews || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    console.log('Product being added to cart:', product);
    addToCart({ ...product, quantity });
  };

  const handleSubmitReview = async () => {
    if (!reviewInput.trim()) return;

    try {
      const res = await api.post(`/api/reviews`, {
        productId: id,
        rating: ratingInput,
        comment: reviewInput,
      });

      const newReview = res.data;
      setReviews([newReview, ...reviews]);
      setReviewInput("");
      setRatingInput(5);
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="not-found">Product not found</div>;

  return (
    <div className="product-details-container">
      <div className="product-images">
        {product.images?.map((img, index) => (
          <img
            key={index}
            src={`/assets/images/products/${img?.replace('../assets/images/products/', '')}`}
            alt={`${product.name} ${index + 1}`}
            onError={(e) => {
              e.target.src = '/placeholder-product.png';
            }}
          />


        ))}
      </div>


      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">{product.price.toLocaleString()} ETB</p>
        <p className="category">Category: {product.categoryId?.name}</p>

        <div className="quantity-selector">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <div className="description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        {product.specifications && Object.entries(product.specifications).length > 0 && (
          <div className="specifications">
            <h3>Specifications</h3>
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="spec-row">
                <span className="spec-key">{key}:</span>
                <span className="spec-value">{value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="review-section">
          <h3>Customer Reviews</h3>

          <div className="review-form">
            <textarea
              value={reviewInput}
              onChange={(e) => setReviewInput(e.target.value)}
              placeholder="Write your review..."
            />
            <div className="rating-input">
              <label htmlFor="rating">Rating:</label>
              <select
                id="rating"
                value={ratingInput}
                onChange={(e) => setRatingInput(Number(e.target.value))}
              >
                {[5, 4, 3, 2, 1].map(num => (
                  <option key={num} value={num}>{num} Star{num > 1 && "s"}</option>
                ))}
              </select>
            </div>
            <button onClick={handleSubmitReview}>Submit Review</button>
          </div>

          {reviews.length > 0 ? (
            <ul className="review-list">
              {reviews.map((review, i) => (
                <li key={review._id || i} className="review-item">
                  <div><strong>{review.userId?.name || "Anonymous"}</strong></div>
                  <div>⭐ {review.rating}/5</div>
                  <p>{review.comment}</p>
                  <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
