import IconWrapper from '@/components/Icons/_IconWrapper';
import type { SvgProps } from '@/components/Icons/type';

const TrashIcon = (props: SvgProps) => {
  const { color, size, ...rest } = props;

  return (
    <IconWrapper>
      <svg
        {...rest}
        width={size ?? '1em'}
        height={size ?? '1em'}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.333 5v-.667c0-.933 0-1.4-.181-1.756a1.667 1.667 0 0 0-.729-.729c-.356-.181-.823-.181-1.756-.181H9.333c-.933 0-1.4 0-1.756.181-.314.16-.569.415-.729.729-.181.356-.181.823-.181 1.756V5m1.666 4.583v4.167m3.334-4.167v4.167M2.5 5h15m-1.667 0v9.333c0 1.4 0 2.1-.272 2.635a2.5 2.5 0 0 1-1.093 1.093c-.534.272-1.235.272-2.635.272H8.167c-1.4 0-2.1 0-2.635-.272a2.5 2.5 0 0 1-1.093-1.093c-.272-.534-.272-1.235-.272-2.635V5"
          stroke={color ?? 'currentColor'}
          strokeWidth={1.667}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
};

export default TrashIcon;
