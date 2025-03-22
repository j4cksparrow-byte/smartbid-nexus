
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_PROJECTS } from '@/data/mockData';
import AppLayout from '@/components/layout/AppLayout';
import BidForm from '@/components/bidding/BidForm';
import { ProjectType } from '@/components/projects/ProjectCard';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Building, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Clock,
  Users,
  ArrowLeft,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  X,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

type ProjectParams = {
  id: string;
};

const ProjectDetail = () => {
  const { id } = useParams<ProjectParams>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // State
  const [project, setProject] = useState<ProjectType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBidForm, setShowBidForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the project
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      const foundProject = MOCK_PROJECTS.find(p => p.id === id);
      setProject(foundProject || null);
      setLoading(false);
    }, 500);
  }, [id]);
  
  // Handle 404
  if (!loading && !project) {
    return (
      <AppLayout>
        <div className="max-w-3xl mx-auto py-12 px-4 text-center">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/projects">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </AppLayout>
    );
  }
  
  // Format currency
  const formatCurrency = (value?: number) => {
    if (value === undefined) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Get time remaining
  const getTimeRemaining = (deadline?: string) => {
    if (!deadline) return '';
    
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - now.getTime();
    
    // If deadline has passed
    if (timeDiff <= 0) {
      return 'Deadline passed';
    }
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return 'Due today';
    } else if (days === 1) {
      return '1 day remaining';
    } else {
      return `${days} days remaining`;
    }
  };
  
  // Get status color
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get status text
  const getStatusText = (status?: string) => {
    switch (status) {
      case 'open':
        return 'Open for Bids';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status || '';
    }
  };
  
  // AI insight details (for demo)
  const aiInsightDetails = [
    {
      title: 'Success Prediction',
      value: project?.aiScore || 0,
      description: 'Based on similar projects in the same location, this project has a high likelihood of successful completion.',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      color: 'green'
    },
    {
      title: 'Budget Risk',
      value: 15,
      description: 'Historical data suggests a 15% chance of budget overrun for this type of project.',
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      color: 'amber'
    },
    {
      title: 'Timeline Risk',
      value: 25,
      description: 'Similar projects in this location experienced an average of 25% time extension beyond initial deadline.',
      icon: <Clock className="h-5 w-5 text-red-500" />,
      color: 'red'
    },
    {
      title: 'Contractor Availability',
      value: 87,
      description: 'There are many qualified contractors available for this type of project in this area.',
      icon: <Users className="h-5 w-5 text-blue-500" />,
      color: 'blue'
    }
  ];
  
  // Mock bids for demo
  const mockBids = [
    {
      id: 'bid-1',
      contractor: {
        id: 'contractor-1',
        name: 'ABC Construction',
        rating: 4.8,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      amount: project?.budget ? project.budget * 0.95 : 0,
      duration: '45 days',
      aiScore: 92,
      submittedAt: '2023-12-15T10:30:00Z'
    },
    {
      id: 'bid-2',
      contractor: {
        id: 'contractor-2',
        name: 'Reliable Builders',
        rating: 4.6,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      amount: project?.budget ? project.budget * 1.05 : 0,
      duration: '38 days',
      aiScore: 88,
      submittedAt: '2023-12-14T14:45:00Z'
    },
    {
      id: 'bid-3',
      contractor: {
        id: 'contractor-3',
        name: 'Premier Construction',
        rating: 4.2,
        avatar: undefined
      },
      amount: project?.budget ? project.budget * 0.9 : 0,
      duration: '60 days',
      aiScore: 76,
      submittedAt: '2023-12-13T09:15:00Z'
    }
  ];
  
  // Handle bid form toggle
  const toggleBidForm = () => {
    if (user?.role !== 'contractor') {
      toast.error('Only contractors can place bids');
      return;
    }
    
    setShowBidForm(!showBidForm);
  };
  
  // Get AI score color
  const getAiScoreColor = (score?: number) => {
    if (score === undefined) return 'text-gray-500';
    if (score >= 90) return 'text-green-500';
    if (score >= 75) return 'text-blue-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };
  
  return (
    <AppLayout>
      {loading ? (
        <div className="max-w-5xl mx-auto py-12 px-4 animate-pulse">
          <div className="h-8 w-64 bg-muted rounded mb-4"></div>
          <div className="h-4 w-32 bg-muted rounded mb-8"></div>
          <div className="h-64 bg-muted rounded-lg mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-32 bg-muted rounded-lg"></div>
            <div className="h-32 bg-muted rounded-lg"></div>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto py-8 px-4 animate-fade-in">
          {/* Back Button */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </div>
          
          {/* Project Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getStatusColor(project?.status)}>
                    {getStatusText(project?.status)}
                  </Badge>
                  
                  {project?.aiScore !== undefined && (
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className={`h-4 w-4 ${getAiScoreColor(project.aiScore)}`} />
                      <span className={`font-medium ${getAiScoreColor(project.aiScore)}`}>
                        AI Score: {project.aiScore}%
                      </span>
                    </div>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold">{project?.title}</h1>
              </div>
              
              {project?.status === 'open' && user?.role === 'contractor' && (
                <Button 
                  onClick={toggleBidForm}
                  disabled={showBidForm}
                >
                  {showBidForm ? 'Cancel Bid' : 'Place Bid'}
                </Button>
              )}
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Posted by</span>
              <div className="flex items-center space-x-1">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={project?.createdBy.avatar} />
                  <AvatarFallback>{project?.createdBy.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{project?.createdBy.name}</span>
              </div>
              <span>•</span>
              <span>{formatDate(project?.createdAt)}</span>
            </div>
          </div>
          
          {/* Project Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {showBidForm && project ? (
                <BidForm 
                  projectId={project.id} 
                  onSuccess={() => setShowBidForm(false)}
                  project={project}
                />
              ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="bids" disabled={project?.bidCount === 0}>
                      Bids ({project?.bidCount})
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview">
                    <Card>
                      <CardHeader>
                        <CardTitle>Project Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="bg-muted/50 p-4 rounded-lg space-y-1 text-sm">
                          <p className="font-medium">Description</p>
                          <p className="whitespace-pre-line">{project?.description}</p>
                        </div>
                        
                        {project?.aiInsight && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg space-y-1">
                            <div className="flex items-center space-x-2 font-medium text-blue-700 dark:text-blue-300">
                              <TrendingUp className="h-4 w-4" />
                              <p>AI Insight</p>
                            </div>
                            <p className="text-blue-700 dark:text-blue-200 text-sm">{project.aiInsight}</p>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {aiInsightDetails.map((insight, index) => (
                            <Card key={index} className="hover:shadow-card transition-shadow">
                              <CardContent className="pt-6">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    {insight.icon}
                                    <h3 className="font-medium">{insight.title}</h3>
                                  </div>
                                  <span className={`font-bold text-${insight.color}-500`}>
                                    {insight.value}%
                                  </span>
                                </div>
                                <Progress 
                                  value={insight.value} 
                                  className={`h-2 ${insight.color === 'green' ? 'bg-green-100 dark:bg-green-900' : 
                                    insight.color === 'amber' ? 'bg-amber-100 dark:bg-amber-900' : 
                                    insight.color === 'red' ? 'bg-red-100 dark:bg-red-900' : 
                                    'bg-blue-100 dark:bg-blue-900'}`}
                                />
                                <p className="text-sm text-muted-foreground mt-2">
                                  {insight.description}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="bids">
                    <Card>
                      <CardHeader>
                        <CardTitle>Submitted Bids</CardTitle>
                        <CardDescription>
                          Review contractor proposals for this project
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {mockBids.map((bid) => (
                            <Card key={bid.id} className="hover:shadow-card transition-shadow">
                              <CardContent className="pt-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                  <div className="flex items-center space-x-3">
                                    <Avatar>
                                      <AvatarImage src={bid.contractor.avatar} />
                                      <AvatarFallback>{bid.contractor.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{bid.contractor.name}</div>
                                      <div className="text-sm text-muted-foreground flex items-center">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                          <span key={i} className={`text-amber-400 ${i < Math.floor(bid.contractor.rating) ? 'opacity-100' : 'opacity-30'}`}>★</span>
                                        ))}
                                        <span className="ml-1">{bid.contractor.rating.toFixed(1)}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                    <TrendingUp className={`h-4 w-4 ${getAiScoreColor(bid.aiScore)}`} />
                                    <span className={`text-sm font-medium ${getAiScoreColor(bid.aiScore)}`}>
                                      AI Score: {bid.aiScore}%
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="bg-muted/50 p-3 rounded-md">
                                    <div className="text-sm text-muted-foreground">Bid Amount</div>
                                    <div className="font-medium">{formatCurrency(bid.amount)}</div>
                                  </div>
                                  
                                  <div className="bg-muted/50 p-3 rounded-md">
                                    <div className="text-sm text-muted-foreground">Estimated Duration</div>
                                    <div className="font-medium">{bid.duration}</div>
                                  </div>
                                </div>
                                
                                <div className="text-sm text-muted-foreground">
                                  Submitted {formatDate(bid.submittedAt)}
                                </div>
                              </CardContent>
                              <CardFooter className="border-t bg-muted/20 flex justify-end">
                                <Button variant="outline" size="sm">View Details</Button>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="hover:shadow-card transition-shadow">
                <CardHeader>
                  <CardTitle>Project Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Budget</p>
                      <p className="font-medium">{formatCurrency(project?.budget)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{project?.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Deadline</p>
                      <p className="font-medium">{formatDate(project?.deadline)}</p>
                      <p className="text-xs text-muted-foreground">{getTimeRemaining(project?.deadline)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium">Commercial Construction</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bids</p>
                      <p className="font-medium">{project?.bidCount} submitted</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-card transition-shadow">
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Project Specifications
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Floor Plans
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Material Requirements
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-card transition-shadow">
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="default" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Contact Client
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Request Timeline Extension
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default ProjectDetail;
