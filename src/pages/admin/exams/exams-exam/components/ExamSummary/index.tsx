import { ClockCircleOutlined } from '@ant-design/icons';
import { Typography, Card, Row, Col, Space, Button } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import React from 'react';

const QuestionStateStyle: React.CSSProperties = {
  width: '24px',
  height: '24px',
  marginRight: '8px',
  display: 'inline-block',
  borderColor: '#343a40',
  border: '1px solid #dee2e6',
};

const { Text } = Typography;

interface Props {
  questionList: API.Question[];
  setCurrentIndex: any;
  onSubmitExam: any;
}

const ExamSummary: React.FC<Props> = ({ questionList, setCurrentIndex, onSubmitExam }) => {
  return (
    <Card>
      <Row className="question-state" gutter={[32, 16]}>
        <Col span={24}>
          <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
            <Space align="center">
              <ClockCircleOutlined style={{ fontSize: '32px', color: '#08c' }} />
              <Countdown value={Date.now() + 1000 * 60 * 30} onFinish={onSubmitExam} />
            </Space>
          </Space>
        </Col>

        <Col className="gutter-row" span={12}>
          <div
            style={{
              ...QuestionStateStyle,
              background: '#ffffff',
            }}
          />
          <span>Not visit</span>
        </Col>
        <Col className="gutter-row" span={12}>
          <div
            style={{
              ...QuestionStateStyle,
              background: '#0092ff',
            }}
          />
          <span>Tick</span>
        </Col>
        <Col className="gutter-row" span={12}>
          <div
            style={{
              ...QuestionStateStyle,
              background: '#063970',
            }}
          />
          <span>Answered</span>
        </Col>
        <Col className="gutter-row" span={12}>
          <div
            style={{
              ...QuestionStateStyle,
              background: '#eeeee4',
            }}
          />
          <span>Not answered</span>
        </Col>
        <Col span={24}>
          <Text type="secondary">Click on button to view question</Text>
        </Col>
        <Col className="gutter-row" span={24}>
          <Row gutter={[16, 16]}>
            {questionList.map((x, index) => (
              <Col key={x.id} span={3}>
                <Button shape="round" size="large" onClick={() => setCurrentIndex(index)}>
                  {index + 1}
                </Button>
              </Col>
            ))}
          </Row>
        </Col>
        <Button type="primary" block style={{ height: '50px' }} onClick={onSubmitExam}>
          FINISH
        </Button>
      </Row>
    </Card>
  );
};

export default ExamSummary;
