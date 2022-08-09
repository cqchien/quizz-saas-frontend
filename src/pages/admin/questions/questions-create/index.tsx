import { PageContainer, ProFormRadio } from '@ant-design/pro-components';
import { Card } from 'antd';
import { useState } from 'react';
import MultipleChoiceQuestionForm from './components/MultipleChoiceQuestion';

const QuestionCreationPage: React.FC = () => {
  const [type, setType] = useState(1);

  return (
    <PageContainer>
      <Card>
        <ProFormRadio.Group
          style={{
            margin: 16,
          }}
          radioType="button"
          fieldProps={{
            value: type,
            onChange: (e) => setType(e.target.value),
          }}
          options={[
            {
              value: 1,
              label: 'Multiple Choice Question (MCQ)',
            },
            {
              value: 2,
              label: 'Single Choice Question (SCQ)',
            },
          ]}
        />

        {type === 1 && <MultipleChoiceQuestionForm />}
      </Card>
    </PageContainer>
  );
};

export default QuestionCreationPage;
