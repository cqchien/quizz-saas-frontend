import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {
  ProTable,
  ModalForm,
  ProFormRadio,
  ProFormDependency,
  ProFormGroup,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormDateTimeRangePicker,
  ProFormSelect,
} from '@ant-design/pro-components';
import { Button, Form, message, Popconfirm, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';

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
  const intl = useIntl();

  const [scheduleList, setScheduleList] = useState<API.Schedule[]>(
    initialValues[scheduleListFieldName],
  );

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
        record.status === true ? (
          <Tag color="green" key={`${record.code}`}>
            Active
          </Tag>
        ) : (
          <Tag color="red" key={`${record.code}`}>
            Expired
          </Tag>
        ),
    },
    {
      title: <FormattedMessage id="pages.schedulesTable.column.action.actionLabel" />,
      key: 'action',
      valueType: 'option',
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
            disabled={record.startTime < new Date()}
          >
            <Button
              key={record.code}
              type="link"
              danger
              icon={<DeleteOutlined />}
              disabled={record.startTime < new Date()}
            />
          </Popconfirm>
          <Button
            key={record.code}
            type="link"
            icon={<EditOutlined />}
            disabled={record.startTime < new Date()}
          />
        </div>,
      ],
    },
  ];

  const [formSchedule] = Form.useForm<{
    period: number;
    code: string;
    scheduleType: string;
    startAt: Date;
    endsAt: Date;
    status: boolean;
    assignedGroup?: string[] | undefined;
    dateRange: string[];
  }>();

  const disabledDate = (current: any) => {
    return current < new Date();
  };

  useEffect(() => {
    handleChangeFieldValue(scheduleList, scheduleListFieldName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleList]);

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
    };

    setScheduleList([...scheduleList, newSchedule]);
    message.success('Success OK');
    return true;
  };

  return (
    <ProTable<API.Schedule>
      dataSource={scheduleList}
      search={false}
      headerTitle={intl.formatMessage({
        id: 'pages.schedulesTable.title',
      })}
      columns={scheduleTableColumns}
      options={{
        setting: false,
        fullScreen: false,
        reload: false,
        density: false,
      }}
      rowKey="id"
      dateFormatter="string"
      toolBarRender={() => [
        <ModalForm<{
          period: number;
          code: string;
          scheduleType: string;
          startAt: Date;
          endsAt: Date;
          status: boolean;
          assignedGroup?: string[] | undefined;
          dateRange: string[];
        }>
          key="key"
          form={formSchedule}
          title="New Schedule"
          trigger={
            <Button type="primary">
              <PlusOutlined />
              New Schedule
            </Button>
          }
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => console.log('run'),
          }}
          submitTimeout={2000}
          onFinish={handleScheduleSubmit}
        >
          <ProFormRadio.Group
            label="Schedule Type"
            name="scheduleType"
            initialValue="Fixed"
            options={['Fixed', 'Flexible']}
          />

          <ProFormDependency name={['scheduleType']}>
            {({ scheduleType }) => {
              if (scheduleType === 'Fixed') {
                return (
                  <ProFormGroup>
                    <ProFormDateTimePicker
                      width="sm"
                      name="startAt"
                      label="Start at"
                      placeholder=""
                      fieldProps={{
                        disabledDate: disabledDate,
                      }}
                    />
                    <ProFormDigit
                      width="sm"
                      name="period"
                      label="Grace Period to Join (Minutes)"
                      initialValue={15}
                    />
                  </ProFormGroup>
                );
              }
              return (
                <ProFormDateTimeRangePicker
                  name="dateRange"
                  label="Date range"
                  placeholder={['Start at', 'End at']}
                />
              );
            }}
          </ProFormDependency>
          <ProFormSelect
            mode="multiple"
            options={[
              {
                value: 'group1',
                label: 'Lop 12C',
              },
              {
                value: 'group2',
                label: 'Lop 11A',
              },
            ]}
            name="assignedGroup"
            label="Schedule to User Groups"
            placeholder=""
          />
        </ModalForm>,
      ]}
    />
  );
};

export default TemplateFormFieldSchedule;
