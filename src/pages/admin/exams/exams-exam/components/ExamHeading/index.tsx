import { HeartOutlined, SaveOutlined, SendOutlined, FlagOutlined } from '@ant-design/icons';
import { Card, Space, Row, Button, Typography } from 'antd';

const { Title } = Typography;

function ExamHeading() {
  return (
    <Card className="exam-heading">
      <Space align="center" direction="vertical" style={{ display: 'flex' }}>
        <Title level={2}>
          Đề thi Trắc nghiệm THPT Quốc Gia Môn Toán học Năm 2019 - Mã đề thi 101
        </Title>
        <Title level={4}>KỲ THI TRUNG HỌC PHỔ THÔNG QUỐC GIA NĂM 2019</Title>
        <Title level={5}>Bài thi: TOÁN</Title>
        <Title level={5}>Thời gian làm bài: 90 phút, không kể thời gian phát đề</Title>
      </Space>

      <Row justify="space-between">
        <Space>
          <Button icon={<HeartOutlined />}>Love</Button>
          <Button icon={<SaveOutlined />}>Save</Button>
          <Button icon={<SendOutlined />}>Share</Button>
        </Space>
        <Button icon={<FlagOutlined />} danger>
          Report
        </Button>
      </Row>
    </Card>
  );
}

export default ExamHeading;
