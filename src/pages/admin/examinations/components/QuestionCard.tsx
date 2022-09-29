import { ProCard } from '@ant-design/pro-components';
import { Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import mapStateToProps from '../../questions/mapStateToProps';

interface Props {
  dispatch: any;
  questionList: API.Question[];
  loading: boolean;
  pagingParams: API.PageParams;
  questionId?: string;
}

const question: API.Question = {
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
  language: 'vi-VI',
  updatedAt: new Date(),
  createdAt: new Date(),
  mode: true,
};

const QuestionCard: React.FC<Props> = ({ dispatch, questionId }) => {
  const [questionDetail, setQuestionDetail] = useState<API.Question>(question);

  useEffect(() => {
    dispatch({
      type: 'questions/getDetail',
      payload: { questionId: questionId },
    }).then((result: API.Question) => setQuestionDetail(result));
  }, []);

  const onChange = (e: any) => {
    console.log('radio checked', e.target.value);
  };
  return (
    <ProCard>
      <div>{questionDetail.question}</div>
      <div>
        <Radio.Group onChange={onChange}>
          <Space direction="vertical">
            {questionDetail.options.map((item) => {
              return <Radio value={item.order}>{item.option}</Radio>;
            })}
          </Space>
        </Radio.Group>
      </div>
    </ProCard>
  );
};

export default connect(mapStateToProps)(QuestionCard);
