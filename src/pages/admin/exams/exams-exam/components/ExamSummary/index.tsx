import { MY_COLOR } from '@/utils/constant';
import { Typography, Card, Row, Col, Button, Divider, Space } from 'antd';
import moment from 'moment';
import React from 'react';
import { FormattedMessage } from 'umi';
import QuestionStates from './components/QuestionStates';

const { Text, Title } = Typography;

interface Props {
  questionList: API.Question[];
  setCurrentIndex: any;
  questionAnswers: API.QuestionAnswer[];
  onSubmitExam?: any;
  isOverview?: boolean;
  userExamResult?: API.UserExam;
}

const ExamSummary: React.FC<Props> = ({
  questionList,
  setCurrentIndex,
  questionAnswers,
  onSubmitExam,
  isOverview,
  userExamResult,
}) => {
  const takeExamQuestionStates = [
    {
      background: MY_COLOR.ANSWERED,
      formattedMessageId: 'component.doExam.examSummary.hint.answered',
    },
    {
      background: MY_COLOR.NOT_ANSWERED,
      formattedMessageId: 'component.doExam.examSummary.hint.notAnswered',
    },
  ];

  const overviewExamQuestionStates = [
    {
      background: MY_COLOR.CORRECT_ANSWER,
      formattedMessageId: 'component.overviewExam.examSummary.hint.correctAnswer',
      quantity: questionAnswers.filter((x) => x.answerValue === true).length,
    },
    {
      background: MY_COLOR.WRONG_ANSWER,
      formattedMessageId: 'component.overviewExam.examSummary.hint.wrongAnswer',
      quantity: questionAnswers.filter((x) => x.answerValue !== true).length,
    },
  ];
  return (
    <Card className="circlebox">
      <Row className="question-state" gutter={[32, 16]}>
        {isOverview && (
          <Col span={24}>
            <Space align="center" direction="vertical" style={{ display: 'flex' }}>
              <Title>
                Result :{' '}
                {Math.round((questionAnswers.filter((x) => x.answerValue === true).length /
                  questionAnswers.length) *
                  100)}
                %
              </Title>
            </Space>
          </Col>
        )}
        <Col span={24}>
          <Row justify={'space-between'}>
            <QuestionStates
              data={isOverview ? overviewExamQuestionStates : takeExamQuestionStates}
            />
          </Row>
        </Col>
        <Divider style={{ margin: 0 }} />
        <Col span={24}>
          <Text strong>
            <FormattedMessage id="component.doExam.examSummary.hint.viewQuestion" />
          </Text>
        </Col>
        <Col className="gutter-row" span={24}>
          <Row gutter={[16, 16]}>
            {questionList?.map((x, index) => {
              const did = questionAnswers.filter((qa) => qa.questionId == x.id)[0];
              return (
                <Col key={x.id} span={3}>
                  <Button
                    shape="round"
                    onClick={() => setCurrentIndex(index)}
                    style={{
                      height: 'auto',
                      backgroundColor: did
                        ? isOverview
                          ? did.answerValue
                            ? MY_COLOR.CORRECT_ANSWER
                            : MY_COLOR.WRONG_ANSWER
                          : MY_COLOR.ANSWERED
                        : MY_COLOR.NOT_ANSWERED,
                    }}
                  >
                    <Text
                      strong
                      style={
                        did && {
                          color: MY_COLOR.WHITE,
                        }
                      }
                    >
                      {index + 1}
                    </Text>
                  </Button>
                </Col>
              );
            })}
          </Row>
        </Col>
        <Divider style={{ margin: 0 }} />
        {isOverview ? (
          <Col span={24}>
            <Space direction="vertical">
              <Text strong>
                <FormattedMessage id="component.doExam.examSummary.hint.examInfomation" />
              </Text>
              <Text>- Candidate: {userExamResult?.user.name}</Text>
              <Text>- Candidate contact: {userExamResult?.user.email}</Text>
              <Text>
                - Completion time:
                {` ${moment(userExamResult?.updatedAt).locale('es').format('DD/MM/YYYY, HH:mm')}`}
              </Text>
            </Space>
          </Col>
        ) : (
          <Button
            type="primary"
            block
            style={{ height: '50px', backgroundColor: '#003a8c' }}
            onClick={onSubmitExam}
          >
            <Title level={2} style={{ color: '#ffffff' }}>
              <FormattedMessage id="component.doExam.action.finish.title" />
            </Title>
          </Button>
        )}
      </Row>
    </Card>
  );
};

export default ExamSummary;
