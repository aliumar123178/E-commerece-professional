import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";

import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { ErrorPage } from "./pages/ErrorPage";

import "./App.css";

// BACKEND URL
const BASE_URL = "https://back-ecomerece-3.onrender.com";

function App() {
  const [cart, setCart] = useState([]);

  // LOAD CART
  const loadCart = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/cart-items?expand=product`
      );

      setCart(response.data);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  // RUN ON PAGE LOAD
  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route
        index
        element={
          <HomePage
            cart={cart}
            loadCart={loadCart}
          />
        }
      />

      <Route
        path="checkout"
        element={
          <CheckoutPage
            cart={cart}
            loadCart={loadCart}
          />
        }
      />

      <Route
        path="orders"
        element={<OrdersPage cart={cart} />}
      />

      <Route
        path="tracking/:orderId/:productId"
        element={<TrackingPage cart={cart} />}
      />

      <Route
        path="*"
        element={<ErrorPage />}
      />
    </Routes>
  );
}

export default App;