import { PageContainer } from '@ant-design/pro-components';
import DetectComponent from './face-detect';

const Dashboard: React.FC = () => {

  return (
    <PageContainer>
      <DetectComponent />
    </PageContainer>
  );
};

export default Dashboard;
