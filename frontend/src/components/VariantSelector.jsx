function VariantSelector({
  variants,
  selectedVariant,
  onSelect,
}) {
  return (
    <div className="variant-section">
      <div className="option-heading">
        <h3>Choose Variant</h3>

        {selectedVariant && (
          <span>
            {selectedVariant.storage} • {selectedVariant.color}
          </span>
        )}
      </div>

      <div className="variant-grid">
        {variants.map((variant) => {
          const selected = selectedVariant?.id === variant.id;

          return (
            <button
              key={variant.id}
              type="button"
              className={`variant-button ${selected ? "selected" : ""}`}
              onClick={() => onSelect(variant)}
            >
              <strong>{variant.storage}</strong>
              <span>{variant.color}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default VariantSelector;