import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const MultipleChoiceQuestionForm: React.FC = () => {
  return (
    <CKEditor
      editor={ClassicEditor}
      onReady={(editor: any) => {
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!', editor);
      }}
      onChange={(event: any, editor: any) => {
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
      onBlur={(event: any, editor: any) => {
        console.log('Blur.', editor);
      }}
      onFocus={(event: any, editor: any) => {
        console.log('Focus.', editor);
      }}
    />
  );
};

export default MultipleChoiceQuestionForm;
