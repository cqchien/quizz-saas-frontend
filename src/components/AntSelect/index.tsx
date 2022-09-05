import { Select } from 'antd';
import type { SelectProps } from 'antd';
import CheckIcon from '../Icons/CheckIcon';
import ChevronIcon from '../Icons/ChevronIcon';

function AntSelect({ children, ...props }: SelectProps) {
  return (
    <Select
      showSearch
      menuItemSelectedIcon={<CheckIcon size={14} />}
      suffixIcon={<ChevronIcon />}
      {...props}
    >
      {children}
    </Select>
  );
}

export default AntSelect;
