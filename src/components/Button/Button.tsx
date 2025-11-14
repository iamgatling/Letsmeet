import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'link';
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  type = 'submit',
}) => {
  const buttonClass = variant === 'primary' ? styles.primary : styles.link;

  return (
    <button type={type} className={`${styles.button} ${buttonClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;