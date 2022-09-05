import { MAP_QUESTION_TYPE, QUESTION_TYPE } from '@/utils/constant';
import { PageContainer, ProCard, ProFormRadio } from '@ant-design/pro-components';
import { useState } from 'react';
import MultipleChoiceQuestionForm from '../form-multiple-choice-question';

const QuestionCreationPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState(QUESTION_TYPE.MULTIPLE_CHOICE_QUESTION);
  const mapQuestionTypeOptions = Object.keys(MAP_QUESTION_TYPE).map((type: string) => ({
    value: type,
    label: MAP_QUESTION_TYPE[type],
  }));
  return (
    <PageContainer>
      <ProCard>
        <>
          <ProFormRadio.Group
            style={{
              margin: 16,
            }}
            radioType="button"
            fieldProps={{
              value: selectedType,
              onChange: (e) => setSelectedType(e.target.value),
            }}
            options={mapQuestionTypeOptions}
          />
          {selectedType === QUESTION_TYPE.MULTIPLE_CHOICE_QUESTION && (
            <MultipleChoiceQuestionForm />
          )}
        </>
      </ProCard>
    </PageContainer>
  );
};

export default QuestionCreationPage;
