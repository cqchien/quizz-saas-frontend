import type { FC } from 'react';
import { Input } from 'antd';
import type { InputProps } from 'antd';
import Error from '@/components/Icons/ExclamationCircle';

const AntFormInput: FC<InputProps> = ({ className, ...rest }) => {
  return (
    <Input className={`formInput ${className || ''}`} suffix={<Error size={20} />} {...rest} />
  );
};

export default AntFormInput;
