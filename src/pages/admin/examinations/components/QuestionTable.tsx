import React, { Key, useEffect, useState } from 'react';
import type { ColumnsState, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Card, Space, Tag } from 'antd';
import { connect, FormattedMessage, useIntl } from 'umi';
import mapStateToProps from '../../questions/mapStateToProps';
import {
  HEURISTIC_LEVEL_STRING,
  NUMBER_OF_QUESTION_PER_PAGE,
  QUESTION_TYPE_STRING,
} from '@/utils/constant';

interface IQuestionListProps {
  dispatch: any;
  questionList: API.Question[];
  loading: boolean;
  pagingParams: API.PageParams;
  handleSelectQuestion: any;
}

const QuestionTable: React.FC<IQuestionListProps> = ({
  dispatch,
  questionList,
  pagingParams,
  handleSelectQuestion,
}) => {
  const intl = useIntl();

  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    name: {
      show: false,
      order: 2,
    },
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

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
      valueEnum: {
        all: { text: 'All' },
        [QUESTION_TYPE_STRING.MULTIPLE_CHOICE_QUESTION]: {
          text: QUESTION_TYPE_STRING.MULTIPLE_CHOICE_QUESTION,
        },
        [QUESTION_TYPE_STRING.FILL_IN_BLANK]: { text: QUESTION_TYPE_STRING.FILL_IN_BLANK },
        [QUESTION_TYPE_STRING.MATCH_THE_FOLLOWING]: {
          text: QUESTION_TYPE_STRING.MATCH_THE_FOLLOWING,
        },
        [QUESTION_TYPE_STRING.ORDERING_SEQUENCE]: { text: QUESTION_TYPE_STRING.ORDERING_SEQUENCE },
      },
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
      valueEnum: {
        all: { text: 'All' },
        [HEURISTIC_LEVEL_STRING.KNOWLEDGE]: { text: HEURISTIC_LEVEL_STRING.KNOWLEDGE },
        [HEURISTIC_LEVEL_STRING.COMPREHENSION]: { text: HEURISTIC_LEVEL_STRING.COMPREHENSION },
        [HEURISTIC_LEVEL_STRING.APPLICATION]: { text: HEURISTIC_LEVEL_STRING.APPLICATION },
        [HEURISTIC_LEVEL_STRING.ANALYSIS]: { text: HEURISTIC_LEVEL_STRING.ANALYSIS },
        [HEURISTIC_LEVEL_STRING.SYNTHESIS]: { text: HEURISTIC_LEVEL_STRING.SYNTHESIS },
        [HEURISTIC_LEVEL_STRING.EVALUATION]: { text: HEURISTIC_LEVEL_STRING.EVALUATION },
      },
    },
    {
      title: <FormattedMessage id="pages.questionsTable.column.topic.topicLabel" />,
      key: 'topic',
      dataIndex: 'topic',
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
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'questions/fetch',
      payload: { params: { page: 1, take: NUMBER_OF_QUESTION_PER_PAGE } },
    });
  }, []);

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
    <Card>
      <ProTable<API.Question>
        dataSource={questionList}
        search={false}
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedKeys) => {
            setSelectedRowKeys(selectedKeys);
          },
        }}
        headerTitle={intl.formatMessage({
          id: 'pages.questionsTable.title',
        })}
        pagination={{
          pageSize: pagingParams ? pagingParams.pageSize : NUMBER_OF_QUESTION_PER_PAGE,
          total: pagingParams ? pagingParams.total : 0,
          defaultCurrent: pagingParams ? pagingParams.current : 1,
          showSizeChanger: true,
          onChange: paginationChange,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        columns={questionTableColumns}
        options={{
          setting: false,
          fullScreen: false,
          reload: false,
          density: false,
        }}
        rowKey="id"
        columnsState={{
          value: columnsStateMap,
          onChange: setColumnsStateMap,
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            type="primary"
            key="show"
            onClick={() => {
              handleSelectQuestion(selectedRowKeys);
              setSelectedRowKeys([]);
            }}
          >
            Select question
          </Button>,
        ]}
      />
    </Card>
  );
};

export default connect(mapStateToProps)(QuestionTable);
