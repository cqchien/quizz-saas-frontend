import type { ReactNode } from 'react';
import React from 'react';

interface CustomIconProps {
  children: ReactNode;
}

const IconWrapper: React.FC<CustomIconProps> = ({ children }) => {
  return (
    <span className="morpheus-icon" style={{ display: 'flex' }}>
      {children}
    </span>
  );
};

export default IconWrapper;

