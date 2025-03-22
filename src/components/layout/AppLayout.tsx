
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import { useAuth } from '../../context/AuthContext';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: string[];
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  requireAuth = false,
  allowedRoles = [],
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && requireAuth && !isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
    }

    if (!isLoading && requireAuth && isAuthenticated && allowedRoles.length > 0) {
      const hasRequiredRole = user && allowedRoles.includes(user.role);
      if (!hasRequiredRole) {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, navigate, requireAuth, allowedRoles, location.pathname, user]);

  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className={cn(
        "flex-grow pt-16",
        isHomePage ? "" : "px-4 sm:px-6 lg:px-8"
      )}>
        {isLoading && requireAuth ? (
          <div className="flex h-[80vh] items-center justify-center">
            <div className="animate-pulse text-center">
              <div className="h-8 w-8 mx-auto mb-4 rounded-full bg-primary/20"></div>
              <div className="h-4 w-32 mx-auto rounded bg-primary/20"></div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            {children}
          </div>
        )}
      </main>
    </div>
  );
};

export default AppLayout;
