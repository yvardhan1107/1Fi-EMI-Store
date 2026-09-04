import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getImageUrl } from "../services/api";

import Navbar from "../components/Navbar";

function Checkout() {
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { product, variant, emiPlan } = location.state || {};

  if (!product || !variant || !emiPlan) {
    return (
      <>
        <Navbar />

        <div className="error-container">
          <h2>No EMI plan selected</h2>
          <p>Please select a product and EMI plan first.</p>

          <Link to="/" className="primary-button">
            Browse Products
          </Link>
        </div>
      </>
    );
  }

  const monthlyPayment = Number(emiPlan.monthlyPayment);
  const interestRate = Number(emiPlan.interestRate);
  const cashback = Number(emiPlan.cashback);
  const price = Number(variant.price);
  const totalCost = monthlyPayment * emiPlan.tenureMonths;

  const handleConfirm = () => {
    setIsSubmitted(true);
  };

  return (
    <>
      <Navbar />

      <main className="checkout-page">
        <div className="container checkout-container animate-in">
          {!isSubmitted ? (
            /* ===================================================
               STAGE 1: REVIEW & CONFIRM PLAN (BEFORE CLICKING CONFIRM)
               =================================================== */
            <>
              {/* Header without green checkmark */}
              <div className="checkout-header">
                <p className="small-label">ORDER SUMMARY</p>
                <h1>Confirm Your Plan</h1>
                <p>Review your product and EMI details before proceeding.</p>
              </div>

              {/* Summary Card */}
              <div className="checkout-card">
                {/* Product info */}
                <div className="checkout-product">
                  <div className="checkout-image">
                    {variant.imageUrl ? (
                      <img
                        src={getImageUrl(variant.imageUrl)}
                        alt={product.name}
                      />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </div>

                  <div>
                    <h2>{product.name}</h2>
                    <p>{variant.storage} • {variant.color}</p>
                    <strong>₹{price.toLocaleString("en-IN")}</strong>
                  </div>
                </div>

                <div className="checkout-divider" />

                {/* EMI Details */}
                <div className="checkout-details">
                  <h3>Selected EMI Plan</h3>

                  <div className="summary-row">
                    <span>Monthly Payment</span>
                    <strong>₹{monthlyPayment.toLocaleString("en-IN")} / mo</strong>
                  </div>

                  <div className="summary-row">
                    <span>Tenure</span>
                    <strong>{emiPlan.tenureMonths} months</strong>
                  </div>

                  <div className="summary-row">
                    <span>Interest Rate</span>
                    <strong className={interestRate === 0 ? "green-text" : ""}>
                      {interestRate === 0 ? "0% (No Cost EMI)" : `${interestRate}% p.a.`}
                    </strong>
                  </div>

                  <div className="summary-row">
                    <span>Cashback</span>
                    <strong className="green-text">
                      ₹{cashback.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div className="summary-row">
                    <span>Total Amount</span>
                    <strong>₹{totalCost.toLocaleString("en-IN")}</strong>
                  </div>
                </div>

                {/* Confirmation CTA Button */}
                <div className="checkout-action-wrapper">
                  <button
                    type="button"
                    className="checkout-confirm-btn"
                    onClick={handleConfirm}
                  >
                    <span>Confirm & Apply for EMI</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                </div>

                <Link
                  to={`/products/${product.slug}`}
                  className="back-link"
                >
                  ← Change selection
                </Link>
              </div>

              {/* Trust footer note */}
              <div className="checkout-trust-note">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>Secured with 1Fi Mutual Fund Pledge Gateway</span>
              </div>
            </>
          ) : (
            /* ===================================================
               STAGE 2: SUCCESS CONFIRMATION (SHOWN AFTER CONFIRM CLICK)
               =================================================== */
            <div className="success-screen animate-in">
              {/* Green checkmark success icon */}
              <div className="checkout-icon success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>

              <p className="small-label green-label">APPLICATION SUCCESSFUL</p>
              <h1>EMI Plan Confirmed!</h1>
              <p className="success-desc">
                Your mutual fund backed EMI application for <strong>{product.name}</strong> ({variant.storage}, {variant.color}) has been submitted successfully.
              </p>

              <div className="checkout-card success-card">
                <div className="app-ref-badge">
                  <span>Application Reference ID</span>
                  <strong>#1FI-984210</strong>
                </div>

                <div className="checkout-divider" />

                <div className="checkout-details">
                  <div className="summary-row">
                    <span>Approved EMI</span>
                    <strong>₹{monthlyPayment.toLocaleString("en-IN")} × {emiPlan.tenureMonths} Months</strong>
                  </div>

                  <div className="summary-row">
                    <span>First Installment</span>
                    <strong>₹0 Down Payment (Due next month)</strong>
                  </div>

                  <div className="summary-row">
                    <span>Status</span>
                    <strong className="green-text">Instant Approved ✓</strong>
                  </div>
                </div>

                <div className="success-actions">
                  <Link to="/" className="primary-button full-width">
                    Return to Products Catalog
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Checkout;