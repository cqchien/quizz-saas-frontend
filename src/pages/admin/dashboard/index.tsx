import { PageContainer } from '@ant-design/pro-components';
import InstructorDashboard from './dashboard-instructor';
import UserDashboard from './dashboard-user';

const Dashboard: React.FC = () => {
  // const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
  //   video: true,
  // });

  // const handleSubmitExam = async () => {
  //   stopRecording();
  //   const mediaBlob = await fetch(mediaBlobUrl as string).then((response) => response.blob());
  //   const url = window.URL.createObjectURL(mediaBlob);
  //   const tempLink = document.createElement('a');
  //   tempLink.href = url;
  //   tempLink.setAttribute('download', 'currentVideo.mp4');
  //   tempLink.click();
  // };

  return (
    <PageContainer>
      <InstructorDashboard />
      <UserDashboard />
      {/* <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={handleSubmitExam}>Submit</button>
      <video src={mediaBlobUrl} controls autoPlay loop /> */}
    </PageContainer>
  );
};

export default Dashboard;
