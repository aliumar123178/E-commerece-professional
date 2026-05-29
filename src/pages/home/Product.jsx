import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";
import CheckmarkIcon from "../../assets/images/icons/checkmark.png";

// BACKEND URL
const BASE_URL = "https://back-ecomerece-3.onrender.com";

export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    try {
      await axios.post(`${BASE_URL}/api/cart-items`, {
        productId: product.id,
        quantity,
      });

      await loadCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const selectQuantity = (event) => {
    setQuantity(Number(event.target.value));
  };

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
          alt={`${product.rating.stars} out of 5 stars`}
        />

        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">
        {formatMoney(product.priceCents)}
      </div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={selectQuantity}>
          {[1,2,3,4,5,6,7,8,9,10].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart">
        <img src={CheckmarkIcon} alt="Added" />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}