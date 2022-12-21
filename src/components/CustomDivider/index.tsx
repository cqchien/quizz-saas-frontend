import type { DividerProps } from 'antd';
import { Divider } from 'antd';
import classNames from 'classnames';
import type { FC } from 'react';
import './index.less';

interface CustomDividerProps extends DividerProps {
  size?: 'sm' | 'md' | 'lg';
}

const CustomDivider: FC<CustomDividerProps> = ({ size = 'lg', ...props }) => {
  const classes = classNames(`custom-divider margin--${size}`);

  return <Divider className={classes} {...props} />;
};

export default CustomDivider;
