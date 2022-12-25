import PageLayout from '@/layout/PageLayout';
import React from 'react';
import ExamForm from '../form-exam';

const ExamCreationPage: React.FC = () => {
  return (
    <PageLayout title="Create Template">
      <ExamForm />
    </PageLayout>
  );
};

export default ExamCreationPage;
