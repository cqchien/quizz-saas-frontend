import { DashboardOutlined, ScheduleOutlined, SearchOutlined } from '@ant-design/icons';
import type { FC} from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Divider, Form, Input, Popconfirm, Tooltip } from 'antd';
import { FormattedMessage, Link } from 'umi';
import mapStateToProps from '../mapStateToProps';
import { connect } from 'dva';
import ButtonAdd from '@/components/ButtonAdd/ButtonAdd';

import {
  DISPATCH_TYPE,
  MAP_EXAM_TYPE,
  PAGE_LIMIT,
} from '@/utils/constant';
import ModalAddSchedule from '../components/ModalAddSchedule';
import { prepareScheduleInfo } from '@/utils/function';
import { getInitialValue } from '../schemas/getInitialValues';
import PageLayout from '@/layout/PageLayout';
import CustomTable from '@/components/CutomTable/CustomTable';
import useUrlState from '@ahooksjs/use-url-state';
import { history } from '@@/core/history';
import TrashIcon from '@/components/Icons/Trash';
import Edit from '@/components/Icons/Edit';

interface IProps {
  dispatch: any;
  examList: API.Exam[];
  loading: boolean;
  pagingParams: API.PageParams;
}

const ExamList: FC<IProps> = ({ dispatch, examList, pagingParams, loading }) => {
  // const history = useHistory();
  const { query = {} } = history.location;

  const [searchParams, setSearchParams] = useUrlState({
    ...query,
    page: query.p ?? 1,
    take: query.limit ?? PAGE_LIMIT,
    search: ''
  });
  const [searchTerm, setSearchTerm] = useState('');


  const handleRemoveExam = (examId: string) => {
    dispatch({
      type: DISPATCH_TYPE.EXAMS_DELETE,
      payload: { examId: examId },
    }).then((res: any) => {
      if (res) {
        dispatch({
          type: DISPATCH_TYPE.EXAMS_FETCH,
          payload: { params: { page: searchParams.page, take: PAGE_LIMIT } },
        });
      }
    });
  };

  const handleSearch = (event: any) => {
    const keyword = event?.target?.value ?? '';
    setSearchTerm(keyword);
  };

  const getModalAddScheduleTrigger = (id: string) => {
    return (
      <Tooltip
        title={<FormattedMessage id="pages.examsTable.column.action.newScheduleTooltip.title" />}
      >
        <Button key={`schedule_${id}`} type="link" icon={<ScheduleOutlined />} />
      </Tooltip>
    );
  };

  const handleScheduleSubmit = async (id: string, values: any) => {
    const newSchedule = prepareScheduleInfo(values);
    dispatch({
      type: DISPATCH_TYPE.EXAMS_DETAILS,
      payload: {
        examId: id,
      },
    }).then((result: API.Exam) => {
      const cb = () => {
        history.push('/exams');
      };
      const initExam = getInitialValue(result);
      const updatedExam = {
        ...initExam,
        schedules: [...initExam.schedules, newSchedule],
        questions: initExam.questions.map((x: API.Question) => x.id),
      };
      return dispatch({
        type: DISPATCH_TYPE.EXAMS_UPDATE,
        payload: {
          exam: updatedExam,
          examId: id,
          cb,
        },
      }).then(() => {
        return true;
      });
    });
  };

  const examTableColumns = [
    {
      title: <FormattedMessage id="pages.examsTable.column.code.codeLabel" />,
      dataIndex: 'code',
      valueType: 'select',
    },
    {
      title: <FormattedMessage id="pages.examsTable.column.name.nameLabel" />,
      key: 'examName',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.examsTable.column.type.typeLabel" />,
      key: 'type',
      dataIndex: 'type',
      valueType: 'text',
      render: (_, record) => MAP_EXAM_TYPE[record.type],
    },
    {
      title: '# of questions',
      key: 'questions',
      dataIndex: 'questions',
      valueType: 'number',
      render: (_, record) => record.questions?.length || 0,
    },
    {
      title: <FormattedMessage id="pages.examsTable.column.action.actionLabel" />,
      key: 'action',
      width: '20%',
      valueType: 'option',
      render: (text, record) => [
        <div key={record?.id}>
          <Link to={`/exams/${record.id}/overview`} key={`link_overview_${record.id}`}>
            <Tooltip
              title={
                <FormattedMessage id="pages.examsTable.column.action.viewExamStatistics.title" />
              }
            >
              <Button key={`overview_${record.id}`} type="link" icon={<DashboardOutlined />} />
            </Tooltip>
          </Link>
          <Divider type="vertical" />
          <ModalAddSchedule
            trigger={getModalAddScheduleTrigger(record.id as string)}
            handleScheduleSubmit={(values: any) =>
              handleScheduleSubmit(record.id as string, values)
            }
          />
          <Divider type="vertical" />
          <Link to={`/exams/${record.id}/edit`} key={`link_${record.id}`}>
            <Tooltip
              title="Edit Template"
            >
              <Button key={`edit_${record.id}`} type="link" icon={<Edit />} />
            </Tooltip>
          </Link>
          <Divider type="vertical" />
          {/* <Popconfirm
            key={`pop_${record.id}`}
            title={
              <FormattedMessage id="pages.examsTable.column.action.confirmDeleteExamMessage" />
            }
            onConfirm={() => {
              handleRemoveExam(record.id || '');
            }}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip
              title="Remove Template"
            >
              <Button key={`delete_${record.id}`} type="link" icon={<TrashIcon />} />

            </Tooltip>
          </Popconfirm> */}
        </div>,
      ],
    },
  ];

  useEffect(() => {
    dispatch({
      type: DISPATCH_TYPE.EXAMS_FETCH,
      payload: { params: { page: searchParams.page, take: PAGE_LIMIT } },
    });
  }, [dispatch, searchParams.page]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchParams({ ...searchParams, search: searchTerm });
    }, 300);

    dispatch({
      type: DISPATCH_TYPE.EXAMS_FETCH,
      payload: {
        params: {
          page: 1,
          take: searchParams.take,
          q: searchParams.search
        }
      },
    })
    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, searchParams, searchTerm, setSearchParams]);

  const paginationChange = (page: number, pageSize?: number) => {
    setSearchParams({ ...searchParams, page, take: pageSize });

    dispatch({
      type: DISPATCH_TYPE.EXAMS_FETCH,
      payload: { params: searchParams },
    });
  };

  return (
    <PageLayout
      title="All Templates"
      extra={[
        <Form.Item name="search" key="1">
          <Input allowClear placeholder="Search" prefix={<SearchOutlined />} onChange={(e) => handleSearch(e)} />
        </Form.Item>,
        <Link to={'/exams/create'} key="createButton">
          <ButtonAdd key="addTemplate" size="middle">
            Add Template
          </ButtonAdd>
        </Link>,
      ]}
    >
      <CustomTable
        rowKey="key"
        loading={loading}
        scroll={{ x: 'max-content' }}
        pagination={{
          pageSize: searchParams.take ?? PAGE_LIMIT,
          total: pagingParams ? pagingParams.total : 0,
          defaultCurrent: Number(searchParams.page) ?? 1,
          showSizeChanger: false,
          current: Number(searchParams.page) ?? 1,
          position: ['bottomCenter'],
          onChange: paginationChange,
        }}
        dataSource={examList}
        columns={examTableColumns}
      />
    </PageLayout>
  )


  // return (
  //   <PageContainer>
  //     <ProTable<API.Exam>
  //       className="circlebox"
  //       dataSource={examList}
  //       headerTitle={intl.formatMessage({
  //         id: 'pages.examsTable.title',
  //       })}
  //       pagination={{
  //         pageSize: pagingParams ? pagingParams.pageSize : PAGE_LIMIT,
  //         total: pagingParams ? pagingParams.total : 0,
  //         defaultCurrent: pagingParams ? pagingParams.current : 1,
  //         onChange: paginationChange,
  //         showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  //         showSizeChanger: false,
  //       }}
  //       columns={examTableColumns}
  //       options={{
  //         search: false,
  //         setting: false,
  //         fullScreen: false,
  //         reload: false,
  //         density: false,
  //       }}
  //       toolbar={{
  //         search: {
  //           onSearch: (value) => {
  //             handleSearch(value);
  //           },
  //           placeholder: 'Search...',
  //         },

  //         actions: [
  //           <Link to={'/exams/create'} key="createButton">
  //             <Button key="key" type="primary" icon={<PlusOutlined />}>
  //               <span>
  //                 <FormattedMessage id="pages.examsTable.column.action.createLabel" />
  //               </span>
  //             </Button>
  //           </Link>,
  //         ],
  //       }}
  //       rowKey="key"
  //       columnsState={{
  //         value: columnsStateMap,
  //         onChange: setColumnsStateMap,
  //       }}
  //       loading={loading}
  //       search={false}
  //       dateFormatter="string"
  //     />
  //   </PageContainer>
  // );
};

export default connect(mapStateToProps)(ExamList);
