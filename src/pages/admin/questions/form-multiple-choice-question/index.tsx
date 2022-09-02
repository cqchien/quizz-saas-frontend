import type { FC } from "react";
import { useDispatch } from "umi";
import { Form, Spin } from "antd";
import { useHistory, useParams } from 'react-router-dom';
import { useSetForm } from "@/context/FormContext";
import TemplateFormFieldMultipleChoiceQuestion from "../components/TemplateFormFieldMultipleChoiceQuestion";
import formSchema from '../schemas/questionSchema';

const MultipleChoiceQuestionForm: FC = () => {
  const { formField } = formSchema;

  const history = useHistory();
  const dispatch: any = useDispatch();
  const { id: questionId }: any = useParams();
  const [form] = Form.useForm();
  useSetForm(form);


  const handleSubmitCreate = (value: any) => {
    const question: API.Question = {
      ...value,
      language: 'vi',
      status: 'active',
      type: 'multiple_choice_question',
      mode: 'pulic',
    }

    dispatch({
      type: 'questions/create',
      payload: { ...question }
    })
  }

  const handleConfirmCancel = () => {
    history.push('/questions');
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