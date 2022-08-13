import { PageContainer, ProFormRadio } from '@ant-design/pro-components';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import MultipleChoiceQuestionForm from './components/MultipleChoiceQuestion';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { QuestionTypeAlias } from '@/utils/constant';
import FillInBlankQuestionForm from './components/FillInBlankQuestion';
import MatchTheFollowing from './components/MatchTheFollowingQuestion';
import MatchTheFollowingQuestion from './components/MatchTheFollowingQuestion';
import MatchTheFollowingForm from './components/MatchTheFollowingQuestion';
import OrderingSequenceForm from './components/OrderingSequenceQuestion';

class QuestionOption {
  order: number;
  option: string;
  value: string;

  constructor(order: number, option: string, value: string) {
    this.order = order;
    this.option = option;
    this.value = value;
  }
}

const QuestionCreationPage: React.FC = () => {
  const optionObj1 = { order: 0, option: '', value: '' };
  const optionObj2 = { order: 1, option: '', value: '' };

  const [selectedType, setSelectedType] = useState(QuestionTypeAlias.MultipleChoiceQuestion);
  const [optionNumber, setOptionNumber] = useState(2);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([optionObj1, optionObj2]);

  useEffect(() => {
    setOptionNumber(2);
    setQuestion('');
    setOptions(
      selectedType === QuestionTypeAlias.FillInBlanks
        ? [optionObj1]
        : selectedType === QuestionTypeAlias.MultipleChoiceQuestion
        ? [
            { ...optionObj1, value: 'false' },
            { ...optionObj2, value: 'false' },
          ]
        : [optionObj1, optionObj2],
    );
  }, [selectedType]);

  const handleChange = (
    event: Event,
    editor: ClassicEditor,
    keynumber: number,
    isValueChange = false,
  ) => {
    const data = editor.getData();

    if (selectedType === QuestionTypeAlias.FillInBlanks) {
      setOptions([
        {
          ...options[keynumber],
          option: data,
        },
      ]);
    } else {
      const updateOject = isValueChange
        ? {
            ...options[keynumber],
            value: data,
          }
        : {
            ...options[keynumber],
            option: data,
          };

      keynumber == 0
        ? setOptions([updateOject, ...options.slice(keynumber + 1)])
        : setOptions([
            ...options.slice(0, keynumber),
            updateOject,
            ...options.slice(keynumber + 1),
          ]);
    }
  };

  const handleAddOptionClick = (e: Event) => {
    e.preventDefault();

    const value = selectedType === 'MCQ' ? 'false' : '';

    setOptionNumber(optionNumber + 1);
    setOptions([
      ...options,
      {
        order: optionNumber,
        option: '',
        value: value,
      },
    ]);
  };

  const handleRemoveOptionClick = (e: Event) => {
    e.preventDefault();
    setOptionNumber(optionNumber - 1);
    setOptions([...options.slice(0, optionNumber - 1)]);
  };

  const handleSubmit = async (e: Event) => {
    const data = {
      question: question,
      type: selectedType,
      heuristicLevel: 'KNOWLEDGE',
      status: 'Pending',
      level: 10,
      topic: '',
      tags: [],
      options: options,
      language: 'vi-VN',
      attachment: [],
      isPrivate: false,
    };

    console.log(data);
    //Call api
    //alert('Create Successfully');
  };

  return (
    <PageContainer>
      <Card>
        <ProFormRadio.Group
          style={{
            margin: 16,
          }}
          radioType="button"
          fieldProps={{
            value: selectedType,
            onChange: (e) => setSelectedType(e.target.value),
          }}
          options={[
            {
              value: QuestionTypeAlias.MultipleChoiceQuestion,
              label: 'Multiple Choice Question (MCQ)',
            },
            {
              value: QuestionTypeAlias.FillInBlanks,
              label: 'Fill In Blank Question (FIB)',
            },
            {
              value: QuestionTypeAlias.MatchTheFollowing,
              label: 'Match The Following Question (MTF)',
            },
            {
              value: QuestionTypeAlias.OrderingSequence,
              label: 'Ordering Sequence Question (ORD)',
            },
          ]}
        />
        <CKEditor
          editor={ClassicEditor}
          onReady={(editor: any) => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            setQuestion(data);
          }}
          onBlur={(event: any, editor: any) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event: any, editor: any) => {
            console.log('Focus.', editor);
          }}
        />
        {selectedType === QuestionTypeAlias.MultipleChoiceQuestion && (
          <MultipleChoiceQuestionForm
            optionNumber={optionNumber}
            setOptionNumber={setOptionNumber}
            options={options}
            setOptions={setOptions}
            selectedType={selectedType}
            handleRemoveOptionClick={handleRemoveOptionClick}
            handleAddOptionClick={handleAddOptionClick}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
        {selectedType === QuestionTypeAlias.FillInBlanks && (
          <FillInBlankQuestionForm
            options={options}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
        {selectedType === QuestionTypeAlias.MatchTheFollowing && (
          <MatchTheFollowingForm
            optionNumber={optionNumber}
            handleRemoveOptionClick={handleRemoveOptionClick}
            handleAddOptionClick={handleAddOptionClick}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
        {selectedType === QuestionTypeAlias.OrderingSequence && (
          <OrderingSequenceForm
            optionNumber={optionNumber}
            handleRemoveOptionClick={handleRemoveOptionClick}
            handleAddOptionClick={handleAddOptionClick}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </Card>
    </PageContainer>
  );
};

export default QuestionCreationPage;
