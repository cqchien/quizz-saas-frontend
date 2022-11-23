import { DISPATCH_TYPE } from '@/utils/constant';
import { CrownOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Row, Col, Typography, Spin, Space } from 'antd';
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

const { Title } = Typography;
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
                <ProCard className="circlebox" key={x.id} bordered hoverable>
                  <Space align="center" direction="vertical" style={{ display: 'flex' }}>
                    <Title level={3}>{x.name}</Title>

                    <Space align="start" direction="vertical" style={{ display: 'flex' }}>
                      <Title className="card-text" level={5}>
                        <CrownOutlined style={{ fontSize: '24px', color: '#08c' }} />
                        {` ${x.description}`}
                      </Title>

                      <Title className="card-text" level={5}>
                        <UserOutlined style={{ fontSize: '24px', color: '#08c' }} />
                        {` ${x.members.length} members`}
                      </Title>
                    </Space>

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
