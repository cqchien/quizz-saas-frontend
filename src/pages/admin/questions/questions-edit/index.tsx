import { DefaultQuestionObject, InitQuestionEditor, QuestionTypeAlias } from '@/utils/constant';
import { PlusCircleOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Editor } from '@tinymce/tinymce-react';
import { Button, Card, notification, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'umi';
import AdditionInformationForm from '../questions-create/components/AdditionInformationForm';
import MultipleChoiceQuestionForm from '../questions-create/components/MultipleChoiceQuestion';

const { TabPane } = Tabs;

const QuestionUpdationPage: React.FC = () => {
  const history = useHistory();
  const [selectedType, setSelectedType] = useState(QuestionTypeAlias.MultipleChoiceQuestion);
  const [currentQuestion, setCurrentQuestion] = useState<API.Question>(DefaultQuestionObject);
  const [currentOptions, setCurrentOptions] = useState<API.Option[]>([]);

  const IsValidData = () => {
    if (currentQuestion.question.length === 0) {
      notification.error({
        message: `Question content is empty`,
        placement: 'bottomRight',
      });
      return false;
    } else if (currentQuestion.options.length === 0) {
      notification.error({
        message: `No options have been created yet`,
        placement: 'bottomRight',
      });
      return false;
    } else return true;
  };

  const operations = (
    <Button
      type="primary"
      icon={<PlusCircleOutlined />}
      onClick={() => {
        if (IsValidData()) {
          // Call API save question
          // Display message base on result
          if (true) {
            notification.success({
              message: `Question was saved successfully`,
              placement: 'bottomRight',
            });
            setTimeout(() => {
              history.push('/questions/list');
            }, 2000);
          } else {
            notification.error({
              message: `Save question was failed`,
              placement: 'bottomRight',
            });
          }
        }
      }}
    >
      Save question
    </Button>
  );

  useEffect(() => {
    // Call API to get question by Id

    // Set question
    setCurrentQuestion(DefaultQuestionObject);

    // Set question.type
    setSelectedType('MCQ');

    // Set question.options
    setCurrentOptions([
      {
        order: 0,
        option: 'Việt Nam',
        value: false,
      },
    ]);
  }, []);

  useEffect(() => {
    setCurrentQuestion({ ...currentQuestion, options: currentOptions });
  }, [currentOptions]);

  return (
    <PageContainer>
      <Card>
        <ProCard>
          <>
            <Tabs tabBarExtraContent={operations}>
              <TabPane tab="Question information" key="1">
                <FormattedMessage id="pages.createQuestion.tooltip.enterQuestionContent" />
                <Editor
                  value={currentQuestion.question}
                  onEditorChange={(newValue) =>
                    setCurrentQuestion({ ...currentQuestion, question: newValue })
                  }
                  init={InitQuestionEditor}
                />
                {selectedType === QuestionTypeAlias.MultipleChoiceQuestion && (
                  <MultipleChoiceQuestionForm
                    currentOptions={currentOptions}
                    setCurrentOptions={setCurrentOptions}
                  />
                )}
              </TabPane>
              <TabPane tab="Addition information" key="2">
                <AdditionInformationForm
                  currentQuestion={currentQuestion}
                  setCurrentQuestion={setCurrentQuestion}
                />
              </TabPane>
            </Tabs>
          </>
        </ProCard>
      </Card>
    </PageContainer>
  );
};

export default QuestionUpdationPage;
