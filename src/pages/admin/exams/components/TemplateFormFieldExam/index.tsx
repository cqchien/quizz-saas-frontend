import ButtonLong from '@/components/ButtonLong/ButtonLong';
import CustomSpace from '@/components/CustomSpace/CustomSpace';
import CustomTable from '@/components/CutomTable/CustomTable';
import { useSetForm } from '@/context/FormContext';
import { HEURISTIC_LEVEL, MAP_HEURISTIC_LEVEL } from '@/utils/constant';
import { MinusCircleOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProFormSelect } from '@ant-design/pro-components';
import { ProFormTextArea } from '@ant-design/pro-components';
import { StepsForm, ProFormText, ProFormDigit, ProFormSwitch } from '@ant-design/pro-components';
import { Editor } from '@tinymce/tinymce-react';
import { Form, Row, Col, Button, Modal, Tag, Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, Link, useIntl } from 'umi';
import QuestionTable from '../QuestionTable';
import TemplateFormFieldSchedule from '../TemplateFormFieldSchedule';

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

  const { Text } = Typography;


  const intl = useIntl();
  const formQuestionsRef = useRef<ProFormInstance>();
  useSetForm(formQuestionsRef);

  const [selectedQuestions, setSelectedQuestions] = useState<API.Question[]>([]);

  useEffect(() => {
    setSelectedQuestions(initialValues.questions);
    formQuestionsRef.current?.setFieldsValue({
      questions: initialValues.questions,
    });
  }, [initialValues]);

  const handleChangeFieldValue = (value: any, fieldIndex: string) => {
    formRef.current?.setFieldsValue({ [fieldIndex]: value });
  };

  const handleChangeSelectedQuestions = (value: API.Question) => {
    setSelectedQuestions([...new Set(selectedQuestions.concat(value))]);
    formRef.current?.setFieldValue(formField.questionList.name, [...new Set(selectedQuestions.concat(value))]);
  };

  useEffect(() => {
    handleChangeFieldValue(selectedQuestions, formField.questionList.name);
  }, [selectedQuestions]);

  const getSubmmiter = (props: any) => {
    if (props.step === 0) {
      return (
        <>
          {initialValues &&
            <Link to={`/exams/list`} key={`link_exams`}>
              <ButtonLong
                type="link"
                key="back"
              >
                Cancel
              </ButtonLong >
            </Link>
          }

          <ButtonLong
            type="primary"
            key="GoToKey"
            onClick={() => props.onSubmit?.()}
          >
            Next
          </ButtonLong >
        </>
      );
    }

    if (props.step === 1 || props.step === 2) {
      return [
        <>
          {initialValues &&
            <Link to={`/exams/list`} key={`link_exams`}>
              <ButtonLong
                type="link"
                key="back"
              >
                Cancel
              </ButtonLong >
            </Link>
          }
          <ButtonLong
            type="primary"
            key="previous"
            onClick={() => props.onPre?.()}
          >
            Previous
          </ButtonLong >

          <ButtonLong
            type="primary"
            key="GoToKey"
            onClick={() => props.onSubmit?.()}
          >
            Next
          </ButtonLong >
        </>,
      ];
    }

    return [
      <>
        {initialValues &&
          <Link to={`/exams/list`} key={`link_exams`}>
            <ButtonLong
              type="link"
              key="back"
            >
              Cancel
            </ButtonLong >
          </Link>
        }
        <ButtonLong
          type="primary"
          key="previous"
          onClick={() => props.onPre?.()}
        >
          Previous
        </ButtonLong >

        <ButtonLong
          type="primary"
          key="GoToKey"
          onClick={() => props.onSubmit?.()}
        >
          Finish
        </ButtonLong >
      </>,
    ];
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const questionTableColumns = [
    {
      title: <FormattedMessage id="pages.questionsTable.column.question.questionLabel" />,
      dataIndex: 'question',
      key: 'question',
      width: 500,
      render: (_, record) => (
        <Editor
          value={record.question}
          init={{
            inline: true,
            readonly: true,
          }}
          disabled={true}
        />
      ),
    },
    {
      title: "Tags",
      dataIndex: 'tags',
      key: 'tags',
      render: (_, record) => (
        <CustomSpace key={`tags_space_${record.id}`}>
          {(record.tags || []).map((tag) => (
            <Tag color="purple" key={`${tag}_${record.id}`}>
              {tag}
            </Tag>
          ))}
        </CustomSpace>
      ),
    },
    {
      title: (
        <FormattedMessage id="pages.questionsTable.column.heuristicLevel.heuristicLevelLabel" />
      ),
      dataIndex: 'heuristicLevel',
      key: 'heuristicLevel',
      render: (_, record) => MAP_HEURISTIC_LEVEL[record.heuristicLevel],
    },

    {
      title: "Level",
      dataIndex: 'level',
      key: 'level',
      render: (_, record) => (
        record.level
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'operation',
      width: 120,
      render: (_: any, record: API.Question) => {
        return (
          <>
            <Button key={`delete_${record.id}`} type="link" icon={<MinusCircleOutlined />} onClick={() => setSelectedQuestions((current) =>
              current.filter((item) => {
                return item.id !== record.id;
              }),
            )} />
          </>
        )
      }
    },
  ];

  return (
    initialValues && (
      <>
        <Modal width={'70%'} style={{ maxHeight: '500px' }} title="Selected Questions" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
          <Row gutter={40}>
            <Col sm={8} lg={12}>
              <Text mark>Total:</Text>
              <p style={{ fontWeight: 'bold' }}>{selectedQuestions.length}</p>
            </Col>
            {Object.keys(HEURISTIC_LEVEL).map((heuristicLevel) => {
              const num = selectedQuestions.filter((question) => question.heuristicLevel === HEURISTIC_LEVEL[heuristicLevel]).length;

              if (num > 0) {
                return (
                  <Col sm={3} lg={12}>
                    <Text mark> {MAP_HEURISTIC_LEVEL[HEURISTIC_LEVEL[heuristicLevel]]}:</Text>
                    <p style={{ fontWeight: 'bold' }}>{num} questions</p>
                  </Col>
                )
              }
              return;
            })}
          </Row>
          <CustomTable
            rowKey="selectedQuestionTable"
            scroll={{ x: 'max-content', y: '510px' }}
            pagination={false}
            dataSource={selectedQuestions}
            columns={questionTableColumns}
          />
        </Modal>

        <StepsForm
          onFinish={onSubmit}
          formProps={{
            validateMessages: {
              required: `${intl.formatMessage({
                id: 'pages.createExam.validate.required.requiredMessage',
              })}`,
            },
          }}
          formRef={formRef}
          submitter={{
            render: (props) => getSubmmiter(props),
          }}
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
            <Content
              style={{ marginBottom: '24px', width: '1024px', height: '600px', overflow: 'auto' }}
            >
              <Row gutter={40}>
                <Col sm={24} lg={12}>
                  <ProFormText
                    name={formField.code.name}
                    label={formField.code.label}
                    placeholder=''
                    rules={[
                      {
                        required: formField.code.required,
                      },
                    ]}
                  />
                </Col>
                <Col sm={24} lg={12}>
                  <ProFormSelect
                    name={formField.type.name}
                    label={formField.type.label}
                    placeholder=''
                    valueEnum={{
                      exam: 'Exam',
                      quiz: 'Quiz',
                    }}
                  />
                </Col>
              </Row>
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
              <ProFormTextArea
                name={formField.description.name}
                label={formField.description.label}
                placeholder={formField.description.placeholder}
              />

            </Content>
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="examQuestions"
            title={intl.formatMessage({
              id: 'pages.createExam.tab.tabName.examQuestions',
            })}
            formRef={formQuestionsRef}
          >
            <Content
              style={{ marginBottom: '24px', width: '1424px', height: '600px', overflow: 'auto' }}
            >
              <Button type="primary" onClick={showModal} style={{ marginBottom: '10px' }}>
                Show selected questions
              </Button>

              <Form.Item
                name={formField.questionList.name}
                label={formField.questionList.label}
                rules={[
                  {
                    required: selectedQuestions.length === 0,
                    message: formField.questionList.errMsg,
                  },
                ]}
              >
                <QuestionTable
                  handleSelectQuestion={(value: any) => handleChangeSelectedQuestions(value)}
                />
              </Form.Item>
            </Content>
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="examSchedules"
            title={intl.formatMessage({
              id: 'pages.createExam.tab.tabName.examSchedules',
            })}
            initialValues={initialValues}
            layout="vertical"
          >
            <Content
              style={{ marginBottom: '24px', width: '1024px', height: '600px', overflow: 'auto' }}
            >
              <Form.Item
                name={formField.scheduleList.name}
                label={formField.scheduleList.label}
                rules={[
                  {
                    required: formField.scheduleList.required,
                    message: formField.scheduleList.errMsg,
                  },
                ]}
              >
                <TemplateFormFieldSchedule
                  initialValues={initialValues}
                  handleChangeFieldValue={handleChangeFieldValue}
                  scheduleListFieldName={formField.scheduleList.name}
                />
              </Form.Item>
            </Content>
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="examSettings"
            title={intl.formatMessage({
              id: 'pages.createExam.tab.tabName.examSettings',
            })}
            layout="vertical"
            initialValues={initialValues}
            autoComplete="off"
          >
            <Content
              style={{ marginBottom: '24px', width: '1024px', height: '600px', overflow: 'auto' }}
            >
              <Row gutter={40}>
                <Col sm={24} lg={12}>
                  <ProFormDigit
                    name={[formField.setting.name, formField.plusScorePerQuestion.name]}
                    label={formField.plusScorePerQuestion.label}
                    min="0"
                  />
                </Col>
                <Col sm={24} lg={12}>
                  <ProFormSwitch
                    width='lg'
                    name={[formField.setting.name, formField.viewPassQuestion.name]}
                    label={formField.viewPassQuestion.label}
                  />
                </Col>
              </Row>
              <Row gutter={40}>
                <Col sm={24} lg={12}>
                  <ProFormDigit
                    name={[formField.setting.name, formField.minusScorePerQuestion.name]}
                    label={formField.minusScorePerQuestion.label}
                    min="0"
                    max="100"
                  />
                </Col>
                <Col sm={24} lg={12}>
                  <ProFormSwitch
                    name={[formField.setting.name, formField.viewNextQuestion.name]}
                    label={formField.viewNextQuestion.label}
                  />
                </Col>
              </Row>
              <Row gutter={40}>
                <Col sm={24} lg={12}>
                  <ProFormDigit
                    name={[formField.setting.name, formField.timePerQuestion.name]}
                    label={formField.timePerQuestion.label}
                    min="0"
                    max="100"
                  />
                </Col>
                <Col sm={24} lg={12}>
                  <ProFormSwitch
                    name={[formField.setting.name, formField.showCam.name]}
                    label={formField.showCam.label}
                  />
                </Col>
              </Row>
              <Row gutter={40}>
                <Col sm={24} lg={12}>
                  <ProFormDigit
                    name={[formField.setting.name, formField.percentageToPass.name]}
                    label={formField.percentageToPass.label}
                    min="0"
                    max="100"
                  />
                </Col>
                <Col sm={24} lg={12}>
                  <ProFormSwitch
                    name={[formField.setting.name, formField.hideResult.name]}
                    label={formField.hideResult.label}
                  />
                </Col>
              </Row>

            </Content>
          </StepsForm.StepForm>
        </StepsForm >
      </>
    )
  );
};

export default TemplateFormFieldExam;
