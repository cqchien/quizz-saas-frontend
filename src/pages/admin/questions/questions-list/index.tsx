import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsState, ProColumns } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import type { FC } from 'react';
import { useEffect } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Tag } from 'antd';
import { useState } from 'react';
import { FormattedMessage, Link, useIntl } from 'umi';
import ImportQuestionModal from './components/ImportQuestion';
import mapStateToProps from '../mapStateToProps';
import { connect } from 'dva';
import { EditTwoTone } from '@ant-design/icons';
import {
  MAP_HEURISTIC_LEVEL,
  MAP_QUESTION_TYPE_SHORT,
  MAP_STATUS,
  MAP_TOPIC,
  NUMBER_OF_QUESTION_PER_PAGE,
} from '@/utils/constant';
import { Editor } from '@tinymce/tinymce-react';
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

  const handleRemoveQuestion = (questionId: string) => {
    dispatch({
      type: 'questions/delete',
      payload: { questionId: questionId },
    }).then((res: any) => {
      if (res) {
        dispatch({
          type: 'questions/fetch',
          payload: { params: { page: 1, take: NUMBER_OF_QUESTION_PER_PAGE } },
        });
      }
    });
  };

  const handleSearch = (value: string) => {
    dispatch({
      type: 'questions/fetch',
      payload: {
        params: {
          page: 1,
          take: NUMBER_OF_QUESTION_PER_PAGE,
          searchField: 'question',
          searchValue: value,
        },
      },
    });
  };

  const handleImport = (data: any) => {
    const uploadedFile = data.file[0];
    const formData = new FormData();

    const cb = () => {
      dispatch({
        type: 'questions/fetch',
        payload: { params: { page: 1, take: NUMBER_OF_QUESTION_PER_PAGE } },
      });
    };

    formData.append('file', uploadedFile.originFileObj, uploadedFile.name);

    return dispatch({
      type: 'questions/import',
      payload: {
        data: formData,
        cb,
      },
    });
  };

  const questionTableColumns: ProColumns<API.Question>[] = [
    {
      dataIndex: 'index',
      key: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: <FormattedMessage id="pages.questionsTable.column.type.typeLabel" />,
      dataIndex: 'type',
      key: 'type',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueType: 'select',
      render: (_, record) => MAP_QUESTION_TYPE_SHORT[record.type],
    },
    {
      title: (
        <FormattedMessage id="pages.questionsTable.column.heuristicLevel.heuristicLevelLabel" />
      ),
      dataIndex: 'heuristicLevel',
      key: 'heuristicLevel',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueType: 'select',
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
        <Space>
          {(record.tags || []).map((tag) => (
            <Tag color="cyan" key={`${tag}_${record.id}`}>
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
      title: <FormattedMessage id="pages.questionsTable.column.status.statusLabel" />,
      dataIndex: 'status',
      key: 'status',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueType: 'select',
      render: (_, record) => MAP_STATUS[record.status],
    },
    {
      title: <FormattedMessage id="pages.questionsTable.column.action.actionLabel" />,
      key: 'action',
      valueType: 'option',
      render: (text, record) => [
        <div key={record?.id}>
          <Popconfirm
            key={record.id}
            title={
              <FormattedMessage id="pages.questionsTable.column.action.confirmDeleteQuestionMessage" />
            }
            onConfirm={() => {
              handleRemoveQuestion(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button key={record.id} type="link" icon={<DeleteOutlined />} danger />
          </Popconfirm>
          <Link to={`/questions/${record.id}/edit`} key={record.id}>
            <Button key={record.id} type="link" icon={<EditTwoTone />} />
          </Link>
        </div>,
      ],
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'questions/fetch',
      payload: { params: { page: 1, take: NUMBER_OF_QUESTION_PER_PAGE } },
    });
  }, [dispatch]);

  const paginationChange = (page: number, pageSize?: number) => {
    const params: API.PageQuery = {
      page: page,
      take: pageSize,
    };

    dispatch({
      type: 'questions/fetch',
      payload: { params: params },
    });
  };

  return (
    <PageContainer>
      <ProTable<API.Question>
        dataSource={questionList}
        headerTitle={intl.formatMessage({
          id: 'pages.questionsTable.title',
        })}
        pagination={{
          pageSize: pagingParams ? pagingParams.pageSize : NUMBER_OF_QUESTION_PER_PAGE,
          total: pagingParams ? pagingParams.total : 0,
          defaultCurrent: pagingParams ? pagingParams.current : 1,
          onChange: paginationChange,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        columns={questionTableColumns}
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
            <Link to={'/questions/create'} key="createButton">
              <Button type="primary" icon={<PlusOutlined />}>
                <span>
                  <FormattedMessage id="pages.questionsTable.column.action.createLabel" />
                </span>
              </Button>
            </Link>,

            <ImportQuestionModal key="importButton" handleImport={handleImport} />,
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

export default connect(mapStateToProps)(QuestionsList);
