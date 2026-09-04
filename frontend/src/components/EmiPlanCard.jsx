function EmiPlanCard({ plan, selected, onSelect }) {
  const monthlyPayment = Number(plan.monthlyPayment);
  const cashback = Number(plan.cashback);
  const interestRate = Number(plan.interestRate);
  const totalCost = monthlyPayment * plan.tenureMonths;

  return (
    <button
      type="button"
      className={`emi-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(plan)}
    >
      <div className="emi-radio">
        <span
          className={selected ? "radio-dot active" : "radio-dot"}
        />
      </div>

      <div className="emi-content">
        <div className="emi-top">
          <div>
            <div className="monthly-payment">
              ₹{monthlyPayment.toLocaleString("en-IN")}
              <span> /month</span>
            </div>

            <div className="tenure">
              {plan.tenureMonths} months tenure • ₹0 Down Payment
            </div>
          </div>

          <div>
            <div className={`interest ${interestRate === 0 ? "zero" : "nonzero"}`}>
              {interestRate === 0
                ? "0% Interest"
                : `${interestRate}% p.a.`}
            </div>

            <div className="total-cost">
              Total: <strong>₹{totalCost.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </div>

        <div className="emi-tags">
          {interestRate === 0 && (
            <span className="interest-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              No Cost EMI
            </span>
          )}

          <span className="downpayment-tag">
            ₹0 Upfront
          </span>

          {cashback > 0 && (
            <span className="cashback">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              Cashback ₹{cashback.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export default EmiPlanCard;