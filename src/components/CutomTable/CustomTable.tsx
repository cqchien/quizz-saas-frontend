import type { CustomCardProps } from '@/components/CustomCard/CustomCard';
import CustomCard from '@/components/CustomCard/CustomCard';
import CustomSpace from '@/components/CustomSpace/CustomSpace';
import ArrowDownIcon from '@/components/Icons/ArrowDown';
import ArrowUpIcon from '@/components/Icons/ArrowUp';
import type { TableProps } from 'antd';
import { Table } from 'antd';
import classNames from 'classnames';
import styles from './style.less';

interface CustomTableProps extends TableProps<any>, Pick<CustomCardProps, 'shadow'> {
}

const CustomTable = (props: CustomTableProps) => {
  const cls = classNames(styles.customTable, props.className);
  const { pagination, dataSource, columns, bordered, shadow, ...rest } = props;

  const columnsWithCustomSorter: any = columns?.map((column) => {
    const getAlign = () => {
      switch (column.align) {
        case 'center':
          return 'center';
        case 'left':
          return 'start';
        case 'right':
          return 'end';
        default:
          return 'start'
      }
    }
    return {
      ...column,
      title: ({ sortColumns }: any) => {
        const width = column.width;
        let arrowIcon;
        const sortedColumn = sortColumns?.find(
          ({ column: sortColumn }: any) => sortColumn.key === column.key && !!column.sorter,
        );
        switch (sortedColumn?.order) {
          case 'ascend':
            arrowIcon = <ArrowUpIcon style={{ position: 'relative', top: 2, fontSize: 16 }} />;
            break;
          case 'descend':
            arrowIcon = <ArrowDownIcon style={{ position: 'relative', top: 2, fontSize: 16 }} />;
            break;
          default:
            arrowIcon = null;
        }

        const cellProps = { style: {} };
        if (width) {
          // @ts-ignore
          cellProps.style = { ...cellProps?.style ?? {}, width };
        }

        return (
          <div {...cellProps}>
            <CustomSpace fullWidth size={4} justify={getAlign()}>
              <>
                {column.title}
                {!!sortedColumn ? arrowIcon : null}
              </>
            </CustomSpace>
          </div>
        );
      },
    };
  });

  return (
    <CustomCard
      noPadding
      // bordered={false}
      shadow={shadow ?? 'default'}
      radius="base"
    >
      <Table
        {...rest}
        bordered={false}
        columns={columnsWithCustomSorter}
        sortDirections={[ 'ascend', 'descend', 'ascend' ]}
        dataSource={dataSource}
        className={cls}
        pagination={pagination}
      />
    </CustomCard>
  );
};

export default CustomTable;
