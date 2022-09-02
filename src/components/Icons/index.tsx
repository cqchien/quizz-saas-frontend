import { Tag } from 'antd';
import CloseIcon from '@/components/Icons/CloseIcon';
import styles from './styles.less';

type Props = {
  label?: any;
  value?: any;
  closable?: any;
  onClose?: any;
};

function AntTagRender({ label, closable, onClose }: Props) {
  const onPreventMouseDown = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      closeIcon={<CloseIcon className="align-text-bottom" />}
      className={`${styles.tagRender} flex items-center bg-white-100 my-1`}
    >
      {label}
    </Tag>
  );
}

export default AntTagRender;
