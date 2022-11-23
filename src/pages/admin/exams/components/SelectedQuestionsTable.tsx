import { MinusCircleOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Editor } from '@tinymce/tinymce-react';
import { Card, Col, Row } from 'antd';
import React from 'react';
import { FormattedMessage } from 'umi';

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
    <ProCard
      title={
        <FormattedMessage id="component.form.createExam.questionsTab.selectedQuestions.title" />
      }
    >
      {selectedQuestions.map((item) => {
        return (
          <Card key={item.id}>
            <Row>
              <Col span={22}>
                <Editor
                  value={item.question}
                  init={{
                    inline: true,
                    readonly: true,
                  }}
                  disabled={true}
                />
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
    </ProCard>
  );
};

export default SelectedQuestionsTable;
