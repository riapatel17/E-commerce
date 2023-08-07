import * as React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Item } from "../../components/item";
import { useCart } from "../../context/cart";
import dummyJsonApi from "../../services/dummyJsonApi";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [query] = useSearchParams();
  const { addToCart } = useCart();
  const mountedRef = React.useRef(false);

  const searchQuery = query.get("q");
  useEffect(
    () => {
      if (mountedRef.current) {
        (async () => {
          const res = await dummyJsonApi.fetchAllProducts(page * 10);
          const data = res.products;
          setProducts(data);
          setHasMore(page * 10 < res.total);
        })();
      }
    },
    [page],
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = searchQuery
        ? await dummyJsonApi.fetchProductsBySearchQuery(searchQuery)
        : await dummyJsonApi.fetchAllProducts();
      const products = data.products;
      setProducts(products);
      setLoading(false);
    };
    fetchProducts().catch(console.error);
    if (!mountedRef.current) {
      mountedRef.current = true;
    }
    return () => {
      mountedRef.current = false;
    };
  }, [searchQuery]);

  const handlePagnavigation = (type) => setPage((p) => type === 'prev' ? p - 1 : p + 1);

  if (!loading && searchQuery && !products.length) {
    return (
      <div className="container">
        <div className="product py-2">
          <div className="details p-3">
            No products found matching your query.
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="products my-5">
        <div className="grid">
          {loading ? (
            <div className="loader" />
          ) : (
            products.map((product) => (
              <Item
                key={product.id}
                data={product}
                addToCart={() => addToCart(product)}
              />
            ))
          )}
        </div>
        <div className="btns">
          <button className="btn-pagination my-1" onClick={() => handlePagnavigation('prev')} disabled={page === 0}>Previous</button>
          <button className="btn-pagination my-1" onClick={() => handlePagnavigation('next')} disabled={!hasMore}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Products;