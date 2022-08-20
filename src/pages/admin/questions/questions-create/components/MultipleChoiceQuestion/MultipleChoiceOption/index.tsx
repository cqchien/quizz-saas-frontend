import { Editor } from '@tinymce/tinymce-react';
import { Button, Checkbox, notification, Space } from 'antd';
import React, { useEffect } from 'react';

interface Props {
  currentOptions: API.Option[];
  setCurrentOptions: React.Dispatch<React.SetStateAction<API.Option[]>>;
  currentOption: API.Option;
  setCurrentOption: React.Dispatch<React.SetStateAction<API.Option>>;
}
const MultipleChoiceOptionForm: React.FC<Props> = ({
  currentOptions,
  setCurrentOptions,
  currentOption,
  setCurrentOption,
}) => {
  useEffect(() => {
    setCurrentOption({
      value: false,
      option: '',
      order: currentOptions.length,
    });
  }, [currentOptions]);

  const handleSaveOptionClick = () => {
    if (currentOption.option.length === 0) {
      notification.error({
        message: `Option content is empty`,
        placement: 'bottomRight',
      });
    } else {
      if (
        currentOptions.some((obj) => {
          if (obj.order === currentOption.order) {
            return true;
          }

          return false;
        })
      ) {
        const newState = currentOptions.map((obj) => {
          if (obj.order === currentOption.order) {
            return { ...currentOption };
          }
          return obj;
        });

        setCurrentOptions(newState);
      } else {
        setCurrentOptions((currentOptions) => [...currentOptions, currentOption]);
      }
    }
  };

  return (
    <>
      Please enter option content here (*)
      <Editor
        value={currentOption?.option}
        onEditorChange={(newValue, editor) =>
          setCurrentOption({ ...currentOption, option: newValue })
        }
        init={{
          height: 150,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      <Space align="center" style={{ float: 'right', marginTop: 24 }}>
        <Checkbox
          checked={currentOption.value}
          onChange={(e) => setCurrentOption({ ...currentOption, value: e.target.checked })}
        >
          Is the correct answer
        </Checkbox>
        <Button type="primary" onClick={handleSaveOptionClick}>
          Save option
        </Button>
      </Space>
    </>
  );
};

export default MultipleChoiceOptionForm;
