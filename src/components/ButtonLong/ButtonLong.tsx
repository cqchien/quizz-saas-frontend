import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import classNames from 'classnames';
import styles from './style.less';

function ButtonLong(props: ButtonProps) {
  const { children, onClick, className, type, ...rest } = props;

  return (
    <Button
      {...rest}
      className={classNames(styles.btnLong, className)}
      type={type ?? 'primary'}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default ButtonLong;
