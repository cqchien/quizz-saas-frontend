import { ProCard } from '@ant-design/pro-components';
import { Editor } from '@tinymce/tinymce-react';
import { Row, Radio, Space, Col } from 'antd';
import React, { useEffect, useState } from 'react';

interface Props {
  currentQuestion: API.Question;
  onSelectOption?: any;
  questionAnswers: API.QuestionAnswer[];
  currentIndex: number;
  proCardStyle?: any;
  proCardActions?: any;
}

const QuestionContent: React.FC<Props> = ({
  currentQuestion,
  onSelectOption,
  questionAnswers,
  currentIndex,
  proCardStyle,
  proCardActions,
}) => {
  const [selectedValue, setSelectedValue] = useState<number | undefined>();

  useEffect(() => {
    if (questionAnswers) {
      const questionAnswer = questionAnswers.filter((x) => x.questionId == currentQuestion?.id)[0];
      if (questionAnswer) {
        setSelectedValue(questionAnswer.answerOrder);
      } else {
        setSelectedValue(undefined);
      }
    }
  }, [currentQuestion, questionAnswers]);

  return (
    <ProCard
      className="circlebox"
      style={proCardStyle}
      actions={proCardActions}
      title={`Question ${currentIndex + 1}`}
    >
      {currentQuestion && (
        <Row gutter={[0, 8]}>
          <Col span={24}>
            <Editor
              value={currentQuestion.question}
              init={{
                inline: true,
                readonly: true,
              }}
              disabled={true}
            />
          </Col>
          <Col span={24}>
            <Radio.Group key={currentQuestion.id} onChange={onSelectOption} value={selectedValue}>
              <Space direction="vertical">
                {currentQuestion.options?.map((x) => (
                  <Radio key={`${currentQuestion.id}_${x.order}`} value={x.order}>
                    <Editor
                      value={x.option}
                      init={{
                        inline: true,
                        readonly: true,
                      }}
                      disabled={true}
                    />
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Col>
        </Row>
      )}
    </ProCard>
  );
};

export default QuestionContent;
