import React from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  className = '',
  ...props
}) => {
  return (
    <div className="input-group">
      {label && (
        <label htmlFor={props.id} className="input-label">
          {label}
          {props.required && <span className="required">*</span>}
        </label>
      )}
      <input
        {...props}
        className={`input-field ${error ? 'error' : ''} ${className}`.trim()}
      />
      {error && <span className="input-error">{error}</span>}
      {helpText && !error && <span className="input-help">{helpText}</span>}
    </div>
  );
};
