import type { Key } from 'react';
import React, { useEffect, useState } from 'react';
import type { ColumnsState, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Card, Select, Tag } from 'antd';
import { connect, FormattedMessage, useIntl } from 'umi';
import mapStateToProps from '../../questions/mapStateToProps';
import {
  DISPATCH_TYPE,
  HEURISTIC_LEVEL_STRING,
  MAP_HEURISTIC_LEVEL,
  MAP_QUESTION_BANK_TYPE,
  MAP_QUESTION_TYPE_SHORT,
  MAP_TOPIC,
  NUMBER_OF_QUESTION_PER_PAGE,
  PAGE_LIMIT,
  QUESTION_BANK_TYPE,
  QUESTION_TYPE,
  QUESTION_TYPE_STRING,
  ROLES,
} from '@/utils/constant';
import { Editor } from '@tinymce/tinymce-react';
import { getUser } from '@/utils/authority';
import CustomTable from '@/components/CutomTable/CustomTable';
import CustomSpace from '@/components/CustomSpace/CustomSpace';
import { getUsers } from '@/services/user';
import AntTagInput from '@/components/AntTagInput';

interface IQuestionListProps {
  dispatch: any;
  questionList: API.Question[];
  loading: boolean;
  pagingParams: API.PageParams;
  handleSelectQuestion: any;
}

type FilterParams = {
  topic?: string;
  type?: string;
  createdBy?: string;
  tags?: string[];
};

const mapQuestionBankTypeOptions = Object.keys(MAP_QUESTION_BANK_TYPE).map((type: string) => ({
  label: MAP_QUESTION_BANK_TYPE[type],
  value: type,
}));

const mapTopicOptions = Object.keys(MAP_TOPIC).map((topic: string) => ({
  label: MAP_TOPIC[topic],
  value: topic,
}));

const QuestionTable: React.FC<IQuestionListProps> = ({
  dispatch,
  questionList,
  pagingParams,
  handleSelectQuestion,
  loading,
}) => {
  const intl = useIntl();
  const user = getUser();

  const [filterParams, setFilterParams] = useState<FilterParams>({});
  const [users, setUsers] = useState<any>([]);
  const [loadingGetUser, setLoadingUsers] = useState(false);

  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    name: {
      show: false,
      order: 2,
    },
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const questionTableColumns: ProColumns<API.Question>[] = [
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
      title: <FormattedMessage id="pages.questionsTable.column.type.typeLabel" />,
      dataIndex: 'type',
      key: 'type',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        all: { text: 'All' },
        [QUESTION_TYPE.MULTIPLE_CHOICE_QUESTION]: {
          text: QUESTION_TYPE_STRING.MULTIPLE_CHOICE_QUESTION,
        },
        [QUESTION_TYPE.FILL_IN_BLANK]: { text: QUESTION_TYPE_STRING.FILL_IN_BLANK },
        [QUESTION_TYPE.MATCH_THE_FOLLOWING]: {
          text: QUESTION_TYPE_STRING.MATCH_THE_FOLLOWING,
        },
        [QUESTION_TYPE.ORDERING_SEQUENCE]: { text: QUESTION_TYPE_STRING.ORDERING_SEQUENCE },
      },
      render: (_, record) => MAP_QUESTION_TYPE_SHORT[record.type],
    },
    {
      title: 'Topic',
      key: 'topic',
      dataIndex: 'topic',
      render: (_, record) => MAP_TOPIC[record.topic],
    },
    {
      title: "Tags",
      dataIndex: 'tags',
      key: 'tags',
      filters: true,
      onFilter: true,
      render: (_, record) => (
        <CustomSpace key={`tags_space_${record.id}`}>
          {(record.tags || []).map((tag) => (
            <Tag color="purple" key={`${tag}_${record.id}`}>
              {tag}
            </Tag>
          ))}
        </CustomSpace>
      ),
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
      render: (_, record) => MAP_HEURISTIC_LEVEL[record.heuristicLevel],
    },

    {
      title: "Level",
      dataIndex: 'level',
      key: 'level',
      filters: true,
      onFilter: true,
      render: (_, record) => (
        record.level
      ),
    },

  ];

  useEffect(() => {
    const getAllUser = async () => {
      const response = await getUsers();
      if (response.success) {
        setUsers(response.data);
      }
      setLoadingUsers(false);
    };

    setLoadingUsers(true);
    getAllUser();

  }, []);


  useEffect(() => {
    let params = {
      page: 1,
      take: PAGE_LIMIT,
      topic: filterParams.topic,
      type: filterParams.type,
      createdBy: filterParams.createdBy,
    };

    if ((filterParams.tags || []).length > 0) {
      params = {
        ...params,
        tags: (filterParams.tags || []).join(','),
      }
    }

    dispatch({
      type: DISPATCH_TYPE.QUESTIONS_FETCH,
      payload: {
        params,
      },
    });
  }, [dispatch, filterParams]);

  const paginationChange = (page: number, pageSize?: number) => {
    dispatch({
      type: DISPATCH_TYPE.QUESTIONS_FETCH,
      payload: { params: { ...filterParams, page: page, take: pageSize } },
    });
  };

  const handleSelectButton = () => {
    const selectedQuestion = questionList.filter((x) => {
      if (selectedRowKeys.includes(x.id)) return x;
    });
    handleSelectQuestion(selectedQuestion);
    setSelectedRowKeys([]);
  };

  const getCreatedBy = () => {
    return users.map((info: any) => ({
      label: `${info.name} (${info.email})`,
      value: info.id,
    }));
  }

  return (
    <ProTable<API.Question>
      loading={loading}
      dataSource={questionList}
      search={false}
      rowSelection={{
        selectedRowKeys,
        onChange: (selectedKeys) => {
          setSelectedRowKeys(selectedKeys);
        },
      }}
      pagination={{
        pageSize: pagingParams ? pagingParams.pageSize : PAGE_LIMIT,
        total: pagingParams ? pagingParams.total : 0,
        defaultCurrent: pagingParams ? pagingParams.current : 1,
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
        (
          <AntTagInput key='tagSelector' value={filterParams.tags || []} handleInputTags={(value: any) => {
            setFilterParams({ ...filterParams, tags: value });
          }} />
        ),
        (
          <Select
            style={{ width: '300px' }}
            key="createdBySelector"
            options={getCreatedBy()}
            allowClear
            loading={loadingGetUser}
            placeholder="Created By"
            onChange={(value) => {
              setFilterParams({ ...filterParams, createdBy: value });
            }}
          />
        ),
        (
          <Select
            style={{ width: '200px' }}
            key="typeSelector"
            options={mapQuestionBankTypeOptions}
            placeholder="Question bank type"
            defaultValue='system'
            onChange={(value) => {
              setFilterParams({ ...filterParams, type: value });
            }}
          />
        ),
        (
          <Select
            style={{ width: '200px' }}
            key="topicSelector"
            options={mapTopicOptions}
            placeholder="Topic"
            allowClear
            onChange={(value) => {
              setFilterParams({ ...filterParams, topic: value });
            }}
          />
        ),
        <Button type="primary" key="show" onClick={handleSelectButton}>
          Select question
        </Button>,
      ]}
    />
  );
};

export default connect(mapStateToProps)(QuestionTable);
