import type { FormInstance } from "antd";
import { Checkbox } from "antd";
import { Button, Col, Divider, Form, Row, Space } from "antd";
import { calculateSize } from '@/utils/function';

import type { FC } from "react";
import CustomEditor from "@/components/CustomEditor";
import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import type { CheckboxChangeEvent } from "antd/lib/checkbox";
import { FormattedMessage } from "umi";
import { ProFormSelect } from "@ant-design/pro-components";
import { HEURISTIC_LEVEL, TOPIC } from "@/utils/constant";
import AntTagInput from "@/components/AntTagInput";

interface Props {
  formField: any;
  formRef: FormInstance;
  onSubmit?: any;
  initialValues?: any;
  onCancel?: any;
};

const TemplateFormFieldMultipleChoiceQuestion: FC<Props> = ({
  formField,
  formRef,
  onSubmit,
  initialValues,
  onCancel,
}) => {

  const mapHeuristicLevel = HEURISTIC_LEVEL.map((level: string) => ({
    label: level,
    value: level.toLocaleLowerCase(),
  }))

  const mapTopic = TOPIC.map((topic: string) => ({
    label: topic,
    value: topic.toLocaleLowerCase(),
  }))

  const handlechangeQuestionContent = (value: any) => {
    formRef.setFieldValue(formField.question.name, value);
  }

  const handlechangeOptionContent = (value: any, fieldIndex: number) => {
    const fields = formRef.getFieldsValue();
    const fieldNameOptions = formField.options.name;
    const options = fields[fieldNameOptions];
    options[fieldIndex] = { ...options[fieldIndex], [formField.option.name]: value, [formField.order.name]: fieldIndex + 1 };
    formRef.setFieldsValue({ [fieldNameOptions]: options })
  }

  const handlechangeCorrectOption = (event: CheckboxChangeEvent, fieldIndex: number) => {
    const fields = formRef.getFieldsValue();
    const fieldNameOptions = formField.options.name;
    const options = fields[fieldNameOptions];
    options[fieldIndex] = { ...options[fieldIndex], [formField.value.name]: event.target.checked };
    formRef.setFieldsValue({ [fieldNameOptions]: options })
  }

  const handleInputTags = (value: string[]) => {
    formRef.setFieldValue('tags', value);
  }

  return (
    <Form
      layout="horizontal"
      form={formRef}
      onFinish={onSubmit}
      initialValues={initialValues}
      autoComplete="off"
      key={initialValues?.id}
    >
      <Row gutter={[32, 24]}>
        <Col span={16}>
          <Form.Item
            label={formField.question.label}
            name={formField.question.name}
            rules={[
              { required: formField.question.required, message: formField.question.errMsg }
            ]}
          >
            <CustomEditor
              handleEditorChange={handlechangeQuestionContent}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="heuristicLevel"
            label={
              <FormattedMessage id="pages.questionsTable.column.heuristicLevel.heuristicLevelLabel" />
            }
            rules={[
              { required: true, message: 'Input the heuristic level for the question' }
            ]}
            options={mapHeuristicLevel}
          />
          <ProFormSelect
            name="topic"
            label={<FormattedMessage id="pages.questionsTable.column.topic.topicLabel" />}
            rules={[
              { required: true, message: 'Input the topic of the question' }
            ]}
            options={mapTopic}
          />
          <Form.Item
            name="tags"
            label="Tags"
            rules={[
              { required: true, message: 'Input the tags for the question' }
            ]}
            initialValue={[]}
          >
            <AntTagInput handleInputTags={handleInputTags} />
          </Form.Item>
        </Col>
      </Row>

      <Divider className="my-5 bg-gray-200" plain={true} >
        Options
      </Divider>

      <Row gutter={[32, 24]}>
        <Col span={24}>
          <Form.List name={formField.options.name} initialValue={[]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Space key={field.key} align="baseline" size="large">
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, curValues) =>
                        prevValues.question !== curValues.question || prevValues.options !== curValues.options
                      }
                    >
                      {() => (
                        <Form.Item
                          {...field}
                          label={`${formField.option.label} ${index + 1}`}
                          name={[field.name, formField.option.name]}
                          rules={[
                            { required: formField.option.required, message: formField.option.errMsg }
                          ]}
                        >
                          <CustomEditor
                            handleEditorChange={(value: any) => handlechangeOptionContent(value, field.name)}
                          />
                        </Form.Item>
                      )}
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, formField.value.name]}
                      valuePropName="checked"
                    >
                      <Checkbox
                        onChange={(event: CheckboxChangeEvent) => handlechangeCorrectOption(event, field.name)}
                      >{formField.value.label}</Checkbox>
                    </Form.Item>

                    <MinusCircleFilled onClick={() => remove(field.name)} />
                  </Space>
                ))}

                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusCircleFilled />} >
                    <FormattedMessage id="component.form.createQuestion.addQuestion" />
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Col>
      </Row>

      <Space size={calculateSize(3)} className="w-100 justify-end">
        <Button size="middle" block onClick={onCancel}>
          <FormattedMessage id="component.form.createQuestion.cancel" />
        </Button>
        <Button htmlType="submit" block type="primary" size="middle">
          {initialValues?.id ?
            <FormattedMessage id="component.form.createQuestion.update" /> :
            <FormattedMessage id="component.form.createQuestion.create" />}
        </Button>
      </Space>
    </Form >
  )
}

export default TemplateFormFieldMultipleChoiceQuestion;
