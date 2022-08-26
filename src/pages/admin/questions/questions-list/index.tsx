import { DefaultQuestionObject } from '@/utils/constant';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnsState, PageContainer, ProColumns } from '@ant-design/pro-components';
import type { FC } from 'react';
import { useEffect } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, notification, Popconfirm, Space, Tag } from 'antd';
import { useState } from 'react';
import { FormattedMessage, Link, useIntl } from 'umi';
import ImportQuestionModal from './ImportQuestion';
import mapStateToProps from '../mapStateToProps';
import { connect } from 'dva';
import { EditTwoTone } from '@ant-design/icons';
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
        message: <FormattedMessage id="pages.information.deleteQuestionSuccess" />,
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
        message: <FormattedMessage id="pages.information.deleteQuestionFail" />,
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
      title: <FormattedMessage id="pages.questionsTable.column.type.typeLabel" />,
      dataIndex: 'type',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueType: 'select',
    },
    {
      title: (
        <FormattedMessage id="pages.questionsTable.column.heuristicLevel.heuristicLevelLabel" />
      ),
      dataIndex: 'heuristicLevel',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueType: 'select',
    },
    {
      title: <FormattedMessage id="pages.questionsTable.column.topic.topicLabel" />,
      key: 'topic',
      dataIndex: 'topic',
    },
    {
      title: <FormattedMessage id="pages.questionsTable.column.tag.tagLabel" />,
      dataIndex: 'tags',
      search: false,
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space key={record.id}>
          {(record.tags || []).map((tag) => (
            <Tag color="cyan" key={tag}>
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
    },
    {
      title: <FormattedMessage id="pages.questionsTable.column.status.statusLabel" />,
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
      title: <FormattedMessage id="pages.questionsTable.column.action.actionLabel" />,
      key: 'action',
      valueType: 'option',
      render: (text, record) => [
        <Button key={record.id} type="link" href={`/questions/edit/${record.id}`}>
          Edit
        </Button>,
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
          <Button key={record.id} type="link" danger>
            Delete
          </Button>
        </Popconfirm>,
        <Link to={`/questions/edit/${record.id}`} key={record.id}>
          <Button type="link" icon={<EditTwoTone />} />
        </Link>,
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
            <Button
              key="createButton"
              type="primary"
              href="/questions/create"
              icon={<PlusOutlined />}
            >
              <span>
                <FormattedMessage id="pages.questionsTable.column.action.createLabel" />
              </span>
            </Button>,
            <ImportQuestionModal />,
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
