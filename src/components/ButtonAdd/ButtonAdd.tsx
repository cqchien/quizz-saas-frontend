import { PlusOutlined } from '@ant-design/icons';
import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import classNames from 'classnames';

function ButtonAdd(props: ButtonProps) {
  const { children, onClick, className, ...rest } = props;

  return (
    <Button
      {...rest}
      type={rest.type ?? 'primary'}
      size={rest.size ?? 'middle'}
      className={classNames(className)}
      icon={<PlusOutlined style={{ pointerEvents: 'none' }} />}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default ButtonAdd;
