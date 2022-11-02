import {
  CheckOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useMount } from 'ahooks';
import type { RadioChangeEvent } from 'antd';
import { Result, Statistic } from 'antd';
import { Button, Card, Space } from 'antd';
import { Row, Col } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import { useEffect, useState } from 'react';
import { connect } from 'umi';
import ExamHeading from './components/ExamHeading';
import ExamSummary from './components/ExamSummary';
import QuestionContent from './components/QuestionContent';

interface IProps {
  id: string;
  dispatch: any;
  userExam: API.UserExam;
}

const DoExam: React.FC<IProps> = ({ id, dispatch, userExam }) => {
  const [examResult, setExamResult] = useState<any>();
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<API.Schedule>();
  const [questionList, setQuestionList] = useState<API.Question[]>([]);
  const [questionAnswers, setQuestionAnswers] = useState<API.QuestionAnswer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<API.Question>();
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useMount(() => {
    dispatch({
      type: 'userExamsNamespace/takeExam',
      payload: {
        userExamId: id,
      },
    });
  });

  useEffect(() => {
    if (userExam) {
      setQuestionList(userExam.questions.map((x) => x.question));
      setSchedule(
        userExam.templateExam.schedules.filter((x) => x.code == userExam.scheduleCode)[0],
      );
    }
  }, [userExam]);

  useEffect(() => {
    if (questionList) {
      setQuestionAnswers([]);
      setCurrentIndex(0);
      setCurrentQuestion(questionList[0]);
      setCurrentQuestionId(questionList[0]?.id);
    }
  }, [questionList]);

  useEffect(() => {
    if (questionList) {
      setCurrentQuestion(questionList[currentIndex]);
      setCurrentQuestionId(questionList[currentIndex]?.id);
    }
  }, [currentIndex, questionList]);

  const onSelectOption = (e: RadioChangeEvent) => {
    let result: API.QuestionAnswer[] = [];
    if (questionAnswers.find((x) => x.questionId == currentQuestionId)) {
      result = questionAnswers.map((x) =>
        x.questionId == questionList[currentIndex].id ? { ...x, answerOrder: e.target.value } : x,
      );
    } else {
      const questionAnswer: API.QuestionAnswer = {
        questionId: currentQuestionId,
        answerOrder: e.target.value,
      };
      result = [...questionAnswers, questionAnswer];
    }
    setQuestionAnswers(result);
  };

  const onSubmitExam = () => {
    dispatch({
      type: 'userExamsNamespace/submitExam',
      payload: {
        examSubmit: {
          answers: questionAnswers,
        },
        userExamId: id,
      },
    }).then((result: any) => {
      setExamResult(result);
      setIsSubmited(true);
    });
  };

  const examMainContentActions = [
    <Button
      key="viewResult"
      icon={<CheckOutlined />}
      size="large"
      onClick={() => {
        console.log(questionAnswers);
      }}
    >
      View result
    </Button>,
    <Button
      key="previousQuestion"
      icon={<ArrowLeftOutlined />}
      size="large"
      disabled={!userExam?.setting.viewPassQuestion || currentIndex == 0}
      onClick={() => setCurrentIndex(currentIndex - 1)}
    >
      Previous
    </Button>,
    <Button
      key="nextQuestion"
      icon={<ArrowRightOutlined />}
      size="large"
      disabled={!userExam?.setting.viewNextQuestion || currentIndex + 1 == questionList?.length}
      onClick={() => setCurrentIndex(currentIndex + 1)}
    >
      Next
    </Button>,
  ];

  return userExam ? (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <ExamHeading templateExam={userExam.templateExam} time={schedule?.time} />
      </Col>
      <Col span={24}>
        {isSubmited ? (
          <Result
            status={examResult?.resultStatus == 'Failed' ? 'error' : 'success'}
            title={
              examResult?.resultStatus == 'Failed'
                ? 'Sorry, you failed'
                : 'Congratulations, you have successfully completed the exam'
            }
            extra={[
              <Statistic
                key="percent"
                value={(examResult?.numberOfCorrectAnswer / examResult?.questions.length) * 100}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                suffix="%"
              />,
            ]}
          />
        ) : (
          <Row gutter={[48, 0]} className="exam-content w-100">
            <Col offset={2} span={12} className="exam-main-content">
              <ProCard title={`Question ${currentIndex + 1}`} actions={examMainContentActions}>
                <QuestionContent
                  currentQuestion={currentQuestion}
                  onSelectOption={onSelectOption}
                  questionAnswers={questionAnswers}
                />
              </ProCard>
            </Col>
            <Col span={8} className="do-exam-wrapper">
              <Card>
                <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
                  <Space align="center">
                    <ClockCircleOutlined style={{ fontSize: '32px', color: '#003a8c' }} />
                    <Countdown
                      value={new Date(schedule?.endTime ? schedule?.endTime : '').getTime()} //Date.now() + 1000 * 60 * 30
                      onFinish={onSubmitExam}
                      valueStyle={{ color: '#003a8c' }}
                    />
                  </Space>
                </Space>
              </Card>

              <ExamSummary
                questionList={questionList}
                setCurrentIndex={setCurrentIndex}
                questionAnswers={questionAnswers}
                onSubmitExam={onSubmitExam}
              />
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  ) : (
    <></>
  );
};

export default connect(({ userExamsNamespace }: any, { match }: any) => {
  const { id } = match.params;
  const { dictionary } = userExamsNamespace;
  return {
    id,
    userExam: dictionary[id],
  };
})(DoExam);