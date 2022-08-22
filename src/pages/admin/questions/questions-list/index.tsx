import type { ColumnsState, ProColumns } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';

const tableListDataSource: API.Question[] = [
  {
    id: '1',
    question: 'Quốc gia nào có dân số lớn thứ hai trên thế giới?',
    type: 'FIB',
    heuristicLevel: 'KNOWLEDGE',
    status: 'PENDING',
    level: 6,
    topic: 'Quốc Gia',
    options: [
      {
        order: 1,
        option: 'Việt Nam',
        value: false,
      },
    ],
    tags: ['Địa Lý', 'Quốc Gia', 'Dân Số'],
    language: 'vi-VN',
    isPrivate: false,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
];

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
      <FormattedMessage id="pages.questionsTable.column.topic.topicLabel" defaultMessage="Topic" />
    ),
    key: 'topic',
    dataIndex: 'topic',
  },
  {
    title: <FormattedMessage id="pages.questionsTable.column.tag.tagLabel" defaultMessage="Tags" />,
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
      <Button icon="edit" key={record.id} type="link" href={`/questions/edit/${record.id}`} />,
    ],
  },
];

const QuestionsList: React.FC = () => {
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    name: {
      show: false,
      order: 2,
    },
  });

  const intl = useIntl();

  return (
    <PageContainer>
      <ProTable<API.Question, { keyWord?: string }>
        dataSource={tableListDataSource}
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
        search={false}
        dateFormatter="string"
      />
    </PageContainer>
  );
};

export default QuestionsList;
