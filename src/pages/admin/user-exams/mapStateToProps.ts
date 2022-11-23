import { DISPATCH_TYPE } from '@/utils/constant';
import orderBy from 'lodash/orderBy';

export default (state: { userExamsNamespace: any; loading: any }) => {
  const { userExamsNamespace, loading } = state;
  const { ids, dictionary, pagingParams } = userExamsNamespace;
  const userExamList = ids.map((id: string) => dictionary[id]);
  return {
    userExamList: orderBy(userExamList, 'createdAt', 'desc'),
    pagingParams: pagingParams,
    loading: loading.effects[DISPATCH_TYPE.USER_EXAMS_FETCH],
  };
};
