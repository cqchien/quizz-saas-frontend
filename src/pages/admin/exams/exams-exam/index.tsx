import { CheckOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import type { RadioChangeEvent } from 'antd';
import { Button } from 'antd';
import { Row, Col } from 'antd';
import { orderBy } from 'lodash';
import { useEffect, useState } from 'react';
import { connect } from 'umi';
import ExamHeading from './components/ExamHeading';
import ExamSummary from './components/ExamSummary';
import QuestionContent from './components/QuestionContent';

interface IProps {
  dispatch: any;
  questionList: API.Question[];
}

const DoExam: React.FC<IProps> = ({ dispatch, questionList }) => {
  const [questionAnswers, setQuestionAnswers] = useState<API.QuestionAnswer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<API.Question>(questionList[0]);
  const [currentQuestionId, setCurrentQuestionId] = useState<string>(questionList[0]?.id);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch({
      type: 'questions/fetch',
      payload: { params: { page: 1, take: 10 } },
    });
  }, [dispatch]);

  useEffect(() => {
    setQuestionAnswers([]);
    setCurrentIndex(0);
    setCurrentQuestion(questionList[0]);
    setCurrentQuestionId(questionList[0]?.id);
  }, [questionList]);

  useEffect(() => {
    setCurrentQuestion(questionList[currentIndex]);
    setCurrentQuestionId(questionList[currentIndex]?.id);
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
    console.log('Submit', questionAnswers);
  };

  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <ExamHeading />
      </Col>
      <Col span={24}>
        <Row gutter={[48, 0]} className="exam-content w-100">
          <Col offset={2} span={12} className="exam-main-content">
            <ProCard
              title={`Question ${currentIndex + 1}`}
              actions={[
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
                  disabled={currentIndex == 0}
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                >
                  Previous
                </Button>,
                <Button
                  key="nextQuestion"
                  icon={<ArrowRightOutlined />}
                  size="large"
                  disabled={currentIndex + 1 == questionList.length}
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                >
                  Next
                </Button>,
              ]}
            >
              <QuestionContent
                currentQuestion={currentQuestion}
                onSelectOption={onSelectOption}
                questionAnswers={questionAnswers}
              />
            </ProCard>
          </Col>
          <Col span={8} className="do-exam-wrapper">
            <ExamSummary
              questionList={questionList}
              setCurrentIndex={setCurrentIndex}
              onSubmitExam={onSubmitExam}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default connect(({ loading, questions }: any) => {
  const { ids, dictionary, pagingParams } = questions;
  const questionList = ids.map((id: string) => dictionary[id]);
  return {
    questionList: orderBy(questionList, 'createdAt', 'desc'),
    pagingParams: pagingParams,
    loading: loading.effects['exams/fetch'],
  };
})(DoExam);
