import type { FC } from 'react';
import type { IconInterface } from './icon';

const TrashIcon: FC<IconInterface> = ({ className }) => {
  return (
    <svg className={`${className || ''}`} viewBox="0 0 12 14" fill="none">
      <path
        d="m10.666 3.667-.578 8.095A1.333 1.333 0 0 1 8.758 13H3.241c-.7 0-1.28-.54-1.33-1.238l-.578-8.095m3.333 2.666v4m2.667-4v4M8 3.667v-2A.667.667 0 0 0 7.333 1H4.666A.667.667 0 0 0 4 1.667v2m-3.333 0h10.666"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TrashIcon;
