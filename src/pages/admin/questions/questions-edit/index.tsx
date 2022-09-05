import { QUESTION_TYPE } from '@/utils/constant';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useMount } from 'ahooks';
import { Spin } from 'antd';
import { connect } from 'dva';
import type { FC } from 'react';
import MultipleChoiceQuestionForm from '../form-multiple-choice-question';
interface IQuestionUpdationPage {
  id: string;
  dispatch: any;
  loadingInfo: boolean;
  question: API.Question;
}

const QuestionUpdationPage: FC<IQuestionUpdationPage> = ({
  id,
  dispatch,
  loadingInfo,
  question,
}) => {
  useMount(() => {
    dispatch({
      type: 'questions/getDetail',
      payload: {
        questionId: id,
      }
    })
  })

  const Components = {
    [QUESTION_TYPE.MULTIPLE_CHOICE_QUESTION]: MultipleChoiceQuestionForm,
  }

  const FormComponent = Components[QUESTION_TYPE.MULTIPLE_CHOICE_QUESTION];

  return (
    <Spin
      spinning={loadingInfo}
    >
      <PageContainer>
        <ProCard>
          <FormComponent question={question} />
        </ProCard>
      </PageContainer>
    </Spin>
  )
};

export default connect(({ loading, questions }: any, { match }: any) => {
  const { id } = match.params;
  const { dictionary } = questions;
  return {
    id,
    loadingInfo: loading.effects['questions/getDetail'],
    question: dictionary[id] || {},
  };
})(QuestionUpdationPage);
