import { DownloadOutlined } from '@ant-design/icons';
import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import classNames from 'classnames';

function ButtonDownload(props: ButtonProps) {
  const { children, onClick, className, ...rest } = props;

  return (
    <Button
      {...rest}
      type={rest.type ?? 'primary'}
      size={rest.size ?? 'large'}
      className={classNames('btn-download', className)}
      icon={<DownloadOutlined style={{ pointerEvents: 'none' }} />}
      onClick={onClick}
    >
      {children && children}
    </Button>
  );
}

export default ButtonDownload;
