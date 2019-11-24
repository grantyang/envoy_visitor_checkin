import React from 'react';

export default function Button({ className, buttonText, onClick }) {
  return (
    <span className={`button ${className}`} onClick={onClick}>
      <span>{buttonText}</span>
    </span>
  );
}
