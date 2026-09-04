import { useState, useEffect } from "react";

function ProductImage({ variant, productName }) {
  const [activeImage, setActiveImage] = useState(variant?.imageUrl);

  useEffect(() => {
    setActiveImage(variant?.imageUrl);
  }, [variant]);

  return (
    <div className="product-image-container">
      <div className="main-product-image">
        {/* Top left badge */}
        <span className="image-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          0% Interest EMI
        </span>

        {/* Rating Badge */}
        <div className="rating-badge">
          <span className="star">★</span>
          <span className="score">4.8</span>
          <span className="count">(1.2k reviews)</span>
        </div>

        {activeImage ? (
          <img
            src={activeImage}
            alt={`${productName} ${variant?.color || ''}`}
          />
        ) : (
          <div className="no-image">
            No Image Available
          </div>
        )}

        {/* Bottom trust tag */}
        <div className="image-trust">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          ₹0 Down Payment • Mutual Fund Collateral
        </div>
      </div>
    </div>
  );
}

export default ProductImage;