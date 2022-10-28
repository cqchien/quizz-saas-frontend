import type { FC } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'umi';
import { useHistory } from 'react-router-dom';
import { useSetForm } from '@/context/FormContext';
import formSchema from '../schemas/examSchema';
import { getInitialValue } from '../schemas/getInitialValues';
import type { ProFormInstance } from '@ant-design/pro-components';
import TemplateFormFieldExam from '../components/TemplateFormFieldExam';

interface IExamForm {
  exam?: API.Exam;
}

const ExamForm: FC<IExamForm> = ({ exam }) => {
  const history = useHistory();
  const dispatch: any = useDispatch();

  const { formField } = formSchema;

  const form = useRef<ProFormInstance>();

  useSetForm(form);

  const handleConfirmCancel = () => {
    history.push('/exams');
  };

  function handleViewExam(id: string) {
    history.push(`/exams/${id}/edit`);
  }

  const handleSubmit = (value: any) => {
    const cb = (id: string) => {
      form.current?.resetFields();

      if (exam) {
        return handleConfirmCancel();
      }
      return handleViewExam(id);
    };

    const examInfo: API.Exam = {
      ...value,
      code: `EXAM${new Date().toISOString().slice(0, 19).replace(/-/g, '').replace(/:/g, '')}`,
      defaultQuestionNumber: value.questions.length,
      type: 'exam',
      questionBankType: 'system',
    };

    if (exam) {
      return dispatch({
        type: 'exams/update',
        payload: {
          exam: examInfo,
          examId: exam.id,
          cb,
        },
      });
    }

    return dispatch({
      type: 'exams/create',
      payload: { exam: examInfo, cb },
    });
  };

  return (
    <TemplateFormFieldExam
      formField={formField}
      formRef={form}
      initialValues={getInitialValue(exam)}
      onSubmit={handleSubmit}
    />
  );
};
//635ba271257a709a02cf1314
export default ExamForm;
