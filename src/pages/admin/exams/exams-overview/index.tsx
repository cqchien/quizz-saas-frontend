import { Line } from '@ant-design/plots';
import { PageContainer } from '@ant-design/pro-components';
import { useMount } from 'ahooks';
import { Calendar, Card, Col, Row, Space, Spin, Typography } from 'antd';
import { connect } from 'dva';
import { useState } from 'react';
import NumberCard from './components/numberCard';
interface IProps {
  id: string;
  dispatch: any;
  loadingInfo: boolean;
}

const { Text, Title } = Typography;

const ExamOverviewPage: React.FC<IProps> = ({ id, dispatch, loadingInfo }) => {
  const [examOverview, setExamOverview] = useState();

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

  useMount(() => {
    dispatch({
      type: 'exams/overview',
      payload: {
        examId: id,
      },
    }).then((result) => {
      setExamOverview(result);
      setData(getLineChartData(result));
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
              number={examOverview?.defaultQuestionNumber}
            />
          </Col>
          <Col key="" lg={6} md={12}>
            <NumberCard
              icon="schedule"
              color="rgb(216 151 235)"
              title="Total Schedules"
              number={examOverview?.schedules.length}
            />
          </Col>
          <Col key="" lg={6} md={12}>
            <NumberCard
              icon="team"
              color="rgb(143 201 251)"
              title="Participants"
              number={examOverview?.userExams?.map((x) => x.user.id).length}
            />
          </Col>
          <Col key="" lg={6} md={12}>
            <NumberCard
              icon="alert"
              color="rgb(246 152 153)"
              title="Pass Percentage (%)"
              number={
                (examOverview?.userExams?.map((x) => {
                  if (x.resultStatus == 'Passed') return x.resultStatus;
                }).length /
                  examOverview?.userExams.length) *
                100
              }
            />
          </Col>
          <Col lg={18} md={24}>
            <Card>
              <Line {...config} />
            </Card>
          </Col>
          <Col lg={6} md={24}>
            <Row gutter={[0, 24]}>
              <Col lg={24} md={12}>
                <Card
                  bordered={false}
                  bodyStyle={{
                    padding: 0,
                    height: 100,
                    background: 'rgb(6 57 112)',
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
