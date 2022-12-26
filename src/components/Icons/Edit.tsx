import type { SvgProps } from '@/components/Icons/type';

const Edit = (props: SvgProps) => {
  const { color, size, ...rest } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? '1em'}
      height={size ?? '1em'}
      fill="none"
      stroke={color ?? 'currentColor'}
      viewBox="0 0 20 20"
      {...rest}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        stroke={color ?? 'currentColor'}
        d="M11.05 3l-6.842 7.242c-.258.275-.508.816-.558 1.191l-.308 2.7c-.109.975.591 1.642 1.558 1.475l2.683-.458c.375-.067.9-.342 1.159-.625l6.841-7.242c1.184-1.25 1.717-2.675-.125-4.416C13.625 1.142 12.233 1.75 11.05 3zM9.908 4.208A5.105 5.105 0 0014.45 8.5M2.5 18.333h15"
      />
    </svg>
  );
};

Edit.defalutProps = {
  color: 'currentColor',
};

export default Edit;
