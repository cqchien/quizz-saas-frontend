import { DeleteOutlined, EyeOutlined, PlusOutlined, ScheduleOutlined } from '@ant-design/icons';
import type { ColumnsState, ProColumns } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import type { FC } from 'react';
import { useEffect } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, Divider, Popconfirm, Tooltip } from 'antd';
import { useState } from 'react';
import { FormattedMessage, Link, useHistory, useIntl } from 'umi';
import mapStateToProps from '../mapStateToProps';
import { connect } from 'dva';
import { EditTwoTone } from '@ant-design/icons';
import {
  DISPATCH_TYPE,
  MAP_EXAM_TYPE,
  MAP_QUESTION_BANK_TYPE,
  NUMBER_OF_EXAM_PER_PAGE,
} from '@/utils/constant';
import ModalAddSchedule from '../components/ModalAddSchedule';
import { prepareScheduleInfo } from '@/utils/function';
import { getInitialValue } from '../schemas/getInitialValues';
interface IProps {
  dispatch: any;
  examList: API.Exam[];
  loading: boolean;
  pagingParams: API.PageParams;
}

const ExamList: FC<IProps> = ({ dispatch, examList, pagingParams, loading }) => {
  const intl = useIntl();

  const history = useHistory();
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    name: {
      show: false,
      order: 2,
    },
  });

  const handleRemoveExam = (examId: string) => {
    dispatch({
      type: DISPATCH_TYPE.EXAMS_DELETE,
      payload: { examId: examId },
    }).then((res: any) => {
      if (res) {
        dispatch({
          type: DISPATCH_TYPE.EXAMS_FETCH,
          payload: { params: { page: 1, take: NUMBER_OF_EXAM_PER_PAGE } },
        });
      }
    });
  };

  const handleSearch = (value: string) => {
    console.log(value);
    dispatch({
      type: DISPATCH_TYPE.EXAMS_FETCH,
      payload: {
        params: {
          page: 1,
          take: NUMBER_OF_EXAM_PER_PAGE,
          // searchField: 'exam',
          // searchValue: value,
        },
      },
    });
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

  const examTableColumns: ProColumns<API.Exam>[] = [
    {
      dataIndex: 'index',
      key: 'index',
      valueType: 'indexBorder',
      width: 20,
    },
    {
      title: <FormattedMessage id="pages.examsTable.column.code.codeLabel" />,
      dataIndex: 'code',
      valueType: 'select',
      width: '10%',
    },
    {
      title: <FormattedMessage id="pages.examsTable.column.name.nameLabel" />,
      key: 'examName',
      dataIndex: 'name',
      valueType: 'text',
      width: '20%',
    },
    {
      title: <FormattedMessage id="pages.examsTable.column.description.descriptionLabel" />,
      key: 'description',
      dataIndex: 'description',
      valueType: 'text',
      width: '30%',
    },
    {
      title: <FormattedMessage id="pages.examsTable.column.type.typeLabel" />,
      key: 'type',
      dataIndex: 'type',
      valueType: 'text',
      width: '10%',
      render: (_, record) => MAP_EXAM_TYPE[record.type],
    },
    {
      title: (
        <FormattedMessage id="pages.examsTable.column.questionBankType.questionBankTypeLabel" />
      ),
      key: 'questionBankType',
      dataIndex: 'questionBankType',
      valueType: 'text',
      width: '10%',
      render: (_, record) => MAP_QUESTION_BANK_TYPE[record.questionBankType],
    },
    {
      title: <FormattedMessage id="pages.examsTable.column.action.actionLabel" />,
      key: 'action',
      width: '20%',
      valueType: 'option',
      render: (text, record) => [
        <div key={record?.id}>
          <Popconfirm
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
            <Button key={`delete_${record.id}`} type="link" icon={<DeleteOutlined />} danger />
          </Popconfirm>
          <Divider type="vertical" />
          <Link to={`/exams/${record.id}/edit`} key={`link_${record.id}`}>
            <Button key={`edit_${record.id}`} type="link" icon={<EditTwoTone />} />
          </Link>
          <Divider type="vertical" />
          <Link to={`/exams/${record.id}/overview`} key={`link_overview_${record.id}`}>
            <Tooltip
              title={
                <FormattedMessage id="pages.examsTable.column.action.viewExamStatistics.title" />
              }
            >
              <Button key={`overview_${record.id}`} type="link" icon={<EyeOutlined />} />
            </Tooltip>
          </Link>
          <Divider type="vertical" />
          <ModalAddSchedule
            trigger={getModalAddScheduleTrigger(record.id as string)}
            handleScheduleSubmit={(values: any) =>
              handleScheduleSubmit(record.id as string, values)
            }
          />
        </div>,
      ],
    },
  ];

  useEffect(() => {
    dispatch({
      type: DISPATCH_TYPE.EXAMS_FETCH,
      payload: { params: { page: 1, take: NUMBER_OF_EXAM_PER_PAGE } },
    });
  }, [dispatch]);

  const paginationChange = (page: number, pageSize?: number) => {
    const params: API.PageQuery = {
      page: page,
      take: pageSize,
    };

    dispatch({
      type: DISPATCH_TYPE.EXAMS_FETCH,
      payload: { params: params },
    });
  };

  return (
    <PageContainer>
      <ProTable<API.Exam>
        className="circlebox"
        dataSource={examList}
        headerTitle={intl.formatMessage({
          id: 'pages.examsTable.title',
        })}
        pagination={{
          pageSize: pagingParams ? pagingParams.pageSize : NUMBER_OF_EXAM_PER_PAGE,
          total: pagingParams ? pagingParams.total : 0,
          defaultCurrent: pagingParams ? pagingParams.current : 1,
          onChange: paginationChange,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          showSizeChanger: false,
        }}
        columns={examTableColumns}
        options={{
          search: false,
          setting: false,
          fullScreen: false,
          reload: false,
          density: false,
        }}
        toolbar={{
          search: {
            onSearch: (value) => {
              handleSearch(value);
            },
            placeholder: 'Search...',
          },

          actions: [
            <Link to={'/exams/create'} key="createButton">
              <Button key="key" type="primary" icon={<PlusOutlined />}>
                <span>
                  <FormattedMessage id="pages.examsTable.column.action.createLabel" />
                </span>
              </Button>
            </Link>,
          ],
        }}
        rowKey="key"
        columnsState={{
          value: columnsStateMap,
          onChange: setColumnsStateMap,
        }}
        loading={loading}
        search={false}
        dateFormatter="string"
      />
    </PageContainer>
  );
};

export default connect(mapStateToProps)(ExamList);
