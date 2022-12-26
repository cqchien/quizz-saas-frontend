import { DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsState, ProColumns } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import type { FC } from 'react';
import { useEffect } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, Divider, Form, Input, Popconfirm, Space, Tag } from 'antd';
import { useState } from 'react';
import { FormattedMessage, Link, useIntl } from 'umi';
import ImportQuestionModal from './components/ImportQuestion';
import mapStateToProps from '../mapStateToProps';
import { connect } from 'dva';
import { EditTwoTone } from '@ant-design/icons';
import {
  DISPATCH_TYPE,
  MAP_HEURISTIC_LEVEL,
  MAP_QUESTION_TYPE_SHORT,
  MAP_STATUS,
  MAP_TOPIC,
  NUMBER_OF_QUESTION_PER_PAGE,
  PAGE_LIMIT,
  QUESTION_BANK_TYPE,
  ROLES,
} from '@/utils/constant';
import { Editor } from '@tinymce/tinymce-react';
import { getUser } from '@/utils/authority';
import PageLayout from '@/layout/PageLayout';
import ButtonAdd from '@/components/ButtonAdd/ButtonAdd';
import CustomTable from '@/components/CutomTable/CustomTable';
import { history } from '@@/core/history';
import useUrlState from '@ahooksjs/use-url-state';
import TrashIcon from '@/components/Icons/Trash';
import Edit from '@/components/Icons/Edit';

interface IQuestionListProps {
  dispatch: any;
  questionList: API.Question[];
  loading: boolean;
  pagingParams: API.PageParams;
}

const QuestionsList: FC<IQuestionListProps> = ({
  dispatch,
  questionList,
  pagingParams,
  loading,
}) => {
  const intl = useIntl();
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    name: {
      show: false,
      order: 2,
    },
  });
  const { query = {} } = history.location;
  const [searchParams, setSearchParams] = useUrlState({
    ...query,
    page: query.p ?? 1,
    take: query.limit ?? PAGE_LIMIT,
    question: '',
  });

  const user = getUser();

  useEffect(() => {
    dispatch({
      type: DISPATCH_TYPE.QUESTIONS_FETCH,

      payload: { params: { page: searchParams.page, take: PAGE_LIMIT, type: user.role == ROLES.ADMIN ? '' : QUESTION_BANK_TYPE.PERSONAL } },
    });
  }, [dispatch, searchParams.page, user.role]);

  // const fetchData = (params: any) => {
  //   const user = getUser();
  //   dispatch({
  //     type: DISPATCH_TYPE.QUESTIONS_FETCH,
  //   });
  // };

  const handleRemoveQuestion = (questionId: string) => {
    dispatch({
      type: DISPATCH_TYPE.QUESTIONS_DELETE,
      payload: { questionId: questionId },
    })
  };

  const paginationChange = (page: number, pageSize?: number) => {
    setSearchParams({ ...searchParams, page, take: pageSize });

    dispatch({
      type: DISPATCH_TYPE.QUESTIONS_FETCH,
      payload: {
        params: {
          ...searchParams,
          page: page,
          take: pageSize,
        }
      },
    });
  };

  const handleSearch = (event: any) => {
    const keyword = event?.target?.value ?? '';
    dispatch({
      type: DISPATCH_TYPE.QUESTIONS_FETCH,
      payload: {
        params: {
          ...searchParams,
          question: keyword,
        }
      },
    });
  };

  // const handleSearch = (value: string) => {
  //   fetchData({
  //     page: 1,
  //     take: NUMBER_OF_QUESTION_PER_PAGE,
  //     searchField: 'question',
  //     searchValue: value,
  //   });
  // };

  const handleImport = (data: any) => {
    const uploadedFile = data.file[0];
    const formData = new FormData();

    const cb = () => {
      history.push('/questions/list');
    };

    formData.append('file', uploadedFile.originFileObj, uploadedFile.name);

    return dispatch({
      type: DISPATCH_TYPE.QUESTIONS_IMPORT,
      payload: {
        data: formData,
        cb,
      },
    });
  };

  const questionTableColumns = [
    {
      title: <FormattedMessage id="pages.questionsTable.column.type.typeLabel" />,
      dataIndex: 'type',
      key: 'type',
      initialValue: 'all',
      render: (_, record) => MAP_QUESTION_TYPE_SHORT[record.type],
    },
    {
      title: (
        <FormattedMessage id="pages.questionsTable.column.heuristicLevel.heuristicLevelLabel" />
      ),
      dataIndex: 'heuristicLevel',
      key: 'heuristicLevel',
      initialValue: 'all',
      render: (_, record) => MAP_HEURISTIC_LEVEL[record.heuristicLevel],
    },
    {
      title: <FormattedMessage id="pages.questionsTable.column.topic.topicLabel" />,
      key: 'topic',
      dataIndex: 'topic',
      render: (_, record) => MAP_TOPIC[record.topic],
    },
    {
      title: <FormattedMessage id="pages.questionsTable.column.tag.tagLabel" />,
      dataIndex: 'tags',
      key: 'tag',
      search: false,
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space key={`tags_space_${record.id}`}>
          {(record.tags || []).map((tag) => (
            <Tag color="purple" key={`${tag}_${record.id}`}>
              {tag}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: <FormattedMessage id="pages.questionsTable.column.question.questionLabel" />,
      dataIndex: 'question',
      key: 'question',
      width: 500,
      render: (_, record) => (
        <Editor
          value={record.question}
          init={{
            inline: true,
            readonly: true,
          }}
          disabled={true}
        />
      ),
    },
    {
      title: "Level",
      dataIndex: 'level',
      key: 'level',
      render: (_, record) => (
        record.level
      ),
    },
    {
      title: <FormattedMessage id="pages.questionsTable.column.status.statusLabel" />,
      dataIndex: 'status',
      key: 'status',
      initialValue: 'all',
      render: (_, record) => MAP_STATUS[record.status],
    },
    {
      title: <FormattedMessage id="pages.questionsTable.column.action.actionLabel" />,
      key: 'action',
      valueType: 'option',
      render: (text, record) => [
        <div key={record?.id}>
          <Link to={`/questions/${record.id}/edit`} key={`link_${record.id}`}>
            <Button key={`edit_${record.id}`} type="link" icon={<Edit />} />
          </Link>
          <Divider type="vertical" />
          <Popconfirm
            key={`pop_${record.id}`}
            title={
              <FormattedMessage id="pages.questionsTable.column.action.confirmDeleteQuestionMessage" />
            }
            onConfirm={() => {
              handleRemoveQuestion(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button key={`delete_${record.id}`} type="link" icon={<TrashIcon />} />
          </Popconfirm>
        </div>,
      ],
    },
  ];

  // useEffect(() => {
  //   fetchData({ page: 1, take: NUMBER_OF_QUESTION_PER_PAGE });
  // }, [dispatch]);

  // const paginationChange = (page: number, pageSize?: number) => {
  //   fetchData({
  //     page: page,
  //     take: pageSize,
  //   });
  // };

  return (

    <PageLayout
      title="Your Questions"
      extra={[
        <Form.Item name="search" key="1">
          <Input allowClear placeholder="Search" prefix={<SearchOutlined />} onChange={(e) => handleSearch(e)} />
        </Form.Item>,
        <Link to={'/questions/create'} key="createButton">
          <ButtonAdd key="addQuestion" size="middle">
            Add Questions
          </ButtonAdd>
        </Link>,
        <Form.Item name="import" key="2">
          <ImportQuestionModal key="importButton" handleImport={handleImport} />,
        </Form.Item>,
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
        dataSource={questionList}
        columns={questionTableColumns}
      />
    </PageLayout>

    // <PageContainer>
    //   <ProTable<API.Question>
    //     className="circlebox"
    //     dataSource={questionList}
    //     headerTitle={intl.formatMessage({
    //       id: 'pages.questionsTable.title',
    //     })}
    //     pagination={{
    //       pageSize: pagingParams ? pagingParams.pageSize : NUMBER_OF_QUESTION_PER_PAGE,
    //       total: pagingParams ? pagingParams.total : 0,
    //       defaultCurrent: pagingParams ? pagingParams.current : 1,
    //       onChange: paginationChange,
    //       showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    //     }}
    //     columns={questionTableColumns}
    //     options={{
    //       search: false,
    //       setting: false,
    //       fullScreen: false,
    //       reload: false,
    //       density: false,
    //     }}
    //     toolbar={{
    //       search: {
    //         onSearch: (value) => {
    //           handleSearch(value);
    //         },
    //         placeholder: 'Search...',
    //       },

    //       actions: [
    //         <Link to={'/questions/create'} key="createButtonLink">
    //           <Button type="primary" icon={<PlusOutlined />} key="createButton">
    //             <span>
    //               <FormattedMessage id="pages.questionsTable.column.action.createLabel" />
    //             </span>
    //           </Button>
    //         </Link>,

    //         <ImportQuestionModal key="importButton" handleImport={handleImport} />,
    //       ],
    //     }}
    //     rowKey="key"
    //     columnsState={{
    //       value: columnsStateMap,
    //       onChange: setColumnsStateMap,
    //     }}
    //     loading={loading}
    //     search={false}
    //     dateFormatter="string"
    //   />
    // </PageContainer>
  );
};

export default connect(mapStateToProps)(QuestionsList);
