import { DISPATCH_TYPE } from '@/utils/constant';
import { useMount } from 'ahooks';
import { Col, Row, Spin } from 'antd';
import { useState } from 'react';
import { connect } from 'umi';
import ExamHeading from '../../exams/exams-exam/components/ExamHeading';
import QuestionContent from '../../exams/exams-exam/components/QuestionContent';

interface IProps {
  id: string;
  dispatch: any;
  loadingInfo: boolean;
}

const UserExamOverview: React.FC<IProps> = ({ id, dispatch, loadingInfo }) => {
  const [userExamResult, setUserExamResult] = useState<API.UserExam>();

  useMount(() => {
    dispatch({
      type: DISPATCH_TYPE.USER_EXAMS_OVERVIEW,
      payload: {
        userExamId: id,
      },
    }).then((result: API.UserExam) => {
      setUserExamResult(result);
    });
  });

  return (
    <Spin spinning={loadingInfo}>
      <Row>
        <Col span={24}>
          <ExamHeading
            templateExam={userExamResult?.templateExam}
            time={
              userExamResult?.templateExam.schedules.find(
                (y) => y.code == userExamResult?.scheduleCode,
              )?.time
            }
          />
        </Col>

        {userExamResult?.questions
          .map((x) => x.question)
          .map((question: API.Question, index: number) => {
            const questionAnswers: API.QuestionAnswer[] = userExamResult.questions.map((x) => {
              return {
                questionId: x.question.id,
                answerValue: x.answerValue,
                answerOrder: x.answerOrder,
              };
            });
            return (
              <Col span={12} offset={6} key={question.id}>
                <QuestionContent
                  currentIndex={index}
                  currentQuestion={question}
                  questionAnswers={questionAnswers}
                  hasDivider={true}
                />
              </Col>
            );
          })}
      </Row>
    </Spin>
  );
};

export default connect(({ loading }: any, { match }: any) => {
  const { id } = match.params;
  return {
    id,
    loadingInfo: loading.effects[DISPATCH_TYPE.USER_EXAMS_OVERVIEW],
  };
})(UserExamOverview);
