import orderBy from 'lodash/orderBy';

export default (state: { questions: any; loading: any }) => {
  const { questions, loading } = state;
  const { ids, dictionary } = questions;
  const questionList = ids.map((id: string) => dictionary[id]);
  return {
    questionList: orderBy(questionList, 'createdAt', 'desc'),
    loadingQuestionList: loading.effects['questions/fetch'],
  };
};