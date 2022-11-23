import { Typography, Card, Row, Col, Button } from 'antd';
import React from 'react';
import { FormattedMessage } from 'umi';

const QuestionStateStyle: React.CSSProperties = {
  width: '24px',
  height: '24px',
  marginRight: '8px',
  display: 'inline-block',
  borderColor: '#343a40',
  border: '1px solid #dee2e6',
};

const { Text, Title } = Typography;

interface Props {
  questionList: API.Question[];
  setCurrentIndex: any;
  questionAnswers: API.QuestionAnswer[];
  onSubmitExam: any;
}

const ExamSummary: React.FC<Props> = ({
  questionList,
  setCurrentIndex,
  questionAnswers,
  onSubmitExam,
}) => {
  return (
    <Card>
      <Row className="question-state" gutter={[32, 16]}>
        <Col className="gutter-row" span={12}>
          <div
            style={{
              ...QuestionStateStyle,
              background: '#063970',
            }}
          />
          <Text strong>
            <FormattedMessage id="component.doExam.examSummary.hint.answered" />
          </Text>
        </Col>
        <Col className="gutter-row" span={12}>
          <div
            style={{
              ...QuestionStateStyle,
              background: '#eeeee4',
            }}
          />
          <Text strong>
            <FormattedMessage id="component.doExam.examSummary.hint.notAnswered" />
          </Text>
        </Col>
        <Col span={24}>
          <Text type="secondary">
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
                    size="large"
                    onClick={() => setCurrentIndex(index)}
                    style={{ backgroundColor: did ? '#063970' : '#eeeee4' }}
                  >
                    <Text
                      strong
                      style={
                        did && {
                          color: '#ffffff',
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
      </Row>
    </Card>
  );
};

export default ExamSummary;
