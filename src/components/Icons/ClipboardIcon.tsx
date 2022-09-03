import type { FC } from 'react';
import type { IconInterface } from './icon';


const ClipboardIcon: FC<IconInterface> = ({ size, color, className }) => {
  return (
    <svg
      className={`${className || ''}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18 7V19H20V7H18ZM17 20H7V22H17V20ZM6 19V7H4V19H6ZM7 6H9V4H7V6ZM15 6H17V4H15V6ZM7 20C6.44772 20 6 19.5523 6 19H4C4 20.6569 5.34315 22 7 22V20ZM18 19C18 19.5523 17.5523 20 17 20V22C18.6569 22 20 20.6569 20 19H18ZM20 7C20 5.34315 18.6569 4 17 4V6C17.5523 6 18 6.44772 18 7H20ZM6 7C6 6.44772 6.44772 6 7 6V4C5.34315 4 4 5.34315 4 7H6ZM11 4H13V2H11V4ZM13 6H11V8H13V6ZM11 6C10.4477 6 10 5.55228 10 5H8C8 6.65685 9.34315 8 11 8V6ZM14 5C14 5.55228 13.5523 6 13 6V8C14.6569 8 16 6.65685 16 5H14ZM13 4C13.5523 4 14 4.44772 14 5H16C16 3.34315 14.6569 2 13 2V4ZM11 2C9.34315 2 8 3.34315 8 5H10C10 4.44772 10.4477 4 11 4V2Z"
        fill={color || '#FBBF24'}
      />
    </svg>
  );
};

export default ClipboardIcon;
