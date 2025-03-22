
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import DashboardComponent from '@/components/dashboard/Dashboard';
import { MOCK_PROJECTS } from '@/data/mockData';

const DashboardPage = () => {
  return (
    <AppLayout requireAuth>
      <DashboardComponent projects={MOCK_PROJECTS} />
    </AppLayout>
  );
};

export default DashboardPage;
