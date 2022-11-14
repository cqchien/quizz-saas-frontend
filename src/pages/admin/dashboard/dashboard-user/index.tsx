import {
  MAP_SCHEDULE_STATUS,
  NUMBER_OF_EXAM_CARD_PER_PAGE,
  SCHEDULE_STATUS,
} from '@/utils/constant';
import { QuestionCircleOutlined, ScheduleOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button, Col, Pagination, Row, Spin, Statistic, Typography } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { connect } from 'umi';
import mapStateToProps from './mapStateToProps';

interface IProps {
  userExamList: API.UserExam[];
  dispatch: any;
  loading: boolean;
  pagingParams: API.PageParams;
}

const { Text, Title } = Typography;
const UserDashboard: React.FC<IProps> = ({ loading, dispatch, userExamList, pagingParams }) => {
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

  return (
    <Spin spinning={loading}>
      <Row gutter={[48, 48]}>
        {userExamList.map((x) => {
          return (
            <Col span={6} key={x.id}>
              <ProCard
                key={x.id}
                bordered
                hoverable
                actions={
                  x.status == SCHEDULE_STATUS.IN_PROGRESS
                    ? [
                        <Button
                          key={x.id}
                          href={`${window.location.origin}/user-exams/${x.id}/take-exam`}
                        >
                          Go to exam
                        </Button>,
                      ]
                    : x.status == SCHEDULE_STATUS.COMPLETED
                    ? [
                        x.resultStatus == 'Failed' ? (
                          <Text type="danger">Failed</Text>
                        ) : (
                          <Text type="success">Passed</Text>
                        ),
                      ]
                    : [<Text key={x.id}>{MAP_SCHEDULE_STATUS[x.status]}</Text>]
                }
              >
                <Row key={x.id}>
                  <Col span={24}>
                    <Title level={3}>{x.name}</Title>
                    <Text>{x.description}</Text>
                    <Statistic
                      value={`${x.questions.length} multiple choices`}
                      prefix={<QuestionCircleOutlined />}
                    />
                    <Statistic
                      value={moment(x.createdAt).locale('es').format('DD/MM/YYYY, hh:mm')}
                      prefix={<ScheduleOutlined />}
                    />
                  </Col>
                </Row>
              </ProCard>
            </Col>
          );
        })}

        <Col span={24}>
          {userExamList && pagingParams && (
            <Pagination
              pageSize={NUMBER_OF_EXAM_CARD_PER_PAGE}
              total={pagingParams.total}
              defaultCurrent={1}
              onChange={paginationChange}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            />
          )}
        </Col>
      </Row>
    </Spin>
  );
};

export default connect(mapStateToProps)(UserDashboard);
