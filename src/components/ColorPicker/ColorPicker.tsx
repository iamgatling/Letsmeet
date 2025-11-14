import React from 'react';
import styles from './ColorPicker.module.css';

type ColorPickerProps = {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
  name: string; // Used for the radio group
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  selectedColor,
  onChange,
  name,
}) => {
  return (
    <div className={styles.wrapper}>
      {colors.map((color) => (
        <label key={color} className={styles.label}>
          <input
            type="radio"
            name={name}
            value={color}
            checked={selectedColor === color}
            onChange={() => onChange(color)}
            className={styles.radioInput}
          />
          <span
            className={styles.swatch}
            style={{ backgroundColor: color }}
          ></span>
        </label>
      ))}
    </div>
  );
};

export default ColorPicker;