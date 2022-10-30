import { ProCard } from '@ant-design/pro-components';
import { Radio, Space } from 'antd';
import React, { useState } from 'react';
import { connect } from 'umi';
import mapStateToProps from '../../questions/mapStateToProps';

interface Props {
  dispatch: any;
  questionList: API.Question[];
  loading: boolean;
  pagingParams: API.PageParams;
  questionId?: string;
}

const QuestionCard: React.FC<Props> = ({ questionId, questionList }) => {
  const [questionDetail] = useState(questionList.find((x) => x.id == questionId));

  const onChange = (e: any) => {
    console.log('radio checked', e.target.value);
  };

  return (
    <ProCard>
      {questionDetail && (
        <>
          <div>{questionDetail.question}</div>
          <div>
            <Radio.Group onChange={onChange}>
              <Space direction="vertical">
                {questionDetail.options.map((item) => (
                  <Radio key={item.order} value={item.order}>
                    {item.option}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
        </>
      )}
    </ProCard>
  );
};

export default connect(mapStateToProps)(QuestionCard);
