import React from 'react';
import type { IconInterface } from './icon';

function ChevronIcon({ color, size }: IconInterface) {
  return (
    <svg width={size || '20'} height={size || '20'} viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.7071 7.29289L9.99999 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68341 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
        fill={color || '#6B7280'}
      />
    </svg>
  );
}

export default ChevronIcon;
