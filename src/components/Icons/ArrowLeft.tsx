import type { SvgProps } from '@/components/Icons/type';

const ArrowLeftIcon = (props: SvgProps) => {
  const { color, size, ...rest } = props;

  return (
    <svg
      {...rest}
      width={size ?? 24}
      height={size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.548 3.6 10.8 4.86 4.603 11.1H24v1.8H4.606l6.194 6.24-1.252 1.26-7.09-7.14-.006.007-1.252-1.26L9.548 3.6Z"
        fill={color ?? 'var(--icon-color)'}
      />
    </svg>
  );
};

export default ArrowLeftIcon;
