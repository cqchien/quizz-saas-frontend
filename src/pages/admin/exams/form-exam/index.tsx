import { useState } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'umi';
import { useHistory } from 'react-router-dom';
import { useSetForm } from '@/context/FormContext';
import formSchema from '../schemas/examSchema';
import { getInitialValue } from '../schemas/getInitialValues';
import type { ProFormInstance } from '@ant-design/pro-components';
import TemplateFormFieldExam from '../components/TemplateFormFieldExam';
import { Spin } from 'antd';
import { DISPATCH_TYPE } from '@/utils/constant';

interface IExamForm {
  exam?: API.Exam;
}

const ExamForm: React.FC<IExamForm> = ({ exam }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();
  const dispatch: any = useDispatch();

  const { formField } = formSchema;

  const form = useRef<ProFormInstance>();

  useSetForm(form);

  const handleConfirmCancel = () => {
    history.push('/exams');
  };

  const handleSubmit = (value: any) => {
    setLoading(true);

    const cb = (id: string) => {
      form.current?.resetFields();

      return handleConfirmCancel();
    };


    const examInfo: API.Exam = {
      ...value,
      defaultQuestionNumber: value.questions.length,
      questions: value.questions.map((x: API.Question) => x.id),
    };

    if (exam) {
      return dispatch({
        type: DISPATCH_TYPE.EXAMS_UPDATE,
        payload: {
          exam: examInfo,
          examId: exam.id,
          cb,
        },
      }).then((result: any) => {
        setLoading(false);
        return result;
      });
    }

    dispatch({
      type: DISPATCH_TYPE.EXAMS_CREATE,
      payload: { exam: examInfo, cb },
    }).then((result: any) => {
      setLoading(false);
      return result;
    });

  };

  return (
    <Spin spinning={loading}>
      <TemplateFormFieldExam
        formField={formField}
        formRef={form}
        initialValues={getInitialValue(exam)}
        onSubmit={handleSubmit}
      />
    </Spin>
  );
};

export default ExamForm;
