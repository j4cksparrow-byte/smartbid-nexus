
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from 'sonner';

interface AuthFormProps {
  mode: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'client' | 'contractor'>('client');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        navigate(from);
      } else {
        await register(name, email, password, role);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
      // Error is already handled in auth context with toast
    } finally {
      setIsSubmitting(false);
    }
  };

  // Demo login shortcuts
  const handleDemoLogin = async (userType: 'client' | 'contractor' | 'admin') => {
    setIsSubmitting(true);
    try {
      let email = '';
      if (userType === 'client') email = 'client@example.com';
      else if (userType === 'contractor') email = 'contractor@example.com';
      else email = 'admin@example.com';
      
      await login(email, 'password123');
      navigate(from);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-medium animate-scale-in">
        <CardHeader>
          <CardTitle className="text-2xl">
            {mode === 'login' ? 'Welcome back' : 'Create an account'}
          </CardTitle>
          <CardDescription>
            {mode === 'login' 
              ? 'Enter your credentials to access your account' 
              : 'Fill in the information below to get started'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="transition-all duration-200"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="transition-all duration-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="transition-all duration-200"
              />
            </div>
            
            {mode === 'register' && (
              <div className="space-y-2">
                <Label>I am a:</Label>
                <RadioGroup value={role} onValueChange={(value) => setRole(value as 'client' | 'contractor')} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="client" id="client" />
                    <Label htmlFor="client" className="cursor-pointer">Client</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="contractor" id="contractor" />
                    <Label htmlFor="contractor" className="cursor-pointer">Contractor</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : mode === 'login' ? 'Sign in' : 'Create account'}
            </Button>
          </form>
          
          {mode === 'login' && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Quick access (demo)
                  </span>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-2">
                <Button 
                  variant="outline" 
                  className="text-xs" 
                  size="sm"
                  onClick={() => handleDemoLogin('client')}
                  disabled={isSubmitting}
                >
                  Demo Client
                </Button>
                <Button 
                  variant="outline" 
                  className="text-xs" 
                  size="sm"
                  onClick={() => handleDemoLogin('contractor')}
                  disabled={isSubmitting}
                >
                  Demo Contractor
                </Button>
                <Button 
                  variant="outline" 
                  className="text-xs" 
                  size="sm"
                  onClick={() => handleDemoLogin('admin')}
                  disabled={isSubmitting}
                >
                  Demo Admin
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-center text-muted-foreground">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
