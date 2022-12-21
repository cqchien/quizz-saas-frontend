import ButtonAdd from '@/components/ButtonAdd/ButtonAdd';
import CustomTable from '@/components/CutomTable/CustomTable';
import PageLayout from '@/layout/PageLayout';
import { DATE_TIME_FORMAT, DISPATCH_TYPE } from '@/utils/constant';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { connect, Link } from 'umi';
import dayjs from 'dayjs';
import mapStateToProps from '../mapStateToProps';
import useUrlState from '@ahooksjs/use-url-state';
import { history } from '@@/core/history';
import TrashIcon from '@/components/Icons/Trash';
import Edit from '@/components/Icons/Edit';
interface IProps {
  groupList: API.Group[];
  dispatch: any;
  loading: boolean;
  loadingDelete: boolean;
}

const InstructorDashboard: React.FC<IProps> = ({ loading, dispatch, groupList, loadingDelete }) => {
  const { query = {} } = history.location;

  const [searchParams, setSearchParams] = useUrlState({
    ...query,
    search: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch({
      type: DISPATCH_TYPE.GROUPS_FETCH,
      payload: { params: {} },
    });
  }, [dispatch]);

  const handleSearch = (event: any) => {
    const keyword = event?.target?.value ?? '';
    setSearchTerm(keyword);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      return setSearchParams({ ...searchParams, search: searchTerm });
    }, 300);

    dispatch({
      type: DISPATCH_TYPE.GROUPS_FETCH,
      payload: {
        params: {
          name: searchParams.search
        }
      },
    })
    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, searchParams, searchTerm, setSearchParams]);

  const handleRemoveGroup = async (id: string) => {
    dispatch({
      type: DISPATCH_TYPE.GROUPS_DELETE,
      payload: {
        groupId: id,
        callback: () => history.push('/groups/list'),
      },
    })
  };

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
      title: 'Actions',
      dataIndex: 'operation',
      width: 120,
      render: (_: any, record: { id: string, name: string }) => {
        return (
          <>
            <Link to={`/groups/${record.id}/edit`} key={`link_${record.id}`}>
              <Button key={`edit_${record.id}`} type="link" icon={<Edit />} />
            </Link>
            <Divider type="vertical" />
            <Popconfirm
              key={`pop_${record.id}`}
              title={`Are you sure you want to delete ${record.name}`}
              onConfirm={() => {
                handleRemoveGroup(record.id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button key={`delete_${record.id}`} type="link" icon={<TrashIcon />} />
            </Popconfirm>
          </>
        )
      }
    },
  ];

  return (
    <PageLayout
      className="groups"
      title="All Groups"
      content=""
      extra={[
        <Form.Item name="search" key="1">
          <Input allowClear placeholder="Search" prefix={<SearchOutlined />} onChange={(e) => handleSearch(e)} />
        </Form.Item>,
        <Link to={'/groups/create'} key="createButton">
          <ButtonAdd key="2">
            New Group
          </ButtonAdd>
        </Link>,
      ]}
    >
      <CustomTable
        rowKey="name"
        loading={loading || loadingDelete}
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
