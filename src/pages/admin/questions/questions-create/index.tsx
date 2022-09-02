import {
  PageContainer,
  ProCard,
  ProFormRadio,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Card, Modal, notification, Popconfirm, Space, Tabs, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { InitialQuestion, QuestionTypeAlias } from '@/utils/constant';
import { FormattedMessage, useIntl } from 'umi';
import MultipleChoiceQuestionForm from '../form-multiple-choice-question';

const { TabPane } = Tabs;

const QuestionCreationPage: React.FC = () => {
  const intl = useIntl();
  const [selectedType, setSelectedType] = useState(QuestionTypeAlias.MultipleChoiceQuestion);

  return (
    <PageContainer>
      <Card>
        <ProCard>
            <>
              <Tabs>
                <TabPane
                  tab={
                    <FormattedMessage id="pages.createQuestion.tab.tabName.questionInformation" />
                  }
                  key="1"
                >
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
                  {selectedType === QuestionTypeAlias.MultipleChoiceQuestion && (
                    <MultipleChoiceQuestionForm />
                  )}
                </TabPane>
                {/* <TabPane
                  tab={
                    <FormattedMessage id="pages.createQuestion.tab.tabName.additionInformation" />
                  }
                  key="2"
                >
                  <AdditionInformationForm
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                  />
                </TabPane> */}
              </Tabs>
            </>
        </ProCard>
      </Card>
    </PageContainer>
  );
};

export default QuestionCreationPage;
