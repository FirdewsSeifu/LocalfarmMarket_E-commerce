import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import api from "../../api";
import "../../styles/productList.css";

const ProductList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchQuery);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true while fetching

        // Fetch products
        const response = await api.get("/api/products");
        const productsData = response.data;


        setProducts(productsData);

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    fetchData();
  }, []); // This will run once on component mount

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  // Filter products based on search and category filter
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) => (filter ? product.category === filter : true))
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="product-list-container">
      <h1 className="heading">Farm Products</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search products..."
          className="input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="select" onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Best Rating</option>
        </select>


      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={`/assets/images/products/${product.images?.[0]}`}
                alt={product.name}
                onError={(e) => {
                  e.target.src = '/placeholder-product.png';
                }}
              />



              <h2>{product.name}</h2>
              <p className="price">{product.price.toLocaleString()} ETB</p>
              <p className="rating">⭐ {product.rating || "Not rated"}</p>
              <Link
                to={`/product/${product._id}`}
                className="details-btn"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <div className="no-products">
            <p>No products found</p>
            <button
              onClick={() => {
                setFilter("");
                setSearch("");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
