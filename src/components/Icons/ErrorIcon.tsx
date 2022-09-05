import type { FC } from 'react';
import type { IconInterface } from './icon';

const ErrorIcon: FC<IconInterface> = ({ size, color, className }) => {
  return (
    <svg
      className={`${className || ''}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M11.9995 9V11M11.9995 15H12.0095M5.07134 19H18.9277C20.4673 19 21.4296 17.3333 20.6598 16L13.7316 4C12.9618 2.66667 11.0373 2.66667 10.2675 4L3.33929 16C2.56949 17.3333 3.53174 19 5.07134 19Z"
        stroke={color || '#DC2626'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ErrorIcon;
