import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { StepsForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Button, Modal, Form, Space } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import formSchema from '../../schemas/groupSchema';

interface Props {
  onSubmit: any;
}

const FormFieldGroup: React.FC<Props> = ({ onSubmit }) => {
  const { formField } = formSchema;
  const [visible, setVisible] = useState(false);
  const intl = useIntl();
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        <PlusOutlined />
        <FormattedMessage id="component.form.action.addGroup.title" />
      </Button>
      <StepsForm
        onFinish={onSubmit}
        formProps={{
          validateMessages: {
            required: intl.formatMessage({
              id: 'component.form.validateMessages.required',
            }),
          },
        }}
        submitter={{
          render: (props) => {
            if (props.step === 0) {
              return (
                <Button type="primary" onClick={() => props.onSubmit?.()}>
                  Next
                </Button>
              );
            }
            return [
              <Button key="gotoTwo" onClick={() => props.onPre?.()}>
                Previous
              </Button>,
              <Button type="primary" key="goToTree" onClick={() => props.onSubmit?.()}>
                Finish
              </Button>,
            ];
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title={<FormattedMessage id="component.form.modal.addGroup.title" />}
              width={800}
              onCancel={() => setVisible(false)}
              open={visible}
              okText="OK"
              cancelText="Cancel"
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm<{
          name: string;
          description: string;
          members: any[];
        }>
          name="base"
          title={intl.formatMessage({
            id: 'component.form.step.groupInformation.title',
          })}
          onFinish={async () => {
            return true;
          }}
        >
          <ProFormText
            name={formField.name.name}
            label={formField.name.label}
            placeholder={formField.name.placeholder}
            rules={[
              {
                required: formField.name.required,
                message: formField.name.errMsg,
              },
            ]}
          />
          <ProFormTextArea
            name={formField.description.name}
            label={formField.description.label}
            placeholder={formField.description.placeholder}
            rules={[
              {
                required: formField.description.required,
                message: formField.description.errMsg,
              },
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="checkbox"
          title={intl.formatMessage({
            id: 'component.form.step.groupMembers.title',
          })}
        >
          <Form.List name={formField.members.name} initialValue={[]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <ProFormText
                      {...restField}
                      name={[name, formField.memberName.name]}
                      label={formField.memberName.label}
                      placeholder={formField.memberName.placeholder}
                      rules={[
                        {
                          required: formField.memberName.required,
                          message: formField.memberName.errMsg,
                        },
                      ]}
                    />
                    <ProFormText
                      {...restField}
                      name={[name, formField.memberEmail.name]}
                      label={formField.memberEmail.label}
                      placeholder={formField.memberEmail.placeholder}
                      rules={[
                        {
                          type: 'email',
                          message: (
                            <FormattedMessage id="component.form.step.groupMembers.formField.memberEmail.errMsgMail" />
                          ),
                        },
                        {
                          required: formField.memberEmail.required,
                          message: formField.memberEmail.errMsg,
                        },
                      ]}
                    />
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    <FormattedMessage id="component.form.action.addMember.title" />
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};

export default FormFieldGroup;
