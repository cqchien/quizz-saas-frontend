import {
  ColumnsState,
  PageContainer,
  ProCard,
  ProColumns,
  ProForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Card, Col, Modal, Popconfirm, Row, Space, Tabs, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import MultipleChoiceQuestionForm from './components/MultipleChoiceQuestion';
import { HeuristicLevel, QuestionTypeAlias, Topic } from '@/utils/constant';
import FillInBlankQuestionForm from './components/FillInBlankQuestion';
import MatchTheFollowingForm from './components/MatchTheFollowingQuestion';
import OrderingSequenceForm from './components/OrderingSequenceQuestion';
import { FormattedMessage, useIntl } from 'umi';
import { PlusCircleOutlined, SaveOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const initialQuestion = {
  id: '0',
  question: '',
  type: 'MCQ',
  heuristicLevel: '',
  status: 'PENDING',
  level: 0,
  topic: '',
  options: [],
  tags: [],
  language: 'vi-VN',
  isPrivate: true,
  updatedAt: new Date(),
  createdAt: new Date(),
};

const QuestionCreationPage: React.FC = () => {
  const intl = useIntl();
  const heuristiclevelOptions: any[] = [];
  const topicOptions: any[] = [];
  const [isEditQuestion, setIsEditQuestion] = useState(false);
  const [newQuestionFormDisplay, setNewQuestionFormDisplay] = useState(false);
  const [selectedType, setSelectedType] = useState(QuestionTypeAlias.MultipleChoiceQuestion);
  const [currentQuestion, setCurrentQuestion] = useState<API.Question>(initialQuestion);
  const [currentQuestions, setCurrentQuestions] = useState<API.Question[]>([]);
  const [currentOptions, setCurrentOptions] = useState<API.Option[]>([]);
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    name: {
      show: false,
      order: 2,
    },
  });
  const questionTableColumns: ProColumns<API.Question>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: (
        <FormattedMessage id="pages.questionsTable.column.type.typeLabel" defaultMessage="Type" />
      ),
      dataIndex: 'type',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueType: 'select',
    },
    {
      title: (
        <FormattedMessage
          id="pages.questionsTable.column.heuristicLevel.heuristicLevelLabel"
          defaultMessage="Heuristic Level"
        />
      ),
      dataIndex: 'heuristicLevel',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueType: 'select',
    },
    {
      title: (
        <FormattedMessage
          id="pages.questionsTable.column.topic.topicLabel"
          defaultMessage="Topic"
        />
      ),
      key: 'topic',
      dataIndex: 'topic',
    },
    {
      title: (
        <FormattedMessage id="pages.questionsTable.column.tag.tagLabel" defaultMessage="Tags" />
      ),
      dataIndex: 'tags',
      search: false,
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space>
          {(record.tags || []).map((tag) => (
            <Tag color="cyan" key={tag}>
              {tag}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: (
        <FormattedMessage
          id="pages.questionsTable.column.question.questionLabel"
          defaultMessage="Question"
        />
      ),
      dataIndex: 'question',
      key: 'question',
      render: (text, record) => [<p dangerouslySetInnerHTML={{ __html: record.question }} />],
    },
    {
      title: (
        <FormattedMessage
          id="pages.questionsTable.column.action.actionLabel"
          defaultMessage="Action"
        />
      ),
      key: 'action',
      valueType: 'option',
      render: (text, record) => [
        <Button
          icon="Edit"
          type="link"
          onClick={() => {
            setNewQuestionFormDisplay(true);
            setCurrentQuestion(record);

            if (isEditQuestion) {
              Modal.warning({
                title: 'Data transformation is taking place',
                content: 'We need to save the question data before pressing the edit button',
              });
            } else {
              setIsEditQuestion(true);
            }
          }}
        />,
        <Popconfirm
          title="Are you sure to delete this question?"
          onConfirm={() => {
            handleRemoveQuestion(record.id);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button icon="Delete" type="link" danger />
        </Popconfirm>,
      ],
    },
  ];
  const operations = (
    <Button
      type="primary"
      icon={<PlusCircleOutlined />}
      onClick={() => {
        if (
          currentQuestions.some((obj) => {
            if (obj.id === currentQuestion.id) {
              return true;
            }

            return false;
          })
        ) {
          const newState = currentQuestions.map((obj) => {
            if (obj.id === currentQuestion.id) {
              return { ...currentQuestion };
            }
            return obj;
          });

          setCurrentQuestions(newState);
        } else {
          setCurrentQuestions((tableListDataSource) => [...tableListDataSource, currentQuestion]);
        }

        setNewQuestionFormDisplay(false);
        if (isEditQuestion) {
          setIsEditQuestion(false);
        }
      }}
    >
      Save question
    </Button>
  );

  HeuristicLevel.forEach((value) => {
    heuristiclevelOptions.push({ label: value, value: value });
  });
  Topic.forEach((value) => {
    topicOptions.push({ label: value, value: value });
  });

  useEffect(() => {
    setCurrentQuestion({ ...currentQuestion, options: currentOptions });
  }, [currentOptions]);
  useEffect(() => {
    setCurrentQuestion({ ...initialQuestion, id: currentQuestions.length.toString() });
    setCurrentOptions([]);
  }, [currentQuestions]);

  useEffect(() => {
    if (isEditQuestion) {
      setCurrentOptions(currentQuestion.options);
    }
  }, [isEditQuestion]);

  const handleRemoveQuestion = (questionId: string) => {
    const newState = currentQuestions
      .filter((question) => question.id !== questionId)
      .map((obj, index) => {
        return { ...obj, order: index };
      });
    setCurrentQuestions(newState);
  };
  const handleValueChange = (changeValue: any) => {
    if (changeValue.tags) {
      changeValue.tags = changeValue.tags.split(',');
    }
    setCurrentQuestion({ ...currentQuestion, ...changeValue });
  };

  const handleSubmitListQuestion = () => {
    console.log(currentQuestions);
  };

  return (
    <PageContainer>
      <Card>
        <ProTable<API.Question, { keyWord?: string }>
          dataSource={currentQuestions}
          headerTitle={intl.formatMessage({
            id: 'pages.questionsTable.title',
            defaultMessage: 'Questions List',
          })}
          columns={questionTableColumns}
          options={{
            search: false,
            setting: false,
            fullScreen: false,
            reload: false,
            density: false,
          }}
          toolbar={{
            search: {
              onSearch: (value: string) => {
                alert(value);
              },
            },
          }}
          rowKey="key"
          columnsState={{
            value: columnsStateMap,
            onChange: setColumnsStateMap,
          }}
          search={false}
          dateFormatter="string"
        />

        <ProCard>
          {newQuestionFormDisplay === false ? (
            <Space align="center" style={{ float: 'right' }}>
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={() => {
                  setNewQuestionFormDisplay(true);
                }}
              >
                Create new question
              </Button>
              {currentQuestions.length !== 0 && (
                <Button type="primary" icon={<SaveOutlined />} onClick={handleSubmitListQuestion}>
                  Submit this list question
                </Button>
              )}
            </Space>
          ) : (
            <>
              <Tabs tabBarExtraContent={operations}>
                <TabPane tab="Question information" key="1">
                  Please choose type of question
                  <ProFormRadio.Group
                    style={{
                      margin: 16,
                    }}
                    radioType="button"
                    fieldProps={{
                      value: selectedType,
                      onChange: (e) => setSelectedType(e.target.value),
                    }}
                    options={[
                      {
                        value: QuestionTypeAlias.MultipleChoiceQuestion,
                        label: 'Multiple Choice Question (MCQ)',
                      },
                      {
                        value: QuestionTypeAlias.FillInBlanks,
                        label: 'Fill In Blank Question (FIB)',
                      },
                      {
                        value: QuestionTypeAlias.MatchTheFollowing,
                        label: 'Match The Following Question (MTF)',
                      },
                      {
                        value: QuestionTypeAlias.OrderingSequence,
                        label: 'Ordering Sequence Question (ORD)',
                      },
                    ]}
                  />
                  Please enter question content here (*)
                  <Editor
                    value={currentQuestion.question}
                    onEditorChange={(newValue, editor) =>
                      setCurrentQuestion({ ...currentQuestion, question: newValue })
                    }
                    init={{
                      height: 200,
                      menubar: false,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                      ],
                      toolbar:
                        'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                  />
                  {selectedType === QuestionTypeAlias.MultipleChoiceQuestion && (
                    <MultipleChoiceQuestionForm
                      currentOptions={currentOptions}
                      setCurrentOptions={setCurrentOptions}
                    />
                  )}
                </TabPane>
                <TabPane tab="Addition information" key="2">
                  <ProForm
                    onValuesChange={(changeValues) => handleValueChange(changeValues)}
                    submitter={false}
                  >
                    <Row>
                      <Col span={8}>
                        <ProFormSelect
                          options={heuristiclevelOptions}
                          width={300}
                          name="heuristicLevel"
                          label="Heuristic level"
                          fieldProps={{
                            value: currentQuestion.heuristicLevel,
                          }}
                        />
                      </Col>
                      <Col span={8}>
                        <ProFormSelect
                          width={300}
                          name="topic"
                          label="Topic"
                          options={topicOptions}
                          fieldProps={{
                            value: currentQuestion.topic,
                          }}
                        />
                      </Col>
                      <Col span={8}>
                        <ProFormText
                          width={300}
                          name="tags"
                          label="Tags"
                          tooltip="Each tag is separated by ','"
                          fieldProps={{
                            value: currentQuestion.tags ? currentQuestion.tags.join(',') : '',
                          }}
                        />
                      </Col>
                    </Row>
                  </ProForm>
                </TabPane>
              </Tabs>
            </>
          )}
        </ProCard>
      </Card>
    </PageContainer>
  );
};

export default QuestionCreationPage;
