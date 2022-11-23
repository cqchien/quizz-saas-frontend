import type { FC } from 'react';
import { useDispatch } from 'umi';
import { Form } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSetForm } from '@/context/FormContext';
import TemplateFormFieldMultipleChoiceQuestion from '../components/TemplateFormFieldMultipleChoiceQuestion';
import formSchema from '../schemas/questionSchema';
import { getInitialValue } from '../schemas/getInitialValues';
import { DISPATCH_TYPE, QUESTION_TYPE } from '@/utils/constant';

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
      type: QUESTION_TYPE.MULTIPLE_CHOICE_QUESTION,
      attachment: [],
    };

    if (question) {
      return dispatch({
        type: DISPATCH_TYPE.QUESTIONS_UPDATE,
        payload: {
          question: questionInfo,
          questionId: question.id,
          cb,
        },
      });
    }

    return dispatch({
      type: DISPATCH_TYPE.QUESTIONS_CREATE,
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
