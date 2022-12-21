import PageLayout from '@/layout/PageLayout';
import { DISPATCH_TYPE } from '@/utils/constant';
import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'umi';
import FormUserGroup from '../components/FormUserGroup';
import mapStateToProps from '../mapStateToProps';

interface IProps {
  group: API.Group;
  dispatch: any;
  loadingDetail: boolean;
}

const GroupCreateAndEdit: React.FC<IProps> = ({ loadingDetail, dispatch, group }) => {
  const { id }: { id: string } = useParams();

  useEffect(() => {
    dispatch({ type: DISPATCH_TYPE.GROUPS_DETAIL, payload: { id } });
  }, [dispatch, id]);

  return (
    <PageLayout title={id ? 'Edit Group' : 'Create Group'}>
      <Spin spinning={loadingDetail}>
        <FormUserGroup group={group} />
      </Spin>
    </PageLayout>
  );
};

export default connect(mapStateToProps)(GroupCreateAndEdit);
