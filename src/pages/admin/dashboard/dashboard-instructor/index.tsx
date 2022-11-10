import { ProCard } from '@ant-design/pro-components';
import { Row, Col, Typography, Spin, Avatar } from 'antd';
import Meta from 'antd/lib/card/Meta';
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

const { Text } = Typography;
const InstructorDashboard: React.FC<IProps> = ({ loading, dispatch, groupList }) => {
  useEffect(() => {
    dispatch({
      type: 'groups/fetch',
      payload: { params: {} },
    });
  }, [dispatch]);

  const handleGroupSubmit = async (values: any) => {
    dispatch({
      type: 'groups/create',
      payload: { group: values },
    }).then(() => {
      dispatch({
        type: 'groups/fetch',
        payload: { params: {} },
      });
    });
    return true;
  };

  const handleAddUser = async (values: any, group: API.Group) => {
    dispatch({
      type: 'groups/update',
      payload: {
        group: { ...group, members: [...group.members, ...values.members] },
        groupId: group.id,
      },
    }).then(() => {
      dispatch({
        type: 'groups/fetch',
        payload: { params: {} },
      });
    });
    return true;
  };

  return (
    <Spin spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FormFieldGroup onSubmit={handleGroupSubmit} />
        </Col>
        {groupList.map((x, index) => {
          return (
            <Col span={6} key={index}>
              <ProCard
                key={index}
                bordered
                hoverable
                actions={[
                  <FormFieldMember key={x.id} index={index} group={x} onSubmit={handleAddUser} />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={x.name}
                  description={[
                    <Row key={index}>
                      <Col span={24}>
                        <Text>{x.description}</Text>
                      </Col>
                      <Col span={24}>
                        <Text>{`${x.members.length} members`}</Text>
                      </Col>
                    </Row>,
                  ]}
                />
              </ProCard>
            </Col>
          );
        })}
      </Row>
    </Spin>
  );
};

export default connect(mapStateToProps)(InstructorDashboard);
