import { MinusCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import mapStateToProps from '../../questions/mapStateToProps';
import QuestionCard from './QuestionCard';

interface IQuestionListProps {
  dispatch: any;
  questionList: API.Question[];
  loading: boolean;
  pagingParams: API.PageParams;
  selectedQuestionIds: string[];
  setSelectedQuestionIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectedQuestionTable: React.FC<IQuestionListProps> = ({
  questionList,
  selectedQuestionIds,
  setSelectedQuestionIds,
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState<API.Question[]>([]);

  useEffect(() => {
    setSelectedQuestion(questionList.filter((x) => selectedQuestionIds.includes(x.id)));
  }, [questionList, selectedQuestionIds]);

  const handleUnselectQuestion = (id: string) => {
    setSelectedQuestionIds((current) =>
      current.filter((item) => {
        return item !== id;
      }),
    );
  };

  return (
    <>
      {selectedQuestion.map((item) => {
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

export default connect(mapStateToProps)(SelectedQuestionTable);
