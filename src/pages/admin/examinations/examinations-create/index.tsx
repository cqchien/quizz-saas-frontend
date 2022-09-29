import CustomEditor from '@/components/CustomEditor';
import {
  ModalForm,
  PageContainer,
  ProCard,
  ProColumns,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProTable,
  StepsForm,
} from '@ant-design/pro-components';
import { Button, Col, Form, message, Popconfirm, Row, Switch, Tag } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import React, { useRef, useState } from 'react';
import QuestionTable from '../components/QuestionTable';
import SelectedQuestionTable from '../components/SelectedQuestionTable';
import formSchema from '../schemas/examinationSchema';
import { getInitialValue } from '../schemas/getInitialValues';
import { FormattedMessage, Link, useIntl } from 'umi';
import { DeleteOutlined, EditTwoTone, PlusOutlined } from '@ant-design/icons';

interface Props {
  examination?: API.Examination;
}

const scheduleListDefault: API.Schedule[] = [
  {
    id: '1',
    code: 'schedule_001',
    type: 'Fixed',
    startAt: new Date(),
    endsAt: new Date(),
    status: true,
  },
];

const ExaminationCreationPage: React.FC<Props> = ({ examination }) => {
  const { formField } = formSchema;
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [scheduleList, setScheduleList] = useState<API.Schedule[]>(scheduleListDefault);

  const form = useRef<FormInstance>();

  const intl = useIntl();

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
        <Tag color="cyan" key={`${record.code}_${record.id}`}>
          {record.code}
        </Tag>
      ),
    },
    {
      title: <FormattedMessage id="pages.schedulesTable.column.type.typeLabel" />,
      dataIndex: 'type',
      key: 'type',
      valueType: 'select',
    },
    {
      title: <FormattedMessage id="pages.schedulesTable.column.startAt.startAtLabel" />,
      dataIndex: 'startAt',
      key: 'startAt',
      valueType: 'dateTime',
    },
    {
      title: <FormattedMessage id="pages.schedulesTable.column.endsAt.endsAtLabel" />,
      dataIndex: 'endsAt',
      key: 'endsAt',
      valueType: 'dateTime',
    },
    {
      title: <FormattedMessage id="pages.schedulesTable.column.status.statusLabel" />,
      dataIndex: 'status',
      key: 'status',
      valueType: 'select',
      render: (_, record) =>
        record.status === true ? (
          <Tag color="green" key={`${record.code}_${record.id}`}>
            Active
          </Tag>
        ) : (
          <Tag color="red" key={`${record.code}_${record.id}`}>
            Expired
          </Tag>
        ),
    },
    {
      title: <FormattedMessage id="pages.schedulesTable.column.action.actionLabel" />,
      key: 'action',
      valueType: 'option',
      render: (text, record) => [
        <div key={record?.id}>
          <Popconfirm
            title={
              <FormattedMessage id="pages.schedulesTable.column.action.confirmDeleteScheduleMessage" />
            }
            onConfirm={() => {
              //handleRemoveSchedule(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button key={record.id} type="link" icon={<DeleteOutlined />} danger />
          </Popconfirm>
          <Link to={`/questions/${record.id}/edit`} key={record.id}>
            <Button type="link" icon={<EditTwoTone />} />
          </Link>
        </div>,
      ],
    },
  ];

  const handleChangeExamDescription = (value: any, fieldIndex: string) => {
    const fieldNamedescription = formField.description.name;
    form.current?.setFieldsValue({ [fieldNamedescription]: value });
  };

  const handleChangeSelectedQuestion = (value: any, fieldIndex: string) => {
    form.current?.setFieldsValue({ [fieldIndex]: value });

    let x = selectedQuestionIds.concat(value);
    x = [...new Set(x)];
    setSelectedQuestionIds(x);
    console.log(selectedQuestionIds);
  };

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

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

  return (
    <PageContainer>
      <ProCard>
        <StepsForm
          onFinish={async (values) => {
            console.log(values);
            await waitTime(1000);
            message.success('提交成功');
          }}
          formProps={{
            validateMessages: {
              required: '此项为必填项',
            },
          }}
          formRef={form}
        >
          <StepsForm.StepForm
            name="examinationDetails"
            title={intl.formatMessage({
              id: 'pages.createExamination.tab.tabName.examinationDetails',
            })}
            onFinish={async () => {
              //await waitTime(2000);
              return true;
            }}
            layout="vertical"
            initialValues={getInitialValue(examination)}
            autoComplete="off"
          >
            <ProFormText name={formField.title.name} label={formField.title.label} width="sm" />
            <ProFormSelect
              name={formField.tags.name}
              label={formField.tags.label}
              fieldProps={{ mode: 'tags' }}
              width="lg"
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
                  handleChangeExamDescription(value, formField.description.name)
                }
              />
            </Form.Item>
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="examinationSettings"
            title={intl.formatMessage({
              id: 'pages.createExamination.tab.tabName.examinationSettings',
            })}
            onFinish={async () => {
              return true;
            }}
            layout="horizontal"
          >
            <Row gutter={256}>
              <Col span={12}>
                <Form.Item
                  name={formField.durationMode.name}
                  label={formField.durationMode.label}
                  valuePropName="checked"
                >
                  <Row justify="end">
                    <Switch
                      style={{
                        marginBlockEnd: 16,
                      }}
                      checkedChildren="Auto"
                      unCheckedChildren="Manual"
                    />
                  </Row>
                </Form.Item>
                <Form.Item
                  name={formField.marksMode.name}
                  label={formField.marksMode.label}
                  valuePropName="checked"
                >
                  <Row justify="end">
                    <Switch
                      style={{
                        marginBlockEnd: 16,
                      }}
                      checkedChildren="Auto"
                      unCheckedChildren="Manual"
                    />
                  </Row>
                </Form.Item>
                <Form.Item
                  name={formField.negativeMarking.name}
                  label={formField.negativeMarking.label}
                  valuePropName="checked"
                >
                  <Row justify="end">
                    <Switch
                      style={{
                        marginBlockEnd: 16,
                      }}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </Row>
                </Form.Item>
                <ProFormDigit
                  name={formField.overallPassPercentage.name}
                  label={formField.overallPassPercentage.label}
                  width="sm"
                  min="1"
                  max="100"
                  initialValue={50}
                  fieldProps={{ precision: 0 }}
                />
              </Col>
              <Col span={12}>
                <Form.Item
                  name={formField.shuffleQuestions.name}
                  label={formField.shuffleQuestions.label}
                  valuePropName="checked"
                >
                  <Row justify="end">
                    <Switch
                      style={{
                        marginBlockEnd: 16,
                      }}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </Row>
                </Form.Item>
                <Form.Item
                  name={formField.disableSectionNavigation.name}
                  label={formField.disableSectionNavigation.label}
                  valuePropName="checked"
                >
                  <Row justify="end">
                    <Switch
                      style={{
                        marginBlockEnd: 16,
                      }}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </Row>
                </Form.Item>
                <Form.Item
                  name={formField.disableFinishButton.name}
                  label={formField.disableFinishButton.label}
                  valuePropName="checked"
                >
                  <Row justify="end">
                    <Switch
                      style={{
                        marginBlockEnd: 16,
                      }}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </Row>
                </Form.Item>
                <Form.Item
                  name={formField.enableQuestionListView.name}
                  label={formField.enableQuestionListView.label}
                  valuePropName="checked"
                >
                  <Row justify="end">
                    <Switch
                      style={{
                        marginBlockEnd: 16,
                      }}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </Row>
                </Form.Item>
                <Form.Item
                  name={formField.hideSolutions.name}
                  label={formField.hideSolutions.label}
                  valuePropName="checked"
                >
                  <Row justify="end">
                    <Switch
                      style={{
                        marginBlockEnd: 16,
                      }}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </Row>
                </Form.Item>
              </Col>
            </Row>
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="examinationQuestions"
            title={intl.formatMessage({
              id: 'pages.createExamination.tab.tabName.examinationQuestions',
            })}
          >
            <Row>
              <Col span={12}>
                <Form.Item name={formField.questionList.name}>
                  <QuestionTable
                    handleSelectQuestion={(value: any) =>
                      handleChangeSelectedQuestion(value, formField.questionList.name)
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <SelectedQuestionTable
                  selectedQuestionIds={selectedQuestionIds}
                  setSelectedQuestionIds={setSelectedQuestionIds}
                />
              </Col>
            </Row>
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="examinationSchedules"
            title={intl.formatMessage({
              id: 'pages.createExamination.tab.tabName.examinationSchedules',
            })}
          >
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
                  onFinish={async (values) => {
                    let endsAtInput;
                    let startAtInput;

                    if (values.scheduleType === 'Fixed') {
                      startAtInput = new Date(values.startAt);
                      endsAtInput = new Date(
                        values.startAt.setMinutes(values.startAt.getMinutes() + values.period),
                      );
                    } else {
                      startAtInput = new Date(values.dateRange[0]);
                      endsAtInput = new Date(values.dateRange[1]);
                    }

                    const newSchedule: API.Schedule = {
                      id: '2',
                      code: 'new_schedule',
                      type: values.scheduleType,
                      startAt: startAtInput,
                      endsAt: endsAtInput,
                      status: true,
                    };
                    setScheduleList([...scheduleList, newSchedule]);
                    message.success('Success OK');
                    return true;
                  }}
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
                            <ProFormDateTimePicker width="sm" name="startAt" label="Start at" />
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
                          width="lg"
                          name="dateRange"
                          label="Date range"
                        />
                      );
                    }}
                  </ProFormDependency>
                  <ProFormSelect
                    width="lg"
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
                  />
                </ModalForm>,
              ]}
            />
          </StepsForm.StepForm>
        </StepsForm>
      </ProCard>
    </PageContainer>
  );
};

export default ExaminationCreationPage;
