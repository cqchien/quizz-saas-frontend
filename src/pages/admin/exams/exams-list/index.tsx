import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsState, ProColumns } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import type { FC } from 'react';
import { useEffect } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, Divider, Popconfirm } from 'antd';
import { useState } from 'react';
import { FormattedMessage, Link, useIntl } from 'umi';
import mapStateToProps from '../mapStateToProps';
import { connect } from 'dva';
import { EditTwoTone } from '@ant-design/icons';
import { MAP_EXAM_TYPE, MAP_QUESTION_BANK_TYPE, NUMBER_OF_EXAM_PER_PAGE } from '@/utils/constant';
interface IProps {
  dispatch: any;
  examList: API.Exam[];
  loading: boolean;
  pagingParams: API.PageParams;
}

const ExamList: FC<IProps> = ({ dispatch, examList, pagingParams, loading }) => {
  const intl = useIntl();

  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    name: {
      show: false,
      order: 2,
    },
  });

  const handleRemoveExam = (examId: string) => {
    dispatch({
      type: 'exams/delete',
      payload: { examId: examId },
    }).then((res: any) => {
      if (res) {
        dispatch({
          type: 'exams/fetch',
          payload: { params: { page: 1, take: NUMBER_OF_EXAM_PER_PAGE } },
        });
      }
    });
  };

  const handleSearch = (value: string) => {
    console.log(value);
    dispatch({
      type: 'exams/fetch',
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
    },
    {
      title: <FormattedMessage id="pages.examsTable.column.name.nameLabel" />,
      key: 'examName',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.examsTable.column.description.descriptionLabel" />,
      key: 'description',
      dataIndex: 'description',
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
      title: (
        <FormattedMessage id="pages.examsTable.column.questionBankType.questionBankTypeLabel" />
      ),
      key: 'questionBankType',
      dataIndex: 'questionBankType',
      valueType: 'text',
      render: (_, record) => MAP_QUESTION_BANK_TYPE[record.questionBankType],
    },
    {
      title: <FormattedMessage id="pages.examsTable.column.action.actionLabel" />,
      key: 'action',
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
            <Button key={`overview_${record.id}`} type="link" icon={<EyeOutlined />} />
          </Link>
        </div>,
      ],
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'exams/fetch',
      payload: { params: { page: 1, take: NUMBER_OF_EXAM_PER_PAGE } },
    });
  }, [dispatch]);

  const paginationChange = (page: number, pageSize?: number) => {
    const params: API.PageQuery = {
      page: page,
      take: pageSize,
    };

    dispatch({
      type: 'exams/fetch',
      payload: { params: params },
    });
  };

  return (
    <PageContainer>
      <ProTable<API.Exam>
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
