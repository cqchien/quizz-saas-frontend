import { DISPATCH_TYPE } from '@/utils/constant';
import orderBy from 'lodash/orderBy';

export default (state: { groups: any; loading: any }) => {
  const { groups, loading } = state;
  const { ids, dictionary } = groups;
  const groupList = ids.map((id: string) => dictionary[id]);
  return {
    groupList: orderBy(groupList, 'createdAt', 'desc'),
    loading: loading.effects[DISPATCH_TYPE.GROUPS_FETCH],
  };
};
