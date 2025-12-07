import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  const baseClass = `btn btn-${variant} btn-${size}`;
  const classes = `${baseClass} ${isLoading ? 'loading' : ''} ${className}`.trim();

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={classes}
    >
      {isLoading ? 'Carregando...' : children}
    </button>
  );
};
