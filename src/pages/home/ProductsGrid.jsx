
import { Product } from "./Product";
export function ProductsGrid({ products,loadCart }) {

  if (products.length === 0) {
    return (
      <div className="products-grid">
        <div className="no-products-message">No products found. Try a different search.</div>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
         <Product key= {product.id} product={product} loadCart={loadCart} />
        );
      })}
    </div>
  );
}
