import type { FC } from 'react';
import { useEffect } from 'react';
import { DefaultQuestionObject } from '@/utils/constant';
import type { ColumnsState, ProColumns } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, notification, Popconfirm, Space, Tag } from 'antd';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import mapStateToProps from '../mapStateToProps';
import { connect } from 'dva';
interface IQuestionListProps {
  dispatch: any;
  questionList: API.Question[];
  loading: boolean;
}

const QuestionsList: FC<IQuestionListProps> = ({ dispatch, questionList, loading }) => {
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    name: {
      show: false,
      order: 2,
    },
  });

  const [tableListDataSource, setTableListDataSource] = useState<API.Question[]>([
    {
      ...DefaultQuestionObject,
    },
  ]);

  const handleRemoveQuestion = (questionId: string) => {
    // Call API to remove by questionId

    // Display message base on result
    if (true) {
      notification.success({
        message: `Question was deleted successfully`,
        placement: 'bottomRight',
      });

      const newState = tableListDataSource
        .filter((question) => question.id !== questionId)
        .map((obj, index) => {
          return { ...obj, order: index };
        });

      setTableListDataSource(newState);
    } else {
      notification.error({
        message: `Delete question was failed`,
        placement: 'bottomRight',
      });
    }
  };

  const questionTableColumns: ProColumns<API.Question>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: (
        <FormattedMessage id="pages.questionsTable.column.type.typeLabel" defaultMessage="Type" />
      ),
      dataIndex: 'type',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueType: 'select',
    },
    {
      title: (
        <FormattedMessage
          id="pages.questionsTable.column.heuristicLevel.heuristicLevelLabel"
          defaultMessage="Heuristic Level"
        />
      ),
      dataIndex: 'heuristicLevel',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueType: 'select',
    },
    {
      title: (
        <FormattedMessage
          id="pages.questionsTable.column.topic.topicLabel"
          defaultMessage="Topic"
        />
      ),
      key: 'topic',
      dataIndex: 'topic',
    },
    {
      title: (
        <FormattedMessage id="pages.questionsTable.column.tag.tagLabel" defaultMessage="Tags" />
      ),
      dataIndex: 'tags',
      search: false,
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space>
          {(record.tags || []).map((tag) => (
            <Tag color="cyan" key={tag}>
              {tag}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: (
        <FormattedMessage
          id="pages.questionsTable.column.question.questionLabel"
          defaultMessage="Question"
        />
      ),
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: (
        <FormattedMessage
          id="pages.questionsTable.column.status.statusLabel"
          defaultMessage="Status"
        />
      ),
      dataIndex: 'status',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        close: { text: '关闭', status: 'Default' },
        PENDING: { text: 'Pending', status: 'Processing' },
        online: { text: '已上线', status: 'Success' },
        error: { text: '异常', status: 'Error' },
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.questionsTable.column.action.actionLabel"
          defaultMessage="Action"
        />
      ),
      key: 'action',
      valueType: 'option',
      render: (text, record) => [
        <Button icon="Edit" key={record.id} type="link" href={`/questions/edit/${record.id}`} />,
        <Popconfirm
          title="Are you sure to delete this option?"
          key={record.id}
          onConfirm={() => {
            handleRemoveQuestion(record.id);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button icon="Delete" type="link" danger />
        </Popconfirm>,
      ],
    },
  ];

  const intl = useIntl();

  useEffect(() => {
    dispatch({
      type: 'questions/fetch',
    });
  }, [dispatch]);

  return (
    <PageContainer>
      <ProTable<API.Question, { keyWord?: string }>
        dataSource={questionList}
        headerTitle={intl.formatMessage({
          id: 'pages.questionsTable.title',
          defaultMessage: 'Questions List',
        })}
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
              alert(value);
            },
          },
          actions: [
            <Button key="primary" type="primary" href="/questions/create">
              <FormattedMessage
                id="pages.questionsTable.column.action.createLabel"
                defaultMessage="Create"
              />
            </Button>,
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
