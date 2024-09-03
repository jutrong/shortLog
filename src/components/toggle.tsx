import React from 'react';

interface SwitchProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ isChecked, onChange }) => {
  return (
    <label className="relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        className="absolute opacity-0 w-0 h-0"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        className={`slider block w-8 h-4 rounded-full bg-gray-300 before:absolute before:content-[''] before:top-0.5 before:left-0.5 before:bg-white before:border-2 before:border-black before:h-3.5 before:w-3.5 before:rounded-full before:shadow-sliderShadow transition-all duration-200 ease-in-out ${isChecked ? 'bg-blue-500 before:translate-x-4' : ''
          }`}
      ></span>
    </label>
  );
};

export default Switch;
