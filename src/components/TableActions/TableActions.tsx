import TrashIcon from '@/components/Icons/Trash';
import { Button, Space } from 'antd';
import type { FC, ReactNode } from 'react';
import Edit from '../Icons/Edit';
import './style.less';

interface TableActionProps {
  hideEditButton?: boolean;
  hideDeleteButton?: boolean;
  deleteText?: string;
  onDelete?: (data: any) => void;
  onEdit?: (data: any) => void;
  editIcon?: ReactNode;
}

const TableActions: FC<TableActionProps> = (
  {
    hideEditButton,
    hideDeleteButton,
    onDelete,
    onEdit,
    deleteText,
    editIcon
  }) => {
  return (
    <Space size={8} className="table-actions" align="end">
      {!hideEditButton && (
        <Button size="small" type="text" icon={editIcon ?? <Edit />} onClick={onEdit} />
      )}
      {!hideDeleteButton && (
        <Button size="small" type="text" icon={deleteText ? deleteText : <TrashIcon />} onClick={onDelete} />
      )}
    </Space>
  );
};

TableActions.defaultProps = {
  onDelete: undefined,
  onEdit: undefined,
  hideEditButton: false,
  hideDeleteButton: false,
};
export default TableActions;
