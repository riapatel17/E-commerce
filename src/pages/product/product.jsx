import "./product.css";
import { useEffect, useState } from "react";
import dummyJsonApi from "../../services/dummyJsonApi";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../../context/cart";

const Product = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const { productId } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const product = await dummyJsonApi.fetchProductById(productId);
      setProduct(product);
      setLoading(false);
    };
    fetchProduct().catch(console.error);
  }, [productId]);

  if (!loading && !product) {
    return (
      <div className="container">
        <div className="product py-2">
          <div className="details p-3">
            Product not found. Please visit{" "}
            <Link to="/" replace>
              Home
            </Link>{" "}
            to see all available products
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {loading ? (
        <div className={"loader"}></div>
      ) : (
        <div className="product py-2">
          <div className="details grid p-3">
            <div className="product-image">
              <img src={product.images[0]} alt="" />
            </div>
            <div className="info">
              <div className="description">
                <h3>{product.title}</h3>
                <div className="detail"> {product.brand}</div>
                <div className="detail">{product.category}</div>
                <p>{product.description}</p>
                <h5 className=" my-2">With {product.discountPercentage}% Discount</h5>
              </div>
              <div className="flex">
                <span className="price">${product.price}</span>
                <span className="cart" onClick={() => addToCart(product)}>
                  <img className="cartImg" src="/cart.svg" alt="" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
