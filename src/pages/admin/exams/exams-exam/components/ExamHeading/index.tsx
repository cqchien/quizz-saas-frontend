import { Col, Row, Space, Typography } from 'antd';

const { Title } = Typography;

interface Props {
  templateExam: API.TemplateExam | undefined;
  time: number | undefined;
}

const ExamHeading: React.FC<Props> = ({ templateExam, time }) => {
  return (
    <Row style={{ backgroundColor: '#003a8c', border: 0 }}>
      <Col span={12} offset={6}>
        <Space align="center" direction="vertical" style={{ display: 'flex' }}>
          <Title level={4} style={{ color: '#ffffff' }}>
            {templateExam?.description?.toUpperCase()}
          </Title>
          <Title level={5} style={{ color: '#ffffff' }}>
            {templateExam?.name}
          </Title>
          <Title level={5} style={{ color: '#ffffff' }}>
            Time: {time} minutes
          </Title>
        </Space>
      </Col>
      {/* <Row justify="space-between">
        <Space>
          <Button icon={<HeartOutlined />}>
            <Text strong>Love</Text>
          </Button>
          <Button icon={<SaveOutlined />}>
            <Text strong>Save</Text>
          </Button>
          <Button icon={<SendOutlined />}>
            <Text strong>Share</Text>
          </Button>
        </Space>
        <Button icon={<FlagOutlined />} danger>
          <Text strong>Report</Text>
        </Button>
      </Row> */}
    </Row>
  );
};

export default ExamHeading;
