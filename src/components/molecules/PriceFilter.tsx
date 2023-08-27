import React from "react";

interface PriceFilterProps {
    selectedRange: string;
    onChange: (range: string) => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({ selectedRange, onChange }) => {
    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="text-[0.85em] leading-[1.2em] sm:text-[1em] radio-container h-full border-[1.5px] border-[#71c16a] p-1.5 sm:p-4 " >
        <p className="my-1 mb-2">Select price range:</p>
            <div className="radio-container">       
             <label className="radio-label">
                <input
                    type="radio"
                    name="price-range"
                    value="all"
                    checked={selectedRange === "all"}
                    onChange={handleRangeChange}
                    className="radio-input" />All
            </label>
            </div>
            <div>
                <label className="radio-label">
                    <input
                        type="radio"
                        name="price-range"
                        value="low"
                        checked={selectedRange === "low"}
                        onChange={handleRangeChange}
                        className="radio-input" />
                    Low
                </label>
            </div>
            <div>
                <label className="radio-label">
                    <input
                        type="radio"
                        name="price-range"
                        value="medium"
                        checked={selectedRange === "medium"}
                        onChange={handleRangeChange}
                        className="radio-input" />
                    Medium
                </label>
            </div>
            <div>
                <label className="radio-label">
                    <input
                        type="radio"
                        name="price-range"
                        value="high"
                        checked={selectedRange === "high"}
                        onChange={handleRangeChange}
                        className="radio-input" />
                    High
                </label>
            </div>
        </div>
    );
};
