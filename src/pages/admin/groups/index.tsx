import ButtonAdd from '@/components/ButtonAdd/ButtonAdd';
import CustomTable from '@/components/CutomTable/CustomTable';
import PageLayout from '@/layout/PageLayout';
import { DATE_TIME_FORMAT, DISPATCH_TYPE } from '@/utils/constant';
import { SearchOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { connect } from 'umi';
import dayjs from 'dayjs';
import mapStateToProps from './mapStateToProps';
import TableActions from '@/components/TableActions/TableActions';

interface IProps {
  groupList: API.Group[];
  dispatch: any;
  loading: boolean;
}

const InstructorDashboard: React.FC<IProps> = ({ loading, dispatch, groupList }) => {
  useEffect(() => {
    dispatch({
      type: DISPATCH_TYPE.GROUPS_FETCH,
      payload: { params: {} },
    });
  }, [dispatch]);

  // const handleGroupSubmit = async (values: any) => {
  //   dispatch({
  //     type: DISPATCH_TYPE.GROUPS_CREATE,
  //     payload: { group: values },
  //   }).then(() => {
  //     fetchData();
  //   });
  //   return true;
  // };

  // const handleAddUser = async (values: any, group: API.Group) => {
  //   dispatch({
  //     type: DISPATCH_TYPE.GROUPS_UPDATE,
  //     payload: {
  //       group: { ...group, members: [...group.members, ...values.members] },
  //       groupId: group.id,
  //     },
  //   }).then(() => {
  //     fetchData();
  //   });
  //   return true;
  // };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '# of members',
      dataIndex: 'members',
      key: 'members',
      render: (members: any) => {
        return members.length || 0;
      },
    },
    {
      title: 'Modified date',
      dataIndex: 'updatedAt',
      key: 'modifiedDate',
      render: (updatedAt: string) => {
        return dayjs(updatedAt).format(DATE_TIME_FORMAT);
      },
    },
    {
      title: '',
      dataIndex: 'operation',
      width: 120,
      render: () => {
        return <TableActions onDelete={() => console.log('delete')} onEdit={() => console.log('edit')} />;
      },
    },
  ];

  return (

    <PageLayout
      className="groups"
      title="All Groups"
      content=""
      extra={[
        <Form.Item name="search" key="1">
          <Input allowClear placeholder="Search" prefix={<SearchOutlined />} onChange={() => console.log('search')} />
        </Form.Item>,
        <ButtonAdd key="2" onClick={() => console.log('add')}>
          New Group
        </ButtonAdd>,
      ]}
    >
      <CustomTable
        rowKey="name"
        loading={loading}
        scroll={{ x: 'max-content' }}
        pagination={false}
        dataSource={groupList}
        columns={columns}
      />
    </PageLayout>
  )
  // return (
  //   <Spin spinning={loading}>
  //     <PageContainer>
  //       <Row gutter={[48, 48]}>
  //         <Col span={24}>
  //           <FormFieldGroup onSubmit={handleGroupSubmit} />
  //         </Col>
  //         {groupList.map((x, index) => {
  //           return (
  //             <Col span={6} key={x.id}>
  //               <ProCard className="circlebox ant-card-head-title" key={x.id} bordered hoverable>
  //                 <Space direction="vertical" size={15} style={{ display: 'flex' }}>
  //                   <Avatar.Group style={{ alignItems: 'center' }}>
  //                     <Avatar
  //                       style={{
  //                         width: '74px',
  //                         height: '74px',
  //                         lineHeight: '74px',
  //                         fontSize: '18px',
  //                       }}
  //                       size={74}
  //                       shape="square"
  //                       src="https://i.pinimg.com/564x/d6/e3/f8/d6e3f8f4df79883e8bb27394a558a38d.jpg"
  //                     />
  //                     <div className="avatar-info">
  //                       <h4 className="font-semibold m-0">{x.name}</h4>
  //                       <p>{` ${x.members.length} members`}</p>
  //                     </div>
  //                   </Avatar.Group>
  //                   <p>{` ${x.description}`}</p>
  //                   <FormFieldMember key={x.id} index={index} group={x} onSubmit={handleAddUser} />
  //                 </Space>
  //               </ProCard>
  //             </Col>
  //           );
  //         })}
  //       </Row>
  //     </PageContainer>
  //   </Spin>
  // );
};

export default connect(mapStateToProps)(InstructorDashboard);
