import type { SvgProps } from '@/components/Icons/type';

const ArrowUpIcon = (props: SvgProps) => {
  const { color, size, style, ...rest } = props;

  return (
    <svg
      {...rest}
      width={size ?? '1em'}
      height={size ?? '1em'}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...style, transform: 'rotateX(180deg)' }}
    >
      <path
        d="M8 3.332v9.333m0 0L12.667 8M8 12.665 3.333 8"
        stroke={color ?? 'currentColor'}
        strokeWidth="1.333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowUpIcon;
