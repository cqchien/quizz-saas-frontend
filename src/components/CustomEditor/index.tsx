import { Editor } from "@tinymce/tinymce-react";

interface IEditorProps {
  handleEditorChange: any,
  value?: any,
}

const CustomEditor: React.FC<IEditorProps> = ({
  handleEditorChange,
  value,
}) => {
  const configEditor = {
    height: 300,
    menubar: true,
    selector: 'textarea#classic',
    autosave_ask_before_unload: false,
    powerpaste_allow_local_images: true,
    plugins: [
      'advlist', 'anchor', 'autolink', 'codesample', 'fullscreen', 'help',
      'image', 'tinydrive', 'lists', 'link', 'media', 'preview',
      'searchreplace', 'table', 'template', 'visualblocks', 'wordcount'
    ], toolbar: 'insertfile a11ycheck undo redo | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image',
    spellchecker_dialog: true,
    spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
    tinydrive_token_provider: (success: (arg0: { token: string; }) => void) => {
      success({ token: TINY_API_KEY });
    },
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
  }
  return (
    /* @ts-ignore*/
    <Editor
      value={value}
      onEditorChange={handleEditorChange}
      /* @ts-ignore*/
      init={configEditor}
      outputFormat="html"
    />
  )
}

export default CustomEditor;