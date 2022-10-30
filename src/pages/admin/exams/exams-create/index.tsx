import { PageContainer, ProCard } from '@ant-design/pro-components';
import React from 'react';
import ExamForm from '../form-exam';

const ExamCreationPage: React.FC = () => {
  return (
    <PageContainer>
      <ProCard>
        <ExamForm />
      </ProCard>
    </PageContainer>
  );
};

export default ExamCreationPage;
