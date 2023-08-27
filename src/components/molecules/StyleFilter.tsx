import React from "react";

interface StyleFilterProps {
  selectedRange: string;
  onChange: (range: string) => void;
}

export const StyleFilter: React.FC<StyleFilterProps> = ({ selectedRange, onChange }) => {
  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="text-[0.85em] leading-[1.2em] sm:text-[1em] radio-container h-full border-[1.5px] border-[#71c16a] p-1.5 sm:p-4 " >
      <p className=" my-1 mb-2">Select style range:</p>
      <div>
        <label  className="radio-label">
          <input
            type="radio"
            name="style-range"
            value="all"
            checked={selectedRange === "all"}
            onChange={handleRangeChange}
            className="radio-input "
          />
          All
        </label >
      </div>
      <div>
        <label  className="radio-label">
          <input
            type="radio"
            name="style-range"
            value="Modern Toilets"
            checked={selectedRange === "Modern Toilets"}
            onChange={handleRangeChange}
            className="radio-input"
          />
          Modern
        </label >
      </div>
      <div>
        <label  className="radio-label">
          <input
            type="radio"
            name="style-range"
            value="Traditional Close Coupled Toilets"
            checked={selectedRange === "Traditional Close Coupled Toilets"}
            onChange={handleRangeChange}
            className="radio-input"
          />
          Traditional
        </label >
      </div>
      <div>
        <label  className="radio-label">
          <input
            type="radio"
            name="style-range"
            value="Back To Wall Toilets"
            checked={selectedRange === "Back To Wall Toilets"}
            onChange={handleRangeChange}
            className="radio-input"
          />
          Back to wall
        </label >
      </div>
      <div>
        <label  className="radio-label">
          <input
            type="radio"
            name="style-range"
            value="Cloakroom Toilets"
            checked={selectedRange === "Cloakroom Toilets"}
            onChange={handleRangeChange}
            className="radio-input"
          />
        Cloakroom
        </label >
      </div>
      <div>
        <label  className="radio-label">
          <input
            type="radio"
            name="style-range"
            value="Close Coupled Toilets"
            checked={selectedRange === "Close Coupled Toilets"}
            onChange={handleRangeChange}
            className="radio-input"
          />
          Coupleds
        </label >
      </div>
    </div>
  );
};
