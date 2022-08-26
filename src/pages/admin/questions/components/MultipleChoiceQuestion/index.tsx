import { DownOutlined } from '@ant-design/icons';
import { ColumnsState, ProCard, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Card, Checkbox, ConfigProvider, Empty, Popconfirm, Space } from 'antd';
import { useState } from 'react';
import { FormattedMessage } from 'umi';
import MultipleChoiceOptionForm from './MultipleChoiceOption';

interface Props {
  currentOptions: API.Option[];
  setCurrentOptions: React.Dispatch<React.SetStateAction<API.Option[]>>;
}

const MultipleChoiceQuestionForm: React.FC<Props> = ({ currentOptions, setCurrentOptions }) => {
  const [newOptionFormDisplay, setNewOptionFormDisplay] = useState(false);

  const [currentOption, setCurrentOption] = useState<API.Option>({
    value: false,
    option: '',
    order: 0,
  });

  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    name: {
      show: false,
      order: 2,
    },
  });

  const handleRemoveOption = (optionOrder: number) => {
    const newState = currentOptions
      .filter((option) => option.order !== optionOrder)
      .map((obj, index) => {
        return { ...obj, order: index };
      });
    setCurrentOptions(newState);
  };

  const optionTableColumns: ProColumns<API.Option>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: <FormattedMessage id="pages.optionsTable.column.order.orderLabel" />,
      dataIndex: 'order',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueType: 'select',
    },
    {
      title: <FormattedMessage id="pages.optionsTable.column.option.optionLabel" />,
      dataIndex: 'option',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueType: 'select',
      render: (text, record) => [
        <p key={record.order} dangerouslySetInnerHTML={{ __html: record.option }} />,
      ],
    },
    {
      title: <FormattedMessage id="pages.optionsTable.column.value.valueLabel" />,
      dataIndex: 'value',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueType: 'checkbox',
      render: (text, record) => [<Checkbox key={record.order} checked={record.value} />],
    },
    {
      title: <FormattedMessage id="pages.optionsTable.column.action.actionLabel" />,
      key: 'action',
      valueType: 'option',
      render: (text, record) => [
        <Button
          key={record.order}
          icon="Edit"
          type="link"
          onClick={async () => {
            setNewOptionFormDisplay(true);

            setTimeout(() => {
              setCurrentOption(record);
            }, 500);
          }}
        />,
        <Popconfirm
          key={record.order}
          title={
            <FormattedMessage id="pages.optionsTable.column.action.confirmDeleteOptionMessage" />
          }
          onConfirm={() => {
            handleRemoveOption(record.order);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button icon="Delete" type="link" danger />
        </Popconfirm>,
      ],
    },
  ];

  return (
    <Card style={{ marginTop: 24 }}>
      <ConfigProvider
        renderEmpty={() => (
          <Empty description={<FormattedMessage id="pages.optionsTable.emptyContent" />} />
        )}
      >
        <ProTable<API.Option, { keyWord?: string }>
          // locale={{ emptyText: 'Have no options' }}
          dataSource={currentOptions}
          columns={optionTableColumns}
          options={{
            search: false,
            setting: false,
            fullScreen: false,
            reload: false,
            density: false,
          }}
          rowKey="key"
          columnsState={{
            value: columnsStateMap,
            onChange: setColumnsStateMap,
          }}
          search={false}
          dateFormatter="string"
        />
      </ConfigProvider>
      <ProCard>
        {newOptionFormDisplay === false ? (
          <Space align="center" style={{ float: 'right' }}>
            <Button
              type="primary"
              icon={<DownOutlined />}
              onClick={() => setNewOptionFormDisplay(true)}
            >
              Create new option
            </Button>
          </Space>
        ) : (
          <MultipleChoiceOptionForm
            currentOptions={currentOptions}
            setCurrentOptions={setCurrentOptions}
            currentOption={currentOption}
            setCurrentOption={setCurrentOption}
          />
        )}
      </ProCard>
    </Card>
  );
};

export default MultipleChoiceQuestionForm;
