import { DISPATCH_TYPE } from '@/utils/constant';
import orderBy from 'lodash/orderBy';

export default (state: { exams: any; loading: any }) => {
  const { exams, loading } = state;
  const { ids, dictionary, pagingParams } = exams;
  const examList = ids.map((id: string) => dictionary[id]);
  return {
    examList: orderBy(examList, 'createdAt', 'desc'),
    pagingParams: pagingParams,
    loading: loading.effects[DISPATCH_TYPE.EXAMS_FETCH],
  };
};
