import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load products. Please check if the backend server is running.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <p className="hero-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              SMART EMI STORE
            </p>

            <h1>
              Buy flagship phones on
              <br />
              <span className="accent">zero-cost EMI.</span>
            </h1>

            <p>
              Leverage your mutual fund investments as collateral.
              No credit card needed. Instant approval with cashback
              on every purchase.
            </p>

            {/* Trust badges */}
            <div className="trust-row">
              <div className="trust-item">
                <svg className="green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Mutual Fund Backed
              </div>

              <div className="trust-item">
                <svg className="blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                0% Interest Available
              </div>

              <div className="trust-item">
                <svg className="amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                Up to ₹8,000 Cashback
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="products-section">
          <div className="container">
            <div className="section-heading">
              <h2>Featured Devices</h2>

              {!loading && !error && (
                <span>{products.length} products</span>
              )}
            </div>

            {loading && (
              <div className="page-loading">
                Loading products...
              </div>
            )}

            {error && (
              <div className="error-container" style={{ minHeight: "30vh" }}>
                <h2>{error}</h2>
                <button
                  className="primary-button"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && products.length === 0 && (
              <div className="error-container" style={{ minHeight: "30vh" }}>
                <h2>No products found</h2>
                <p>Make sure your database has been seeded.</p>
              </div>
            )}

            {!loading && !error && products.length > 0 && (
              <div className="products-grid animate-in">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;