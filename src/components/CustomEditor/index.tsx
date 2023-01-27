import { Editor } from '@tinymce/tinymce-react';

interface IEditorProps {
  handleEditorChange: any;
  value?: any;
}

const CustomEditor: React.FC<IEditorProps> = ({ handleEditorChange, value }) => {
  const configEditor = {
    height: 300,
    menubar: true,
    branding: false,
    selector: 'textarea#classic',
    autosave_ask_before_unload: true,
    powerpaste_allow_local_images: true,
    plugins: [
      'anchor',
      'autolink',
      'codesample',
      'fullscreen',
      'image',
      'lists',
      'link',
      'media',
      'preview',
      'searchreplace',
      'table',
      'visualblocks',
      'wordcount',
    ],
    toolbar:
      'bold italic | fontfamily fontsize | codesample | alignleft aligncenter alignright alignjustify | bullist numlist | table',
    fontsize_formats: '8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt',
    spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
    content_style: `
    .mce-item-table thead tr th {
      font-weight: unset !important;
    }`,
  };
  return (
    /* @ts-ignore*/
    <Editor
      apiKey='rj2relqqq3ge9tw24w0iopt22uq7xf95blew5gyx5hy5u2q0'
      value={value}
      onEditorChange={handleEditorChange}
      /* @ts-ignore*/
      init={configEditor}
      outputFormat="html"
    />
  );
};

export default CustomEditor;
