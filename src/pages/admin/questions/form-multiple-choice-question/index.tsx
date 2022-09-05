import type { FC } from 'react';
import { useDispatch } from 'umi';
import { Form } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSetForm } from '@/context/FormContext';
import TemplateFormFieldMultipleChoiceQuestion from '../components/TemplateFormFieldMultipleChoiceQuestion';
import formSchema from '../schemas/questionSchema';
import { getInitialValue } from '../schemas/getInitialValues';

interface IMultipleChoiceQuestionForm {
  question?: API.Question;
}

const MultipleChoiceQuestionForm: FC<IMultipleChoiceQuestionForm> = ({ question }) => {
  const { formField } = formSchema;

  const history = useHistory();
  const dispatch: any = useDispatch();
  const [form] = Form.useForm();

  useSetForm(form);

  const handleConfirmCancel = () => {
    history.push('/questions');
  };

  function handleViewQuestion(id: string) {
    history.push(`/questions/${id}/edit`);
  }

  const handleSubmit = (value: any) => {
    const cb = (id: string) => {
      form.resetFields();

      if (question) {
        return handleConfirmCancel();
      }
      return handleViewQuestion(id);
    };

    const questionInfo: API.Question = {
      ...value,
    };

    if (question) {
      return dispatch({
        type: 'questions/update',
        payload: {
          question: questionInfo,
          questionId: question.id,
          cb,
        },
      });
    }

    return dispatch({
      type: 'questions/create',
      payload: { question: questionInfo, cb },
    });
  };

  return (
    <TemplateFormFieldMultipleChoiceQuestion
      formField={formField}
      formRef={form}
      initialValues={getInitialValue(question)}
      onSubmit={handleSubmit}
      onCancel={handleConfirmCancel}
    />
  );
};

export default MultipleChoiceQuestionForm;
