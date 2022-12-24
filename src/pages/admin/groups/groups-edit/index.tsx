import PageLayout from '@/layout/PageLayout';
import { DISPATCH_TYPE } from '@/utils/constant';
import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'umi';
import FormUserGroup from '../components/FormUserGroup';

interface IProps {
  group: API.Group;
  dispatch: any;
  loadingDetail: boolean;
}

const GroupEditPage: React.FC<IProps> = () => {
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.loading?.effects[DISPATCH_TYPE.GROUPS_DETAIL]);
  const groups = useSelector((state: any) => state.groups?.dictionary);

  const group = groups[id];

  useEffect(() => {
    dispatch({ type: DISPATCH_TYPE.GROUPS_DETAIL, payload: { id } });
  }, [dispatch, id]);

  return (
    <Spin spinning={loading}>
      <PageLayout title="Edit Group">
        <FormUserGroup group={group} />
      </PageLayout>
    </Spin>
  );
};

export default GroupEditPage;
