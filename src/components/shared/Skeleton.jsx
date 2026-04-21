import React from 'react';

const Skeleton = ({ 
  width, 
  height, 
  borderRadius = '0.75rem', 
  className = '', 
  circle = false 
}) => {
  return (
    <div 
      className={`animate-shimmer skeleton-bg ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || '1rem', 
        borderRadius: circle ? '50%' : borderRadius 
      }}
    />
  );
};

export default Skeleton;
