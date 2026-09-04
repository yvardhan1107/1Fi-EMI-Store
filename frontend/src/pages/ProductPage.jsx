import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProductImage from "../components/ProductImage";
import VariantSelector from "../components/VariantSelector";
import EmiPlanCard from "../components/EmiPlanCard";

import { getProductBySlug } from "../services/api";

function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedEmi, setSelectedEmi] = useState(null);
  const [pincode, setPincode] = useState("");
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProductBySlug(slug);
        const productData = response.data;

        setProduct(productData);

        if (productData?.variants && productData.variants.length > 0) {
          setSelectedVariant(productData.variants[0]);
        }
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || "Unable to load product."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setSelectedEmi(null);
  };

  const handleProceed = () => {
    if (!selectedVariant || !selectedEmi) return;

    navigate("/checkout", {
      state: {
        product,
        variant: selectedVariant,
        emiPlan: selectedEmi,
      },
    });
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeChecked(true);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-loading">
          Loading product...
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="error-container">
          <h2>{error || "Product not found"}</h2>
          <Link to="/" className="primary-button">
            ← Back to Products
          </Link>
        </div>
      </>
    );
  }

  const price = selectedVariant ? Number(selectedVariant.price) : 0;
  const mrp = selectedVariant ? Number(selectedVariant.mrp) : 0;
  const savings = mrp - price;
  const discountPercent = mrp > 0 ? Math.round((savings / mrp) * 100) : 0;

  const faqs = [
    {
      q: "How does Mutual Fund backed EMI work?",
      a: "Instead of paying upfront or using a credit card limit, your existing mutual fund portfolio acts as collateral. Your investments stay intact while earning returns."
    },
    {
      q: "Is there any down payment required?",
      a: "No! Most plans offer ₹0 down payment with 0% interest on selected tenure options."
    },
    {
      q: "What documents are required to complete KYC?",
      a: "Only your PAN number and Mobile number registered with CAMS/KFintech for instant online verification."
    }
  ];

  return (
    <>
      <Navbar />

      <main className="product-page">
        <div className="container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <Link to="/">Smart Phones</Link>
            <span className="sep">/</span>
            <span>{product.name}</span>
          </div>

          <div className="product-layout animate-in">
            {/* LEFT SIDE — Image */}
            <div className="product-left">
              <ProductImage
                variant={selectedVariant}
                productName={product.name}
              />
            </div>

            {/* RIGHT SIDE — Details */}
            <div className="product-right">
              <div className="product-title-area">
                <p className="small-label">SMARTPHONE</p>
                <h1>{product.name}</h1>

                <p className="product-description-large">
                  {product.description}
                </p>
              </div>

              {/* Price Section */}
              {selectedVariant && (
                <div className="price-section">
                  <div className="mrp">
                    MRP <span>₹{mrp.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="selling-price-row">
                    <div className="selling-price">
                      ₹{price.toLocaleString("en-IN")}
                    </div>

                    {savings > 0 && (
                      <span className="discount-badge">
                        Save ₹{savings.toLocaleString("en-IN")} ({discountPercent}% off)
                      </span>
                    )}
                  </div>

                  <div className="price-note">
                    Inclusive of all taxes • ₹0 Down Payment Options Available
                  </div>
                </div>
              )}

              {/* Variant Selector */}
              <VariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onSelect={handleVariantChange}
              />

              {/* Delivery & Pincode Checker */}
              <div className="delivery-section">
                <div className="delivery-header">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <rect x="1" y="3" width="15" height="13" rx="2"/>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/>
                    <circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                  <strong>Delivery & Service Options</strong>
                </div>

                <form onSubmit={handleCheckPincode} className="pincode-form">
                  <input
                    type="text"
                    maxLength="6"
                    placeholder="Enter 6-digit Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="pincode-input"
                  />
                  <button type="submit" className="pincode-btn">
                    Check
                  </button>
                </form>

                {pincodeChecked && (
                  <div className="pincode-success">
                    ✓ Express Delivery available to <strong>{pincode}</strong> in 2-3 Business Days.
                  </div>
                )}

                <div className="trust-features">
                  <div className="feature-item">
                    <span>🚚</span> Free Express Delivery
                  </div>
                  <div className="feature-item">
                    <span>🛡️</span> 1 Year Brand Warranty
                  </div>
                  <div className="feature-item">
                    <span>🔄</span> 7 Days Replacement
                  </div>
                </div>
              </div>

              {/* EMI Plans */}
              {selectedVariant && (
                <section className="emi-section">
                  <div className="emi-heading">
                    <h2>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                        <line x1="1" y1="10" x2="23" y2="10"/>
                      </svg>
                      Select EMI Plan (Mutual Fund Backed)
                    </h2>

                    <p>
                      No credit card needed. Instant approval with ₹0 down payment.
                    </p>
                  </div>

                  <div className="emi-plans">
                    {selectedVariant.emiPlans?.map((plan) => (
                      <EmiPlanCard
                        key={plan.id}
                        plan={plan}
                        selected={selectedEmi?.id === plan.id}
                        onSelect={setSelectedEmi}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Small Proceed Button */}
              <div className="proceed-wrapper">
                <button
                  type="button"
                  className="small-proceed-button"
                  disabled={!selectedVariant || !selectedEmi}
                  onClick={handleProceed}
                >
                  <span>Proceed</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>

              {/* FAQ Section */}
              <div className="faq-section">
                <h3>Frequently Asked Questions</h3>
                <div className="faq-list">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="faq-item">
                      <button
                        type="button"
                        className="faq-question"
                        onClick={() => toggleFaq(idx)}
                      >
                        <span>{faq.q}</span>
                        <span className="faq-icon">{openFaq === idx ? "−" : "+"}</span>
                      </button>
                      {openFaq === idx && (
                        <div className="faq-answer">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductPage;