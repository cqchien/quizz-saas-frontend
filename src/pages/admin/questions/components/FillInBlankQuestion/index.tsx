import { ProCard, ProForm } from '@ant-design/pro-components';
import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { EditorOptionConfiguration } from '@/utils/constant';

interface Props {
  options: any;
  handleChange: any;
  handleSubmit: any;
}

const FillInBlankQuestionForm: React.FC<Props> = ({ options, handleChange, handleSubmit }) => {
  return (
    <ProForm initialValues={{}} onFinish={handleSubmit}>
      <ProCard>
        <ProCard colSpan={3}>Answer:</ProCard>
        <ProCard colSpan={21}>
          <CKEditor
            name="answer"
            editor={ClassicEditor}
            config={EditorOptionConfiguration}
            onChange={(event: Event, editor: ClassicEditor) => {
              handleChange(event, editor, 0);
            }}
          />
        </ProCard>
      </ProCard>
    </ProForm>
  );
};

export default FillInBlankQuestionForm;
