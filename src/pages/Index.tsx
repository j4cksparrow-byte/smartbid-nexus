
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import ProjectCard from '@/components/projects/ProjectCard';
import { MOCK_PROJECTS } from '@/data/mockData';
import { Building, TrendingUp, Users, Briefcase, ChevronRight, CheckCircle } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const featuredProjects = MOCK_PROJECTS.filter(p => p.status === 'open').slice(0, 3);
  
  // Refs for animation sections
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    [heroRef, featuresRef, projectsRef, testimonialsRef].forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-24 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900"
        ref={heroRef}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
                AI-Powered Smart Construction Bidding
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Connect with the perfect contractors for your construction projects with our AI-driven marketplace. Get data-backed insights, accurate cost estimations, and risk assessments.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <Button size="lg" className="group">
                  {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button size="lg" variant="outline">
                  Browse Projects
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-soft">
                <div className="text-blue-600 dark:text-blue-400 mb-2">
                  <Building className="h-8 w-8 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold">500+</h3>
                <p className="text-gray-600 dark:text-gray-400">Projects Completed</p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-soft">
                <div className="text-blue-600 dark:text-blue-400 mb-2">
                  <Users className="h-8 w-8 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold">1,200+</h3>
                <p className="text-gray-600 dark:text-gray-400">Verified Contractors</p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-soft">
                <div className="text-blue-600 dark:text-blue-400 mb-2">
                  <TrendingUp className="h-8 w-8 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold">30%</h3>
                <p className="text-gray-600 dark:text-gray-400">Average Cost Savings</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent dark:from-gray-900 z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent dark:from-gray-900 z-10"></div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-gray-900" ref={featuresRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">How SmartBid Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Our AI-powered platform simplifies the construction bidding process from start to finish.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-6 transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Post Your Project</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Specify your project details, budget, and timeline requirements. Our AI will help you refine your listing.
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-6 transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Receive AI-Analyzed Bids</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Contractors submit their proposals, and our AI analyzes each bid, highlighting strengths and potential risks.
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-6 transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Select & Manage</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose the right contractor based on AI recommendations and manage your project with our intelligent tools.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800" ref={projectsRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Browse some of our current open projects seeking qualified contractors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/projects">
              <Button size="lg" variant="outline">
                View All Projects
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900" ref={testimonialsRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Hear from clients and contractors who've experienced the SmartBid difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-8 shadow-soft">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="Sarah D."
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    "The AI insights saved us from what could have been a major budget overrun. We found a contractor who delivered exactly what we needed, on time and within budget."
                  </p>
                  <div className="font-medium">Sarah D.</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Property Developer</div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-8 shadow-soft">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="Michael R."
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    "As a contractor, SmartBid has transformed how I find new business. The platform's analytics help me create more competitive and attractive bids."
                  </p>
                  <div className="font-medium">Michael R.</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">General Contractor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Transform Your Construction Projects?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of clients and contractors using AI to build better, faster, and smarter.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <Button size="lg" variant="default" className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700">
                  {isAuthenticated ? "Go to Dashboard" : "Sign Up Now"}
                </Button>
              </Link>
              <Link to="/projects">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Browse Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature List */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose SmartBid</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Our platform offers unique advantages for construction projects of all sizes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <CheckCircle className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">AI-Powered Recommendations</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get intelligent contractor suggestions based on project requirements, past performance, and compatibility.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <CheckCircle className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Cost Estimation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Leverage historical data to accurately estimate project costs before receiving bids.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <CheckCircle className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Risk Assessment</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Identify potential project risks early with our predictive analytics system.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <CheckCircle className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Verified Contractors</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All contractors undergo thorough verification of credentials, insurance, and past work quality.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <CheckCircle className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Project Management Tools</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Track progress, manage communications, and handle documentation all in one place.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <CheckCircle className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Data Security</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Enterprise-grade security ensures your project details and communications remain confidential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-transparent bg-clip-text mb-4">
                SmartBid
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                Revolutionizing construction bidding with artificial intelligence and data-driven insights.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Platform</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">How it works</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Features</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Pricing</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">FAQ</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">About us</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Careers</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Blog</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Cookies Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              © {new Date().getFullYear()} SmartBid. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
