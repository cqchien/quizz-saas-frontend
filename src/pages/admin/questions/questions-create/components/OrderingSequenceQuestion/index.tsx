import { ProCard, ProForm } from '@ant-design/pro-components';
import { Button, Divider, Space } from 'antd';
import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { EditorOptionConfiguration } from '@/utils/constant';

interface Props {
  optionNumber: any;
  handleRemoveOptionClick: any;
  handleAddOptionClick: any;
  handleChange: any;
  handleSubmit: any;
}

const OrderingSequenceForm: React.FC<Props> = ({
  optionNumber,
  handleRemoveOptionClick,
  handleAddOptionClick,
  handleChange,
  handleSubmit,
}) => {
  return (
    <ProForm initialValues={{}} onFinish={handleSubmit}>
      {Array.from(Array(optionNumber).keys()).map((keynumber) => (
        <ProCard>
          <CKEditor
            name={`option${keynumber}`}
            editor={ClassicEditor}
            config={EditorOptionConfiguration}
            onChange={(event: Event, editor: ClassicEditor) => {
              handleChange(event, editor, keynumber);
            }}
          />
        </ProCard>
      ))}
      <Space>
        {optionNumber > 2 && (
          <Button danger onClick={handleRemoveOptionClick}>
            Remove
          </Button>
        )}
        <Button onClick={handleAddOptionClick}>Add Option</Button>
      </Space>
      <Divider type="horizontal" />
    </ProForm>
  );
};

export default OrderingSequenceForm;
