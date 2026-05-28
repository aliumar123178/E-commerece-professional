import { Header } from '../components/Header';
import './TrackingPage.css';
import { Link,useParams } from 'react-router';
import { useState,useEffect } from 'react';  
import axios from 'axios';  
import dayjs from 'dayjs';
export function TrackingPage({cart}) {
  const { orderId ,productId } = useParams();
  const [orderProduct, setOrderProduct] = useState(null);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
    axios.get(`/api/orders/${orderId}?expand=products`).then((response) => {
      if (response.data.products && response.data.products.length > 0) {
        const product = response.data.products.find(p => p.product.id === productId);
        setOrderProduct(product || response.data.products[0]);
      }
      setLoading(false);
    });
  }, [orderId]);
   if (loading) return <div>Loading...</div>;
  if (!orderProduct) return <div>No tracking information available</div>;

  return (
    <>
    <title>Cartly Order Tracking</title>
    <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img
            className="product-image"
            src={orderProduct.product.image}
            alt={orderProduct.product.name}
          />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}
