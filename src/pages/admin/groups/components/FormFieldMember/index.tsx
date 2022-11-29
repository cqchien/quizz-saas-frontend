import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button, Form, Space } from 'antd';
import { FormattedMessage } from 'umi';
import formSchema from '../../schemas/groupSchema';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
  },
};

interface Props {
  group: API.Group;
  index: number;
  onSubmit: any;
}

const FormFieldMember: React.FC<Props> = ({ onSubmit, group }) => {
  const { formField } = formSchema;
  return (
    <ModalForm<{
      members: API.GroupMember[];
    }>
      key={group.id}
      title={`Add members for ${group.name}`}
      trigger={
        <Button key={`adduser_${group.id}`} type="primary">
          <FormattedMessage id="component.form.action.addMemberButton.title" />
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
        okText: 'Save',
        cancelText: 'Cancel',
      }}
      onFinish={(vs: any) => onSubmit(vs, group)}
      layout="horizontal"
    >
      <Form.List name={formField.members.name} initialValue={[]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Space key={key} style={{ display: 'flex' }} align="baseline">
                {index !== 0 && <div style={{ paddingLeft: '88px' }} />}
                <ProFormText
                  {...restField}
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Passengers' : ''}
                  name={[name, formField.memberName.name]}
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
                  placeholder={formField.memberEmail.placeholder}
                  width="lg"
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
    </ModalForm>
  );
};

export default FormFieldMember;
