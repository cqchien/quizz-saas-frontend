import type { SpaceProps } from 'antd';
import { Space } from 'antd';
import classNames from 'classnames';
import type { FC } from 'react';
import './style.less';

export interface CustomSpaceProps extends SpaceProps {
  fullWidth?: boolean;
  justify?: 'center' | 'between' | 'end' | 'start' | null;
  reverse?: boolean;
}

const CustomSpace: FC<CustomSpaceProps> = (props) => {
  const { children, fullWidth, className, justify, ...rest } = props;
  const cls = classNames(
    'custom-space',
    className,
    `justify-${justify ?? 'start'}`,
    { 'reverse': props.reverse }
  );

  return (
    <Space
      {...rest}
      style={{ width: fullWidth ? '100%' : 'auto' }}
      className={cls}
    >
      {children}
    </Space>
  );
};
CustomSpace.defaultProps = {
  fullWidth: true
};
export default CustomSpace;
