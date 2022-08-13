import { EditorOptionConfiguration } from '@/utils/constant';
import { ProCard, ProForm, ProFormCheckbox } from '@ant-design/pro-components';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Button, Divider, Space } from 'antd';
import { useState } from 'react';

interface Props {
  optionNumber: any;
  setOptionNumber: any;
  options: any;
  setOptions: any;
  selectedType: any;
  handleRemoveOptionClick: any;
  handleAddOptionClick: any;
  handleChange: any;
  handleSubmit: any;
}

const MultipleChoiceQuestionForm: React.FC<Props> = ({
  optionNumber,
  options,
  setOptions,
  selectedType,
  handleRemoveOptionClick,
  handleAddOptionClick,
  handleChange,
  handleSubmit,
}) => {
  const [preRightOptions, setPreRightOptions] = useState<number[]>([]);

  function getDifference<T>(a: T[], b: T[]): T[] {
    return a.filter((element) => {
      return !b.includes(element);
    });
  }

  const UpdateOptions = (rightOptions: number[]) => {
    const diff = [
      ...getDifference(rightOptions, preRightOptions),
      ...getDifference(preRightOptions, rightOptions),
    ];

    const keynumber = diff[0] - 1;
    const oldData = options[keynumber].option;

    if (keynumber == 0) {
      setOptions([
        {
          order: keynumber,
          option: oldData,
          value: rightOptions.includes(keynumber + 1) ? 'true' : 'false',
        },
        ...options.slice(keynumber + 1),
      ]);
    } else {
      setOptions([
        ...options.slice(0, keynumber),
        {
          order: keynumber,
          option: oldData,
          value: rightOptions.includes(keynumber + 1) ? 'true' : 'false',
        },
        ...options.slice(keynumber + 1),
      ]);
    }

    setPreRightOptions(rightOptions);
  };

  return (
    <ProForm
      initialValues={{}}
      onValuesChange={(_, values) => {
        UpdateOptions(values['checkbox-group']);
      }}
      onFinish={handleSubmit}
    >
      {Array.from(Array(optionNumber).keys()).map((keynumber) => (
        <ProCard>
          <ProCard colSpan={3}>Option {keynumber + 1}:</ProCard>
          <ProCard colSpan={21}>
            <CKEditor
              name={`option${keynumber}`}
              editor={ClassicEditor}
              config={EditorOptionConfiguration}
              onChange={(event: Event, editor: ClassicEditor) => {
                handleChange(event, editor, keynumber);
              }}
            />
          </ProCard>
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
      <ProFormCheckbox.Group
        label="Please choose one or more correct answers"
        name="checkbox-group"
        options={[...Array(optionNumber + 1).keys()]}
      />
    </ProForm>
  );
};

export default MultipleChoiceQuestionForm;
