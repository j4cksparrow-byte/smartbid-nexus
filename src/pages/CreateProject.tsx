
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import ProjectForm from '@/components/projects/ProjectForm';

const CreateProject = () => {
  return (
    <AppLayout requireAuth allowedRoles={['client', 'admin']}>
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Create New Project</h1>
        <ProjectForm />
      </div>
    </AppLayout>
  );
};

export default CreateProject;
