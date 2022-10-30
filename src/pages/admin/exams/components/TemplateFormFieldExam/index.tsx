import type { ProFormInstance } from '@ant-design/pro-components';
import { ProFormTextArea } from '@ant-design/pro-components';
import {
  StepsForm,
  ProFormText,
  ProFormSelect,
  ProFormDigit,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { Form, Row, Col } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import QuestionTable from '../QuestionTable';
import SelectedQuestionTable from '../SelectedQuestionTable';
import TemplateFormFieldSchedule from '../TemplateFormFieldSchedule';

interface Props {
  formField: any;
  formRef: React.MutableRefObject<ProFormInstance<any> | undefined>;
  onSubmit?: any;
  initialValues?: any;
}

const TemplateFormFieldExam: React.FC<Props> = ({
  formField,
  formRef,
  onSubmit,
  initialValues,
}) => {
  const intl = useIntl();

  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

  const handleChangeFieldValue = (value: any, fieldIndex: string) => {
    formRef.current?.setFieldsValue({ [fieldIndex]: value });
  };

  const handleChangeSelectedQuestion = (value: any) => {
    setSelectedQuestionIds([...new Set(selectedQuestionIds.concat(value))]);
  };

  useEffect(() => {
    handleChangeFieldValue(selectedQuestionIds, formField.questionList.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuestionIds]);

  return (
    <StepsForm
      onFinish={onSubmit}
      formProps={{
        validateMessages: {
          required: `${intl.formatMessage({
            id: 'pages.createExam.validate.required.requiredMessage',
          })}`,
        },
      }}
      formRef={formRef}
    >
      <StepsForm.StepForm
        name="examDetails"
        title={intl.formatMessage({
          id: 'pages.createExam.tab.tabName.examDetails',
        })}
        layout="vertical"
        initialValues={initialValues}
        autoComplete="off"
      >
        <Content
          style={{ marginBottom: '24px', width: '1024px', height: '600px', overflow: 'auto' }}
        >
          <ProFormText
            name={formField.name.name}
            label={formField.name.label}
            placeholder={formField.name.placeholder}
            rules={[
              {
                required: formField.name.required,
              },
            ]}
          />
          <ProFormSelect
            name={formField.tags.name}
            label={formField.tags.label}
            fieldProps={{ mode: 'tags' }}
            options={['TOAN', 'HOA', 'LOP12', 'TOAN12', 'THPT'].map((item) => ({
              label: item,
              value: item,
            }))}
          />
          <ProFormTextArea
            name={formField.description.name}
            label={formField.description.label}
            placeholder={formField.description.placeholder}
            rules={[
              {
                required: formField.description.required,
              },
            ]}
          />
        </Content>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        name="examSettings"
        title={intl.formatMessage({
          id: 'pages.createExam.tab.tabName.examSettings',
        })}
        initialValues={initialValues}
        onFinish={async () => {
          return true;
        }}
        layout="horizontal"
        className="exam-setting"
      >
        <Content
          style={{ marginBottom: '24px', width: '1024px', height: '600px', overflow: 'auto' }}
        >
          <Row>
            <Col span={10}>
              <ProFormDigit
                name={[formField.setting.name, formField.plusScorePerQuestion.name]}
                label={formField.plusScorePerQuestion.label}
                min="0"
                max="100"
              />
              <ProFormDigit
                name={[formField.setting.name, formField.minusScorePerQuestion.name]}
                label={formField.minusScorePerQuestion.label}
                min="0"
                max="100"
              />
              <ProFormDigit
                name={[formField.setting.name, formField.timePerQuestion.name]}
                label={formField.timePerQuestion.label}
                min="0"
                max="100"
              />
              <ProFormDigit
                name={[formField.setting.name, formField.shufflingExams.name]}
                label={formField.shufflingExams.label}
                min="0"
                max="100"
              />
              <ProFormDigit
                name={[formField.setting.name, formField.percentageToPass.name]}
                label={formField.percentageToPass.label}
                min="0"
                max="100"
              />
            </Col>
            <Col span={10} offset={4}>
              <ProFormSwitch
                name={[formField.setting.name, formField.viewPassQuestion.name]}
                label={formField.viewPassQuestion.label}
              />
              <ProFormSwitch
                name={[formField.setting.name, formField.viewNextQuestion.name]}
                label={formField.viewNextQuestion.label}
              />
              <ProFormSwitch
                name={[formField.setting.name, formField.showAllQuestion.name]}
                label={formField.showAllQuestion.label}
              />
              <ProFormSwitch
                name={[formField.setting.name, formField.hideResult.name]}
                label={formField.hideResult.label}
              />
            </Col>
          </Row>
        </Content>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        name="examQuestions"
        title={intl.formatMessage({
          id: 'pages.createExam.tab.tabName.examQuestions',
        })}
      >
        <Content
          style={{ marginBottom: '24px', width: '1024px', height: '600px', overflow: 'auto' }}
        >
          <Form.Item name={formField.questionList.name} label={formField.questionList.label}>
            <QuestionTable
              handleSelectQuestion={(value: any) => handleChangeSelectedQuestion(value)}
            />
            <SelectedQuestionTable
              selectedQuestionIds={selectedQuestionIds}
              setSelectedQuestionIds={setSelectedQuestionIds}
            />
          </Form.Item>
        </Content>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        name="examSchedules"
        title={intl.formatMessage({
          id: 'pages.createExam.tab.tabName.examSchedules',
        })}
      >
        <Content
          style={{ marginBottom: '24px', width: '1024px', height: '600px', overflow: 'auto' }}
        >
          <Form.Item name={formField.scheduleList.name} label={formField.scheduleList.label}>
            <TemplateFormFieldSchedule
              initialValues={initialValues}
              handleChangeFieldValue={handleChangeFieldValue}
              scheduleListFieldName={formField.scheduleList.name}
            />
          </Form.Item>
        </Content>
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default TemplateFormFieldExam;
