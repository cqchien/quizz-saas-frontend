import type { FC } from "react";
import { useDispatch } from "umi";
import { Form, Spin } from "antd";
import { useHistory, useParams } from 'react-router-dom';
import { useSetForm } from "@/context/FormContext";
import TemplateFormFieldMultipleChoiceQuestion from "../components/TemplateFormFieldMultipleChoiceQuestion";
import formSchema from '../schemas/questionSchema';
import { getInitialValue } from "../schemas/getInitialValues";

const MultipleChoiceQuestionForm: FC = () => {
  const { formField } = formSchema;

  const history = useHistory();
  const dispatch: any = useDispatch();
  const { id: questionId }: any = useParams();
  const [form] = Form.useForm();
  useSetForm(form);

  const handleConfirmCancel = () => {
    history.push('/questions');
  }

  function handleViewQuestion(id: string) {
    history.push(`/questions/${id}/edit`);
  }

  const handleSubmitCreate = (value: any) => {
    const cb = (id: string) => {
      form.resetFields();

      handleViewQuestion(id);
    }

    const question: API.Question = {
      ...value,
    }

    dispatch({
      type: 'questions/create',
      payload: { question, cb }
    })
  }

  return (
    <Spin
      spinning={
        false
      }
    >
      {!questionId ? (
        <TemplateFormFieldMultipleChoiceQuestion
          formField={formField}
          formRef={form}
          initialValues={getInitialValue()}
          onSubmit={handleSubmitCreate}
          onCancel={handleConfirmCancel}
        />
      ) : (
        <div>b</div>
      )}
    </Spin>
  )

}

export default MultipleChoiceQuestionForm;