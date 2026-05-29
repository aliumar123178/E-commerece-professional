import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import "./HomePage.css";
import { ProductsGrid } from "./ProductsGrid";

// BACKEND URL
const BASE_URL = "https://back-ecomerece-3.onrender.com";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const getHomeData = async () => {
        try {
          const url = searchQuery
            ? `${BASE_URL}/api/products?search=${encodeURIComponent(searchQuery)}`
            : `${BASE_URL}/api/products`;

          const response = await axios.get(url);
          setProducts(response.data);
        } catch (error) {
          console.error("Error loading products:", error);
        }
      };

      getHomeData();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <title>Cartly - Your Shopping Destination</title>

      <Header
        cart={cart}
        onSearchChange={setSearchQuery}
      />

      <div className="home-page">
        <ProductsGrid
          products={products}
          loadCart={loadCart}
        />
      </div>
    </>
  );
}