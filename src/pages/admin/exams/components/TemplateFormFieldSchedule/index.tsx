import { MAP_SCHEDULE_STATUS, SCHEDULE_STATUS } from '@/utils/constant';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'umi';

import ModalAddSchedule from '../ModalAddSchedule';

interface IProps {
  initialValues: any;
  handleChangeFieldValue: any;
  scheduleListFieldName: any;
}

const TemplateFormFieldSchedule: React.FC<IProps> = ({
  initialValues,
  handleChangeFieldValue,
  scheduleListFieldName,
}) => {
  const [scheduleList, setScheduleList] = useState<API.Schedule[]>(
    initialValues[scheduleListFieldName],
  );

  useEffect(() => {
    handleChangeFieldValue(scheduleList, scheduleListFieldName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleList]);

  const handleRemoveSchedule = (code: string) => {
    setScheduleList((current) =>
      current.filter((item) => {
        return item.code !== code;
      }),
    );
  };

  const scheduleTableColumns: ProColumns<API.Schedule>[] = [
    {
      dataIndex: 'index',
      key: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: <FormattedMessage id="pages.schedulesTable.column.code.codeLabel" />,
      dataIndex: 'code',
      key: 'code',
      valueType: 'select',
      render: (_, record) => (
        <Tag color="cyan" key={`${record.code}`}>
          {record.code}
        </Tag>
      ),
    },
    {
      title: <FormattedMessage id="pages.schedulesTable.column.startAt.startAtLabel" />,
      dataIndex: 'startTime',
      key: 'startTime',
      valueType: 'dateTime',
    },
    {
      title: <FormattedMessage id="pages.schedulesTable.column.endsAt.endsAtLabel" />,
      dataIndex: 'endTime',
      key: 'endTime',
      valueType: 'dateTime',
    },
    {
      title: <FormattedMessage id="pages.schedulesTable.column.status.statusLabel" />,
      dataIndex: 'status',
      key: 'status',
      valueType: 'select',
      render: (_, record) =>
        record.status === SCHEDULE_STATUS.NOT_STARTED ? (
          <Tag color="green" key={`${record.code}`}>
            {MAP_SCHEDULE_STATUS[record.status]}
          </Tag>
        ) : record.status === SCHEDULE_STATUS.IN_PROGRESS ? (
          <Tag color="yellow" key={`${record.code}`}>
            {MAP_SCHEDULE_STATUS[record.status]}
          </Tag>
        ) : (
          <Tag color="red" key={`${record.code}`}>
            {MAP_SCHEDULE_STATUS[record.status]}
          </Tag>
        ),
    },
    {
      title: <FormattedMessage id="pages.schedulesTable.column.action.actionLabel" />,
      key: 'action',
      valueType: 'option', //TODO check condition for edit and delete schedule
      render: (text, record) => [
        <div key={record?.code}>
          <Popconfirm
            title={
              <FormattedMessage id="pages.schedulesTable.column.action.confirmDeleteScheduleMessage" />
            }
            onConfirm={() => {
              handleRemoveSchedule(record.code);
            }}
            okText="Yes"
            cancelText="No"
            disabled={record.status != SCHEDULE_STATUS.NOT_STARTED}
          >
            <Button key={record.code} type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button
            key={record.code}
            type="link"
            icon={<EditOutlined />}
            disabled={record.status != SCHEDULE_STATUS.NOT_STARTED}
          />
        </div>,
      ],
    },
  ];

  const handleScheduleSubmit = async (values: any) => {
    let startTime;
    let endTime;

    if (values.scheduleType === 'Fixed') {
      startTime = new Date(values.startAt);
      endTime = new Date(values.startAt);
      endTime = new Date(endTime.setMinutes(endTime.getMinutes() + values.period));
    } else {
      startTime = new Date(values.dateRange[0]);
      endTime = new Date(values.dateRange[1]);
    }

    const newSchedule: API.Schedule = {
      code: `ES${new Date().toISOString().slice(0, 19).replace(/-/g, '').replace(/:/g, '')}`,
      startTime: startTime,
      endTime: endTime,
      time: values.period,
      status: SCHEDULE_STATUS.NOT_STARTED,
      assignedGroup: values.assignedGroup,
    };

    setScheduleList([...scheduleList, newSchedule]);
    return true;
  };

  const getModalAddScheduleTrigger = () => {
    return (
      <Button type="primary">
        <PlusOutlined />
        New schedule
      </Button>
    );
  };

  return (
    <ProTable<API.Schedule>
      className="circlebox"
      dataSource={scheduleList}
      search={false}
      columns={scheduleTableColumns}
      pagination={{
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      }}
      options={{
        setting: false,
        fullScreen: false,
        reload: false,
        density: false,
      }}
      rowKey="id"
      dateFormatter="string"
      toolBarRender={() => [
        <ModalAddSchedule
          key="key"
          handleScheduleSubmit={handleScheduleSubmit}
          trigger={getModalAddScheduleTrigger()}
        />,
      ]}
    />
  );
};

export default TemplateFormFieldSchedule;
