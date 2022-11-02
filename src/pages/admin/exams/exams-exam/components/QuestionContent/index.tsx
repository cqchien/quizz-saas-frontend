import { ProCard } from '@ant-design/pro-components';
import { Editor } from '@tinymce/tinymce-react';
import { Row, Divider, Radio, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const { Text } = Typography;

interface Props {
  currentQuestion: API.Question | undefined;
  onSelectOption: any;
  questionAnswers: API.QuestionAnswer[];
}

const QuestionContent: React.FC<Props> = ({ currentQuestion, onSelectOption, questionAnswers }) => {
  const [selectedValue, setSelectedValue] = useState<number | undefined>();

  useEffect(() => {
    const questionAnswer = questionAnswers.filter((x) => x.questionId == currentQuestion?.id)[0];
    if (questionAnswer) {
      setSelectedValue(questionAnswer.answerOrder);
    } else {
      setSelectedValue(undefined);
    }
  }, [currentQuestion, questionAnswers]);

  return (
    <ProCard style={{ height: '400px', overflow: 'auto' }}>
      {currentQuestion && (
        <Row gutter={[0, 8]}>
          <Editor
            value={currentQuestion.question}
            init={{
              inline: true,
              readonly: true,
            }}
            disabled={true}
          />
          <Divider>
            <Text type="secondary">Answers</Text>
          </Divider>
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
        </Row>
      )}
    </ProCard>
  );
};

export default QuestionContent;
