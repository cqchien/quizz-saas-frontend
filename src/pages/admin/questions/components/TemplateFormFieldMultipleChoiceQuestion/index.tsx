import type { FormInstance } from 'antd';
import { Checkbox } from 'antd';
import { Button, Col, Divider, Form, Row, Space } from 'antd';
import { calculateSize } from '@/utils/function';
import { useEffect } from 'react';
import CustomEditor from '@/components/CustomEditor';
import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FormattedMessage } from 'umi';
import { ProFormSelect } from '@ant-design/pro-components';
import {
  MAP_HEURISTIC_LEVEL,
  MAP_LANGUAGES,
  MAP_MODE,
  MAP_STATUS,
  MAP_TOPIC,
} from '@/utils/constant';
import AntTagInput from '@/components/AntTagInput';

interface Props {
  formField: any;
  formRef: FormInstance;
  onSubmit?: any;
  initialValues?: any;
  onCancel?: any;
}

const TemplateFormFieldMultipleChoiceQuestion: React.FC<Props> = ({
  formField,
  formRef,
  onSubmit,
  initialValues,
  onCancel,
}) => {
  useEffect(() => {
    if (formRef && initialValues && Object.keys(initialValues).length > 0) {
      // form.setFieldsValue(initialValues)
      formRef.resetFields();
    }
  }, [formRef, initialValues]);

  const mapHeuristicLevelOptions = Object.keys(MAP_HEURISTIC_LEVEL).map((level: string) => ({
    label: MAP_HEURISTIC_LEVEL[level],
    value: level,
  }));

  const mapTopicOptions = Object.keys(MAP_TOPIC).map((topic: string) => ({
    label: MAP_TOPIC[topic],
    value: topic,
  }));

  const mapLanguageOptions = Object.keys(MAP_LANGUAGES).map((language: string) => ({
    label: MAP_LANGUAGES[language],
    value: language,
  }));

  const mapStatusOptions = Object.keys(MAP_STATUS).map((status: string) => ({
    label: MAP_STATUS[status],
    value: status,
  }));

  const mapModeOptions = Object.keys(MAP_MODE).map((mode: string) => ({
    label: MAP_MODE[mode],
    value: mode,
  }));

  const handlechangeQuestionContent = (value: any) => {
    formRef.setFieldValue(formField.question.name, value);
  };

  const handlechangeOptionContent = (value: any, fieldIndex: number) => {
    const fields = formRef.getFieldsValue();
    const fieldNameOptions = formField.options.name;
    const options = fields[fieldNameOptions];
    options[fieldIndex] = {
      ...options[fieldIndex],
      [formField.option.name]: value,
      [formField.order.name]: fieldIndex + 1,
    };
    formRef.setFieldsValue({ [fieldNameOptions]: options });
  };

  const handlechangeCorrectOption = (event: CheckboxChangeEvent, fieldIndex: number) => {
    const fields = formRef.getFieldsValue();
    const fieldNameOptions = formField.options.name;
    const options = fields[fieldNameOptions];
    options[fieldIndex] = { ...options[fieldIndex], [formField.value.name]: event.target.checked };
    formRef.setFieldsValue({ [fieldNameOptions]: options });
  };

  const handleInputTags = (value: string[]) => {
    formRef.setFieldValue(formField.tags.name, value);
  };

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
            rules={[{ required: formField.question.required, message: formField.question.errMsg }]}
          >
            <CustomEditor handleEditorChange={handlechangeQuestionContent} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Row gutter={[24, 8]}>
            <Col span={12}>
              <ProFormSelect
                name={formField.heuristicLevel.name}
                label={formField.heuristicLevel.label}
                options={mapHeuristicLevelOptions}
              />
            </Col>
            <Col span={12}>
              <ProFormSelect
                name={formField.topic.name}
                label={formField.topic.label}
                options={mapTopicOptions}
              />
            </Col>
            <Col span={12}>
              <ProFormSelect
                name={formField.language.name}
                label={formField.language.label}
                options={mapLanguageOptions}
              />
            </Col>
            <Col span={12}>
              <ProFormSelect
                name={formField.status.name}
                label={formField.status.label}
                options={mapStatusOptions}
              />
            </Col>
            <Col span={12}>
              <ProFormSelect
                name={formField.mode.name}
                label={formField.mode.label}
                options={mapModeOptions}
              />
            </Col>
            <Col span={24}>
              <Form.Item name={formField.tags.name} label={formField.tags.label}>
                <AntTagInput handleInputTags={handleInputTags} />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>

      <Divider className="my-5 bg-gray-200" plain={true}>
        <FormattedMessage id="component.form.createQuestion.option" />
      </Divider>

      <Row gutter={[48, 24]}>
        <Col span={24}>
          <Form.List name={formField.options.name}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Space key={field.key} align="baseline" size="large">
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, curValues) =>
                        prevValues.question !== curValues.question ||
                        prevValues.options !== curValues.options
                      }
                    >
                      {() => (
                        <Form.Item
                          {...field}
                          label={`${formField.option.label} ${index + 1}`}
                          name={[field.name, formField.option.name]}
                          rules={[
                            {
                              required: formField.option.required,
                              message: formField.option.errMsg,
                            },
                          ]}
                        >
                          <CustomEditor
                            handleEditorChange={(value: any) =>
                              handlechangeOptionContent(value, field.name)
                            }
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
                        onChange={(event: CheckboxChangeEvent) =>
                          handlechangeCorrectOption(event, field.name)
                        }
                      >
                        {formField.value.label}
                      </Checkbox>
                    </Form.Item>

                    <MinusCircleFilled onClick={() => remove(field.name)} />
                  </Space>
                ))}

                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusCircleFilled />}>
                    <FormattedMessage id="component.form.createQuestion.addOption" />
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
          {initialValues ? (
            <FormattedMessage id="component.form.createQuestion.update" />
          ) : (
            <FormattedMessage id="component.form.createQuestion.create" />
          )}
        </Button>
      </Space>
    </Form>
  );
};

export default TemplateFormFieldMultipleChoiceQuestion;
