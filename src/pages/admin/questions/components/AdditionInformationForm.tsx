import { HeuristicLevel, Topic } from '@/utils/constant';
import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import React from 'react';

interface Props {
  currentQuestion: API.Question;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<API.Question>>;
}

const AdditionInformationForm: React.FC<Props> = ({ currentQuestion, setCurrentQuestion }) => {
  const heuristiclevelOptions: any[] = [];
  const topicOptions: any[] = [];

  HeuristicLevel.forEach((value) => {
    heuristiclevelOptions.push({ label: value, value: value });
  });
  Topic.forEach((value) => {
    topicOptions.push({ label: value, value: value });
  });

  const handleValueChange = (changeValue: any) => {
    if (changeValue.tags) {
      changeValue.tags = changeValue.tags.split(',');
    }
    setCurrentQuestion({ ...currentQuestion, ...changeValue });
  };

  return (
    <ProForm onValuesChange={(changeValues) => handleValueChange(changeValues)} submitter={false}>
      <Row>
        <Col span={8}>
          <ProFormSelect
            options={heuristiclevelOptions}
            width={300}
            name="heuristicLevel"
            label="Heuristic level"
            fieldProps={{
              value: currentQuestion.heuristicLevel,
            }}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            width={300}
            name="topic"
            label="Topic"
            options={topicOptions}
            fieldProps={{
              value: currentQuestion.topic,
            }}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            width={300}
            name="tags"
            label="Tags"
            tooltip="Each tag is separated by ','"
            fieldProps={{
              value: currentQuestion.tags ? currentQuestion.tags.join(',') : '',
            }}
          />
        </Col>
      </Row>
    </ProForm>
  );
};

export default AdditionInformationForm;
