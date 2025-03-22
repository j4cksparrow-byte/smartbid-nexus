
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import AppLayout from '@/components/layout/AppLayout';

const Login = () => {
  return (
    <AppLayout>
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12">
        <AuthForm mode="login" />
      </div>
    </AppLayout>
  );
};

export default Login;
