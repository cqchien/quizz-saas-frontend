import type {
  ColumnsState,
  ProColumns} from '@ant-design/pro-components';
import {
  PageContainer,
  ProCard,
  ProFormRadio,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Card, Modal, notification, Popconfirm, Space, Tabs, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import MultipleChoiceQuestionForm from '../components/MultipleChoiceQuestion';
import { InitialQuestion, QuestionTypeAlias } from '@/utils/constant';
import { FormattedMessage, useIntl } from 'umi';
import { PlusCircleOutlined, SaveOutlined } from '@ant-design/icons';
import AdditionInformationForm from '../components/AdditionInformationForm';

const { TabPane } = Tabs;

const QuestionCreationPage: React.FC = () => {
  const intl = useIntl();
  const [isEditQuestion, setIsEditQuestion] = useState(false);
  const [newQuestionFormDisplay, setNewQuestionFormDisplay] = useState(false);
  const [selectedType, setSelectedType] = useState(QuestionTypeAlias.MultipleChoiceQuestion);
  const [currentQuestion, setCurrentQuestion] = useState<API.Question>(InitialQuestion);
  const [currentQuestions, setCurrentQuestions] = useState<API.Question[]>([]);
  const [currentOptions, setCurrentOptions] = useState<API.Option[]>([]);
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    name: {
      show: false,
      order: 2,
    },
  });

  const handleRemoveQuestion = (questionId: string) => {
    const newState = currentQuestions
      .filter((question) => question.id !== questionId)
      .map((obj, index) => {
        return { ...obj, order: index };
      });
    setCurrentQuestions(newState);
  };

  const IsValidData = () => {
    if (currentQuestion.question.length === 0) {
      notification.error({
        message: (
          <FormattedMessage id="pages.createQuestion.notification.error.questionContentEmpty" />
        ),
        placement: 'bottomRight',
      });
      return false;
    }
    if (currentQuestion.options.length === 0) {
      notification.error({
        message: (
          <FormattedMessage id="pages.createQuestion.notification.error.noOptionsHaveBeenCreated" />
        ),
        placement: 'bottomRight',
      });
      return false;
    }
    if (currentQuestion.options.filter((option) => option.value === true).length === 0) {
      notification.error({
        message: (
          <FormattedMessage id="pages.createQuestion.notification.error.atLeastOneCorrectAnswer" />
        ),
        placement: 'bottomRight',
      });
      return false;
    }
    return true;
  };

  const questionTableColumns: ProColumns<API.Question>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: <FormattedMessage id="pages.questionsTable.column.type.typeLabel" />,
      dataIndex: 'type',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueType: 'select',
    },
    {
      title: (
        <FormattedMessage id="pages.questionsTable.column.heuristicLevel.heuristicLevelLabel" />
      ),
      dataIndex: 'heuristicLevel',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueType: 'select',
    },
    {
      title: <FormattedMessage id="pages.questionsTable.column.topic.topicLabel" />,
      key: 'topic',
      dataIndex: 'topic',
    },
    {
      title: <FormattedMessage id="pages.questionsTable.column.tag.tagLabel" />,
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
      title: <FormattedMessage id="pages.questionsTable.column.question.questionLabel" />,
      dataIndex: 'question',
      key: 'question',
      render: (text, record) => [
        <p key={record.id} dangerouslySetInnerHTML={{ __html: record.question }} />,
      ],
    },
    {
      title: <FormattedMessage id="pages.questionsTable.column.action.actionLabel" />,
      key: 'action',
      valueType: 'option',
      render: (text, record) => [
        <Button
          key={record.id}
          icon="Edit"
          type="link"
          onClick={() => {
            setNewQuestionFormDisplay(true);
            setCurrentQuestion(record);

            if (isEditQuestion) {
              Modal.warning({
                title: <FormattedMessage id="pages.createQuestionForm.popup.warning.title" />,
                content: <FormattedMessage id="pages.createQuestionForm.popup.warning.content" />,
              });
            } else {
              setIsEditQuestion(true);
            }
          }}
        />,
        <Popconfirm
          key={record.id}
          title={
            <FormattedMessage id="pages.questionsTable.column.action.confirmDeleteQuestionMessage" />
          }
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
        if (IsValidData()) {
          const checkExistingQuestion = currentQuestions.some((obj) => {
            return obj.id === currentQuestion.id ? true : false;
          });

          if (checkExistingQuestion) {
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
          if (checkExistingQuestion) {
            setIsEditQuestion(false);
          }
        }
      }}
    >
      Save question
    </Button>
  );

  useEffect(() => {
    setCurrentQuestion({ ...currentQuestion, options: currentOptions });
  }, [currentOptions]);

  useEffect(() => {
    setCurrentQuestion({ ...InitialQuestion, id: currentQuestions.length.toString() });
    setCurrentOptions([]);
  }, [currentQuestions]);

  useEffect(() => {
    if (isEditQuestion) {
      setCurrentOptions(currentQuestion.options);
    }
  }, [isEditQuestion]);

  const handleSubmitListQuestion = () => {
    // Call API to save questions
    console.log(currentQuestions);
  };

  return (
    <PageContainer>
      <Card>
        <ProTable<API.Question, { keyWord?: string }>
          dataSource={currentQuestions}
          headerTitle={intl.formatMessage({
            id: 'pages.questionsTable.title',
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
                <TabPane
                  tab={
                    <FormattedMessage id="pages.createQuestion.tab.tabName.questionInformation" />
                  }
                  key="1"
                >
                  <FormattedMessage id="pages.createQuestion.tooltip.typeOfQuestion" />
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
                  <FormattedMessage id="pages.createQuestion.tooltip.enterQuestionContent" />
                  <Editor
                    value={currentQuestion.question}
                    onEditorChange={(newValue) =>
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
                <TabPane
                  tab={
                    <FormattedMessage id="pages.createQuestion.tab.tabName.additionInformation" />
                  }
                  key="2"
                >
                  <AdditionInformationForm
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                  />
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
