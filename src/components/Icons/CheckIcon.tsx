import React from 'react';
import type { IconInterface } from './icon';

import styles from './styles';

const CheckIcon: React.FC<IconInterface> = ({ size, color, className }) => {
  const classes: any = styles({ size, color });
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 10"
      fill="none"
      className={`${classes.Icon} ${className || ''}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L5.70711 9.70711C5.31658 10.0976 4.68342 10.0976 4.29289 9.70711L0.292893 5.70711C-0.0976311 5.31658 -0.0976311 4.68342 0.292893 4.29289C0.683417 3.90237 1.31658 3.90237 1.70711 4.29289L5 7.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893Z"
        fill={color || '#1F2937'}
      />
    </svg>
  );
};

export default CheckIcon;
