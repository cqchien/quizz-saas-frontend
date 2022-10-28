import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useMount } from 'ahooks';
import { Spin } from 'antd';
import { connect } from 'dva';
import type { FC } from 'react';
import ExamForm from '../form-exam';
interface IExamUpdationPage {
  id: string;
  dispatch: any;
  loadingInfo: boolean;
  exam: API.Exam;
}

const ExamUpdationPage: FC<IExamUpdationPage> = ({ id, dispatch, loadingInfo, exam }) => {
  useMount(() => {
    dispatch({
      type: 'exams/getDetail',
      payload: {
        examId: id,
      },
    });
  });

  return (
    <Spin spinning={loadingInfo}>
      <PageContainer>
        <ProCard>
          <ExamForm exam={exam} />
        </ProCard>
      </PageContainer>
    </Spin>
  );
};

export default connect(({ loading, exams }: any, { match }: any) => {
  const { id } = match.params;
  const { dictionary } = exams;
  return {
    id,
    loadingInfo: loading.effects['exams/getDetail'],
    exam: dictionary[id] || {},
  };
})(ExamUpdationPage);
