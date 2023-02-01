import { DISPATCH_TYPE } from '@/utils/constant';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useMount } from 'ahooks';
import { Button, Col, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { connect, FormattedMessage } from 'umi';
import ExamHeading from '../../exams/exams-exam/components/ExamHeading';
import ExamSummary from '../../exams/exams-exam/components/ExamSummary';
import QuestionContent from '../../exams/exams-exam/components/QuestionContent';

interface IProps {
  id: string;
  dispatch: any;
  loadingInfo: boolean;
}

const UserExamOverview: React.FC<IProps> = ({ id, dispatch, loadingInfo }) => {
  const [userExamResult, setUserExamResult] = useState<API.UserExam>();
  const [schedule, setSchedule] = useState<API.Schedule>();
  const [questionList, setQuestionList] = useState<API.Question[]>([]);
  const [questionAnswers, setQuestionAnswers] = useState<API.QuestionAnswer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<API.Question>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const examMainContentActions = [
    <Button
      key="previousQuestion"
      icon={<ArrowLeftOutlined />}
      size="large"
      disabled={currentIndex == 0}
      onClick={() => setCurrentIndex(currentIndex - 1)}
    >
      <FormattedMessage id="component.doExam.questionContentCard.action.previous.title" />
    </Button>,
    <Button
      key="nextQuestion"
      icon={<ArrowRightOutlined />}
      size="large"
      disabled={currentIndex + 1 == questionList?.length}
      onClick={() => setCurrentIndex(currentIndex + 1)}
    >
      <FormattedMessage id="component.doExam.questionContentCard.action.next.title" />
    </Button>,
  ];

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

  useEffect(() => {
    if (userExamResult) {
      setQuestionList(userExamResult.questions.map((x) => x.question));
      setSchedule(
        userExamResult.templateExam.schedules.filter(
          (x) => x.code == userExamResult.scheduleCode,
        )[0],
      );
      const initQuestionAnswers: API.QuestionAnswer[] = userExamResult.questions.map((x) => {
        return {
          questionId: x.question.id,
          answerValue: x.answerOrder ? x.question.options[x.answerOrder - 1].value : false,
          answerOrder: x.answerOrder ? x.answerOrder : -1,
        };
      });
      setQuestionAnswers(initQuestionAnswers);
    }
  }, [userExamResult]);

  useEffect(() => {
    if (questionList) {
      setCurrentIndex(0);
      setCurrentQuestion(questionList[0]);
    }
  }, [questionList]);

  useEffect(() => {
    if (questionList) {
      setCurrentQuestion(questionList[currentIndex]);
    }
  }, [currentIndex, questionList]);

  return (
    <Spin spinning={loadingInfo}>
      <div className="remove-pager-margin">
        {userExamResult ? (
          <Row gutter={[0, 24]}>
            <Col span={24}>
              <ExamHeading templateExam={userExamResult.templateExam} time={schedule?.time} />
            </Col>
            <Col span={24}>
              <Row gutter={[48, 0]} className="exam-content w-100">
                <Col offset={3} span={10} className="exam-main-content">
                  <QuestionContent
                    currentIndex={currentIndex}
                    proCardActions={examMainContentActions}
                    proCardStyle={{ height: 'auto', overflow: 'auto' }}
                    currentQuestion={currentQuestion as API.Question}
                    questionAnswers={questionAnswers}
                    showResult={!userExamResult.setting.hideResult}
                  />
                </Col>
                <Col span={7} className="do-exam-wrapper">
                  <ExamSummary
                    questionList={questionList}
                    setCurrentIndex={setCurrentIndex}
                    questionAnswers={questionAnswers}
                    isOverview={true}
                    userExamResult={userExamResult}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </div>
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
