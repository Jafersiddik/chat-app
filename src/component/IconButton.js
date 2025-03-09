import React from 'react';

const IconButton = ({ icon: Icon, label, onClick,size,className }) => {
  return (
    <button onClick={onClick} className={`icon-button ${className}`}>
      <Icon size={size} color="#fff" className="icon"/> {/* Render the passed icon */}
      {label}
    </button>
  );
};

export default IconButton;