import { MAP_HEURISTIC_LEVEL } from '@/utils/constant';
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
  showResult?: boolean;
}

const QuestionContent: React.FC<Props> = ({
  currentQuestion,
  onSelectOption,
  questionAnswers,
  currentIndex,
  proCardStyle,
  proCardActions,
  showResult,
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

  const getAnswers = (question: API.Question) => {
    return (currentQuestion?.options || []).filter((option) => option.value);
  }

  return (
    <ProCard
      className="circlebox"
      style={proCardStyle}
      actions={proCardActions}
      title={`Question ${currentIndex + 1}`}
    >
      {currentQuestion && (
        <Row>
          <Col span={24}>
            <p>Level: <b>{MAP_HEURISTIC_LEVEL[currentQuestion.heuristicLevel]}</b></p>
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
          {showResult && !getAnswers(currentQuestion).map(option => option.order).includes(selectedValue as number) && (
            <Col span={24}>
              <b>Correct Answers:</b>
              {getAnswers(currentQuestion).map((option) => (
                <i key={option.order}>
                  <Editor
                    value={option.option}
                    init={{
                      inline: true,
                      readonly: true,
                    }}
                    disabled={true}
                  />
                </i>
              ))}
            </Col>
          )}
        </Row>
      )
      }
    </ProCard >
  );
};

export default QuestionContent;
