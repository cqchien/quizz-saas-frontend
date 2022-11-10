import { UsergroupAddOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button, Form, Space } from 'antd';
import formSchema from '../../schemas/groupSchema';

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
        <Button key={`adduser_${group.id}`} type="link" icon={<UsergroupAddOutlined />}>
          Add member
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
        okText: 'Save',
        cancelText: 'Cancel',
      }}
      submitTimeout={2000}
      onFinish={(vs: any) => onSubmit(vs, group)}
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
                      message: 'The input is not valid E-mail!',
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
                Add member information
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </ModalForm>
  );
};

export default FormFieldMember;
