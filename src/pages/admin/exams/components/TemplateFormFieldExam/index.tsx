import CustomEditor from '@/components/CustomEditor';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  StepsForm,
  ProFormText,
  ProFormSelect,
  ProFormDigit,
  ProFormSwitch,
  ProTable,
  ModalForm,
  ProFormRadio,
  ProFormDependency,
  ProFormGroup,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
} from '@ant-design/pro-components';
import { Tag, Popconfirm, Button, Form, message, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import QuestionTable from '../QuestionTable';
import SelectedQuestionTable from '../SelectedQuestionTable';

interface Props {
  formField: any;
  formRef: React.MutableRefObject<ProFormInstance<any> | undefined>;
  onSubmit?: any;
  initialValues?: any;
}

const TemplateFormFieldExam: React.FC<Props> = ({
  formField,
  formRef,
  onSubmit,
  initialValues,
}) => {
  const intl = useIntl();

  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [scheduleList, setScheduleList] = useState<API.Schedule[]>([]);

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

  const handleChangeFieldValue = (value: any, fieldIndex: string) => {
    formRef.current?.setFieldsValue({ [fieldIndex]: value });
  };

  const handleChangeSelectedQuestion = (value: any) => {
    setSelectedQuestionIds([...new Set(selectedQuestionIds.concat(value))]);
  };

  useEffect(() => {
    handleChangeFieldValue(selectedQuestionIds, formField.questionList.name);
  }, [selectedQuestionIds]);

  useEffect(() => {
    handleChangeFieldValue(scheduleList, formField.scheduleList.name);
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

  const disabledDate = (current: any) => {
    return current < new Date();
  };

  return (
    <StepsForm
      onFinish={onSubmit}
      formProps={{
        validateMessages: {
          required: 'This field is required',
        },
      }}
      formRef={formRef}
    >
      <StepsForm.StepForm
        name="examDetails"
        title={intl.formatMessage({
          id: 'pages.createExam.tab.tabName.examDetails',
        })}
        layout="vertical"
        initialValues={initialValues}
        autoComplete="off"
      >
        <ProFormText
          name={formField.name.name}
          label={formField.name.label}
          placeholder={formField.name.placeholder}
          rules={[
            {
              required: formField.name.required,
            },
          ]}
        />
        <ProFormSelect
          name={formField.tags.name}
          label={formField.tags.label}
          fieldProps={{ mode: 'tags' }}
          options={['TOAN', 'HOA', 'LOP12', 'TOAN12', 'THPT'].map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <Form.Item
          name={formField.description.name}
          label={formField.description.label}
          rules={[
            {
              required: formField.description.required,
            },
          ]}
        >
          <CustomEditor
            handleEditorChange={(value: any) =>
              handleChangeFieldValue(value, formField.description.name)
            }
          />
        </Form.Item>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        name="examSettings"
        title={intl.formatMessage({
          id: 'pages.createExam.tab.tabName.examSettings',
        })}
        initialValues={initialValues}
        onFinish={async () => {
          return true;
        }}
        layout="horizontal"
      >
        <Row gutter={256}>
          <Col span={12}>
            <ProFormDigit
              name={[formField.setting.name, formField.plusScorePerQuestion.name]}
              label={formField.plusScorePerQuestion.label}
              min="0"
              max="100"
            />
            <ProFormDigit
              name={[formField.setting.name, formField.minusScorePerQuestion.name]}
              label={formField.minusScorePerQuestion.label}
              min="0"
              max="100"
            />
            <ProFormDigit
              name={[formField.setting.name, formField.timePerQuestion.name]}
              label={formField.timePerQuestion.label}
              min="0"
              max="100"
            />
            <ProFormDigit
              name={[formField.setting.name, formField.shufflingExams.name]}
              label={formField.shufflingExams.label}
              min="0"
              max="100"
            />
            <ProFormDigit
              name={[formField.setting.name, formField.percentageToPass.name]}
              label={formField.percentageToPass.label}
              min="0"
              max="100"
            />
          </Col>
          <Col span={12}>
            <ProFormSwitch
              name={[formField.setting.name, formField.viewPassQuestion.name]}
              label={formField.viewPassQuestion.label}
            />
            <ProFormSwitch
              name={[formField.setting.name, formField.viewNextQuestion.name]}
              label={formField.viewNextQuestion.label}
            />
            <ProFormSwitch
              name={[formField.setting.name, formField.showAllQuestion.name]}
              label={formField.showAllQuestion.label}
            />
            <ProFormSwitch
              name={[formField.setting.name, formField.hideResult.name]}
              label={formField.hideResult.label}
            />
          </Col>
        </Row>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        name="examQuestions"
        title={intl.formatMessage({
          id: 'pages.createExam.tab.tabName.examQuestions',
        })}
      >
        <Form.Item name={formField.questionList.name} label={formField.questionList.label}>
          <QuestionTable
            handleSelectQuestion={(value: any) => handleChangeSelectedQuestion(value)}
          />
          <SelectedQuestionTable
            selectedQuestionIds={selectedQuestionIds}
            setSelectedQuestionIds={setSelectedQuestionIds}
          />
        </Form.Item>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        name="examSchedules"
        title={intl.formatMessage({
          id: 'pages.createExam.tab.tabName.examSchedules',
        })}
      >
        <Form.Item name={formField.scheduleList.name} label={formField.scheduleList.label}>
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
        </Form.Item>
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default TemplateFormFieldExam;
