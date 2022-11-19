import {
  MAP_SCHEDULE_STATUS,
  NUMBER_OF_EXAM_CARD_PER_PAGE,
  SCHEDULE_STATUS,
  USER_EXAM_RESULT,
  USER_EXAM_STATUS,
} from '@/utils/constant';
import { ClockCircleOutlined, QuestionCircleOutlined, ScheduleOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Col, Pagination, Row, Space, Spin, Tooltip, Typography } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { connect, FormattedMessage, useHistory } from 'umi';
import mapStateToProps from '../mapStateToProps';

interface IProps {
  userExamList: API.UserExam[];
  dispatch: any;
  loading: boolean;
  pagingParams: API.PageParams;
}

const { Title } = Typography;
const UserDashboard: React.FC<IProps> = ({ loading, dispatch, userExamList, pagingParams }) => {
  const history = useHistory();
  useEffect(() => {
    dispatch({
      type: 'userExamsNamespace/fetch',
      payload: { params: { page: 1, take: NUMBER_OF_EXAM_CARD_PER_PAGE } },
    });
  }, [dispatch]);

  const paginationChange = (page: number, pageSize?: number) => {
    const params: API.PageQuery = {
      page: page,
      take: pageSize,
    };

    dispatch({
      type: 'userExamsNamespace/fetch',
      payload: { params: params },
    });
  };

  const getButtonStype = (thisSchedule: API.Schedule, userExam: API.UserExam) => {
    if (userExam.status == USER_EXAM_STATUS.SUBMITTED) {
      switch (userExam.resultStatus) {
        case USER_EXAM_RESULT.PASSED:
          return {
            color: '#52c41a',
            text: USER_EXAM_RESULT.PASSED,
            title: <FormattedMessage id="component.examCard.buttonHint.passedExam" />,
          };

        case USER_EXAM_RESULT.FAILED:
          return {
            color: '#f5222d',
            text: USER_EXAM_RESULT.FAILED,
            title: <FormattedMessage id="component.examCard.buttonHint.failedExam" />,
          };
      }
    } else {
      if (thisSchedule?.status != SCHEDULE_STATUS.IN_PROGRESS) {
        const mapStatus = MAP_SCHEDULE_STATUS[thisSchedule?.status as string];
        return {
          color: '#722ed1',
          text: MAP_SCHEDULE_STATUS[thisSchedule?.status as string],
          title: `This exam have ${mapStatus?.toLowerCase()}`,
        };
      } else {
        return {
          color: '',
          text: <FormattedMessage id="component.examCard.buttonTitle.visitExam" />,
          title: <FormattedMessage id="component.examCard.buttonHint.visitExam" />,
        };
      }
    }
    return null;
  };

  return (
    <Spin spinning={loading}>
      <PageContainer>
        <Row gutter={[48, 48]}>
          {userExamList.map((x) => {
            const thisSchedule = x.templateExam.schedules.find((y) => y.code == x.scheduleCode);
            const buttonStyle: { color: string; text: string; title: string } = getButtonStype(
              thisSchedule as API.Schedule,
              x,
            ) as { color: string; text: string; title: string };

            return (
              <Col span={6} key={x.id}>
                <ProCard className="criclebox" key={x.id} bordered hoverable>
                  <Space align="center" direction="vertical" style={{ display: 'flex' }}>
                    <Title level={3}>{x.name}</Title>
                    <Space align="start" direction="vertical" style={{ display: 'flex' }}>
                      <Title className="card-text" level={5}>
                        <QuestionCircleOutlined /> {` ${x.questions.length} multiple choices`}
                      </Title>
                      <Title className="card-text" level={5}>
                        <ScheduleOutlined />
                        {` ${moment(thisSchedule?.startTime)
                          .locale('es')
                          .format('DD/MM/YYYY, HH:mm')}`}
                      </Title>
                      <Title className="card-text" level={5}>
                        <ClockCircleOutlined /> {` ${thisSchedule?.time} minutes`}
                      </Title>
                    </Space>
                    <Tooltip title={buttonStyle.title}>
                      <Button
                        onClick={() => {
                          history.push(
                            thisSchedule?.status == SCHEDULE_STATUS.IN_PROGRESS &&
                              x.status != USER_EXAM_STATUS.SUBMITTED
                              ? `/user-exams/${x.id}/take-exam`
                              : '#',
                          );
                        }}
                        type="primary"
                        style={{ width: '250px', background: buttonStyle.color }}
                      >
                        {buttonStyle.text}
                      </Button>
                    </Tooltip>
                  </Space>
                </ProCard>
              </Col>
            );
          })}

          <Col span={12} offset={6}>
            {userExamList && pagingParams && (
              <Pagination
                pageSize={NUMBER_OF_EXAM_CARD_PER_PAGE}
                total={pagingParams.total}
                defaultCurrent={1}
                onChange={paginationChange}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                showSizeChanger={false}
              />
            )}
          </Col>
        </Row>
      </PageContainer>
    </Spin>
  );
};

export default connect(mapStateToProps)(UserDashboard);
