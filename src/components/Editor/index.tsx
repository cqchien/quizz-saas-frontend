import { Editor } from "@tinymce/tinymce-react";

interface IEditorProps {
  handleEditorChange: any,
  question: string,
}

const EditorCustom: React.FC<IEditorProps> = ({
  handleEditorChange,
  question,
}) => {
  const configEditor = {
    height: 300,
    menubar: true,
    selector: 'textarea#classic',
    autosave_ask_before_unload: false,
    powerpaste_allow_local_images: true,
    plugins: [
      'a11ychecker', 'advcode', 'advlist', 'anchor', 'autolink', 'codesample', 'fullscreen', 'help',
      'image', 'editimage', 'tinydrive', 'lists', 'link', 'media', 'powerpaste', 'preview',
      'searchreplace', 'table', 'template', 'tinymcespellchecker', 'visualblocks', 'wordcount'
    ],  toolbar: 'insertfile a11ycheck undo redo | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image',
    spellchecker_dialog: true,
    spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
    tinydrive_demo_files_url: '../../../public/images/tiny-drive/files.json',
    tinydrive_token_provider: (success: (arg0: { token: string; }) => void, failure: any) => {
      success({ token:  TINY_API_KEY});
    },
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
  }

  return (
    <Editor
      value={question}
      onEditorChange={handleEditorChange}
      init={configEditor}
      outputFormat="html"
    />
  )
}

export default EditorCustom;