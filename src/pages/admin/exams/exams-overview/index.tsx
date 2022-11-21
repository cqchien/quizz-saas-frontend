import { USER_EXAM_RESULT, USER_EXAM_STATUS } from '@/utils/constant';
import { Line } from '@ant-design/plots';
import { PageContainer } from '@ant-design/pro-components';
import { useMount } from 'ahooks';
import { Button, Calendar, Card, Col, Row, Space, Spin, Tooltip, Typography } from 'antd';
import { connect } from 'dva';
import { Moment } from 'moment';
import { useState } from 'react';
import ModalListUser from './components/ModalListUser';
import NumberCard from './components/numberCard';
interface IProps {
  id: string;
  dispatch: any;
  loadingInfo: boolean;
}

const { Text, Title } = Typography;

const ExamOverviewPage: React.FC<IProps> = ({ id, dispatch, loadingInfo }) => {
  const [examOverview, setExamOverview] = useState<API.Exam>();
  const [computedNumbers, setComputedNumbers] = useState<{
    totalQuestions: number;
    totalSchedules: number | undefined;
    participants: number | undefined;
    passPercentage: number;
  }>();

  const [data, setData] = useState([]);

  const config = {
    data,
    xField: 'day',
    yField: 'number',
    seriesField: 'name',
    yAxis: {
      title: {
        text: 'Number of paticipants',
        style: {
          fontSize: 16,
        },
      },
    },
    xAxis: {
      title: {
        text: 'Day in this month',
        style: {
          fontSize: 16,
        },
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 3000,
      },
    },
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getLineChartData = (result: any) => {
    const current = new Date();
    const days = new Date(current.getFullYear(), 9, 0).getDate();
    const userPerDays: { name: string; day: number; number: number }[] = [];

    Array.from(Array(days).keys()).map((x: number) => {
      const day = x + 1;
      const examUserOnDate = result?.userExams?.filter(
        (y) => new Date(y.createdAt).getDate() == day,
      );
      const number = examUserOnDate?.length;

      const userPerDay = { name: 'Participants', day: day, number: number };
      userPerDays.push(userPerDay);
    });
    return userPerDays;
  };

  const computeNumbers = (examInfo: API.Exam) => {
    const numberUserPass = examInfo?.userExams?.filter(
      (x) => x.resultStatus == USER_EXAM_RESULT.PASSED,
    );
    const numberUserTake = examInfo?.userExams?.map(
      (x) => x.resultStatus in [USER_EXAM_RESULT.FAILED, USER_EXAM_RESULT.PASSED],
    );
    const passPercentage = (numberUserPass.length / numberUserTake.length) * 100.0;
    return {
      totalQuestions: examInfo?.defaultQuestionNumber,
      totalSchedules: examInfo?.schedules.length,
      participants: examInfo?.userExams
        ?.filter((x) => x.status == USER_EXAM_STATUS.SUBMITTED)
        .map((x) => x.user.id).length,
      passPercentage: passPercentage,
    };
  };

  useMount(() => {
    dispatch({
      type: 'exams/overview',
      payload: {
        examId: id,
      },
    }).then((result: API.Exam) => {
      setExamOverview(result);
      setData(getLineChartData(result));
      setComputedNumbers(computeNumbers(result));
    });
  });

  const dateCellRender = (value: Moment) => {
    const current = new Date(value);
    let isExisted = false;
    if (
      examOverview?.schedules.filter(
        (x) => new Date(x.startTime).toDateString() == current.toDateString(),
      )?.length
    ) {
      isExisted = true;
    }
    return (
      <div
        style={
          isExisted
            ? {
                borderColor: '#343a40',
                border: '1px solid #dee2e6',
                background: '#063970',
                color: '#fff',
              }
            : {}
        }
      >
        {current.getDate()}
      </div>
    );
  };

  return (
    <Spin spinning={loadingInfo}>
      <PageContainer>
        <Row gutter={24}>
          <Col key="totalQuestions" lg={6} md={12}>
            <NumberCard
              icon="question"
              color="rgb(100 234 145)"
              title="Total Questions"
              number={computedNumbers?.totalQuestions}
            />
          </Col>
          <Col key="totalSchedules" lg={6} md={12}>
            <NumberCard
              icon="schedule"
              color="rgb(216 151 235)"
              title="Total Schedules"
              number={computedNumbers?.totalSchedules}
            />
          </Col>
          <Col key="participants" lg={6} md={12} onClick={() => setIsModalOpen(true)}>
            <Tooltip title="Click me to view participant's exam details">
              <Button style={{ display: 'none' }} />
              <NumberCard
                icon="team"
                color="rgb(143 201 251)"
                title="Participants"
                number={computedNumbers?.participants}
              />
            </Tooltip>
          </Col>
          <Col key="passPercentage" lg={6} md={12}>
            <NumberCard
              icon="alert"
              color="rgb(246 152 153)"
              title="Pass Percentage"
              number={computedNumbers?.passPercentage}
              percent={true}
            />
          </Col>
          <Col lg={18} md={24}>
            <Card className="circlebox">
              <Line {...config} />
            </Card>
          </Col>
          <Col lg={6} md={24}>
            <Row gutter={[0, 24]}>
              <Col lg={24} md={12}>
                <Card
                  className="circlebox"
                  style={{ background: 'rgb(6 57 112)' }}
                  bodyStyle={{
                    padding: 0,
                    height: 100,
                    justifyContent: 'center',
                    display: 'flex',
                  }}
                >
                  <Space direction="vertical" align="center">
                    <Title
                      level={3}
                      style={{
                        color: '#ffffff',
                      }}
                    >
                      {examOverview?.name}
                    </Title>
                    <Text
                      style={{
                        color: '#ffffff',
                      }}
                    >
                      {examOverview?.description}
                    </Text>
                  </Space>
                </Card>
              </Col>
              <Col lg={24} md={12}>
                <Card
                  className="circlebox"
                  bordered={false}
                  bodyStyle={{
                    padding: 0,
                    height: 320,
                  }}
                >
                  <Calendar fullscreen={false} dateFullCellRender={dateCellRender} />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <ModalListUser
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          userExams={
            examOverview?.userExams?.filter(
              (x) => x.status == USER_EXAM_STATUS.SUBMITTED,
            ) as API.UserExam[]
          }
        />
      </PageContainer>
    </Spin>
  );
};

export default connect(({ loading }: any, { match }: any) => {
  const { id } = match.params;
  return {
    id,
    loadingInfo: loading.effects['exams/overview'],
  };
})(ExamOverviewPage);
