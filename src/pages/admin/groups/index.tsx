import { DISPATCH_TYPE } from '@/utils/constant';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Row, Col, Spin, Space, Avatar } from 'antd';
import { useEffect } from 'react';
import { connect } from 'umi';
import FormFieldGroup from './components/FormFieldGroup';
import FormFieldMember from './components/FormFieldMember';
import mapStateToProps from './mapStateToProps';

interface IProps {
  groupList: API.Group[];
  dispatch: any;
  loading: boolean;
}

const InstructorDashboard: React.FC<IProps> = ({ loading, dispatch, groupList }) => {
  const fetchData = () => {
    dispatch({
      type: DISPATCH_TYPE.GROUPS_FETCH,
      payload: { params: {} },
    });
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleGroupSubmit = async (values: any) => {
    dispatch({
      type: DISPATCH_TYPE.GROUPS_CREATE,
      payload: { group: values },
    }).then(() => {
      fetchData();
    });
    return true;
  };

  const handleAddUser = async (values: any, group: API.Group) => {
    dispatch({
      type: DISPATCH_TYPE.GROUPS_UPDATE,
      payload: {
        group: { ...group, members: [...group.members, ...values.members] },
        groupId: group.id,
      },
    }).then(() => {
      fetchData();
    });
    return true;
  };

  return (
    <Spin spinning={loading}>
      <PageContainer>
        <Row gutter={[48, 48]}>
          <Col span={24}>
            <FormFieldGroup onSubmit={handleGroupSubmit} />
          </Col>
          {groupList.map((x, index) => {
            return (
              <Col span={6} key={x.id}>
                <ProCard className="circlebox ant-card-head-title" key={x.id} bordered hoverable>
                  <Space direction="vertical" size={15} style={{ display: 'flex' }}>
                    <Avatar.Group style={{ alignItems: 'center' }}>
                      <Avatar
                        style={{
                          width: '74px',
                          height: '74px',
                          lineHeight: '74px',
                          fontSize: '18px',
                        }}
                        size={74}
                        shape="square"
                        src="https://i.pinimg.com/564x/d6/e3/f8/d6e3f8f4df79883e8bb27394a558a38d.jpg"
                      />
                      <div className="avatar-info">
                        <h4 className="font-semibold m-0">{x.name}</h4>
                        <p>{` ${x.members.length} members`}</p>
                      </div>
                    </Avatar.Group>
                    <p>{` ${x.description}`}</p>
                    <FormFieldMember key={x.id} index={index} group={x} onSubmit={handleAddUser} />
                  </Space>
                </ProCard>
              </Col>
            );
          })}
        </Row>
      </PageContainer>
    </Spin>
  );
};

export default connect(mapStateToProps)(InstructorDashboard);
