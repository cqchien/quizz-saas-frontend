import { MinusCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import React from 'react';
import QuestionCard from './QuestionCard';

interface IQuestionListProps {
  selectedQuestions: API.Question[];
  setSelectedQuestions: React.Dispatch<React.SetStateAction<API.Question[]>>;
}

const SelectedQuestionsTable: React.FC<IQuestionListProps> = ({
  selectedQuestions,
  setSelectedQuestions,
}) => {
  const handleUnselectQuestion = (id: string) => {
    setSelectedQuestions((current) =>
      current.filter((item) => {
        return item.id !== id;
      }),
    );
  };

  return (
    <>
      {selectedQuestions.map((item) => {
        return (
          <Card key={item.id}>
            <Row>
              <Col span={22}>
                <QuestionCard questionId={item.id} />
              </Col>
              <Col span={2}>
                <Row justify="end">
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => handleUnselectQuestion(item.id)}
                  />
                </Row>
              </Col>
            </Row>
          </Card>
        );
      })}
    </>
  );
};

export default SelectedQuestionsTable;
