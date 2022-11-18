import { PageContainer } from '@ant-design/pro-components';
import InstructorDashboard from './dashboard-instructor';
import UserDashboard from './dashboard-user';
import DetectComponent from './face-detect';

const Dashboard: React.FC = () => {
  return (
    <PageContainer>
      <InstructorDashboard />
      <UserDashboard />
      <DetectComponent />
    </PageContainer>
  );
};

export default Dashboard;
