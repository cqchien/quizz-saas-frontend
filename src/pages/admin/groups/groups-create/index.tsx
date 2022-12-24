import PageLayout from '@/layout/PageLayout';
import React from 'react';
import FormUserGroup from '../components/FormUserGroup';

const GroupCreatePage: React.FC = () => {
  return (
    <PageLayout title="Create Group">
        <FormUserGroup  />
    </PageLayout>
  );
};

export default GroupCreatePage;