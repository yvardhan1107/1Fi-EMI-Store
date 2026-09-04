import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const firstVariant = product.variants?.[0];
  const price = firstVariant ? Number(firstVariant.price) : 0;
  const mrp = firstVariant ? Number(firstVariant.mrp) : 0;
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  return (
    <div className="product-card">
      <div className="product-card-image">
        <span className="card-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          0% EMI Available
        </span>

        {firstVariant?.imageUrl ? (
          <img
            src={firstVariant.imageUrl}
            alt={product.name}
          />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>

      <div className="product-card-content">
        <h2>{product.name}</h2>

        <p className="product-description">
          {product.description}
        </p>

        {firstVariant && (
          <div className="card-price-row">
            <div>
              <span className="card-price-label">Starting from</span>
              <div className="product-price">
                ₹{price.toLocaleString("en-IN")}
              </div>
            </div>
            {mrp > price && (
              <span className="card-mrp">
                MRP ₹{mrp.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        )}

        <Link
          to={`/products/${product.slug}`}
          className="view-button"
        >
          View EMI Plans
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;