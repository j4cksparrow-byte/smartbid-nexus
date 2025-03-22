
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProjectCard, { ProjectType } from '@/components/projects/ProjectCard';
import { BarChart, PieChart, Bar, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { 
  Briefcase, 
  Building, 
  Plus, 
  TrendingUp, 
  Users,
  DollarSign,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface DashboardProps {
  projects: ProjectType[];
}

const Dashboard: React.FC<DashboardProps> = ({ projects }) => {
  const { user } = useAuth();
  
  // Filter projects based on user role
  const filteredProjects = projects.filter(project => {
    if (user?.role === 'admin') return true;
    if (user?.role === 'client') return project.createdBy.id === user.id;
    // For contractors, show all open projects
    return project.status === 'open';
  });
  
  // Dashboard metrics (in a real app, these would come from an API)
  const metrics = {
    totalProjects: filteredProjects.length,
    openProjects: filteredProjects.filter(p => p.status === 'open').length,
    inProgressProjects: filteredProjects.filter(p => p.status === 'in_progress').length,
    completedProjects: filteredProjects.filter(p => p.status === 'completed').length,
    totalBids: filteredProjects.reduce((acc, project) => acc + project.bidCount, 0),
  };
  
  // Chart data
  const statusChartData = [
    { name: 'Open', value: metrics.openProjects },
    { name: 'In Progress', value: metrics.inProgressProjects },
    { name: 'Completed', value: metrics.completedProjects },
  ];
  
  const budgetChartData = [
    { name: '<$10K', value: filteredProjects.filter(p => p.budget < 10000).length },
    { name: '$10K-$50K', value: filteredProjects.filter(p => p.budget >= 10000 && p.budget < 50000).length },
    { name: '$50K-$100K', value: filteredProjects.filter(p => p.budget >= 50000 && p.budget < 100000).length },
    { name: '>$100K', value: filteredProjects.filter(p => p.budget >= 100000).length },
  ];
  
  const chartColors = ['#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8'];
  
  // AI insights (simulated for demo)
  const aiInsights = [
    {
      id: 1,
      title: "Budget Optimization",
      description: "Historical data suggests increasing your initial budget by 5-10% can attract higher quality contractors.",
      icon: <DollarSign className="h-8 w-8 text-blue-500" />,
    },
    {
      id: 2,
      title: "Timeline Analysis",
      description: "Projects under $50K typically complete 20% faster when started in spring or summer months.",
      icon: <Clock className="h-8 w-8 text-blue-500" />,
    },
    {
      id: 3,
      title: "Risk Assessment",
      description: "Three of your projects have budget overrun risk. Consider reviewing contractor qualifications.",
      icon: <AlertTriangle className="h-8 w-8 text-amber-500" />,
    }
  ];
  
  return (
    <div className="max-w-7xl mx-auto py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
        
        {user?.role === 'client' && (
          <Link to="/projects/new">
            <Button className="mt-4 md:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          </Link>
        )}
      </div>
      
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <Card className="hover:shadow-card transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Projects</p>
                <p className="text-3xl font-bold mt-1">{metrics.totalProjects}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900">
                <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-card transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Open Projects</p>
                <p className="text-3xl font-bold mt-1">{metrics.openProjects}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full dark:bg-green-900">
                <Building className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-card transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Bids</p>
                <p className="text-3xl font-bold mt-1">{metrics.totalBids}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full dark:bg-amber-900">
                <Users className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-card transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">AI Insights</p>
                <p className="text-3xl font-bold mt-1">{aiInsights.length}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Project Status Chart */}
        <Card className="col-span-1 hover:shadow-card transition-shadow">
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Distribution by current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Budget Distribution Chart */}
        <Card className="col-span-1 hover:shadow-card transition-shadow">
          <CardHeader>
            <CardTitle>Budget Distribution</CardTitle>
            <CardDescription>Projects by budget range</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={budgetChartData}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* AI Insights */}
        <Card className="col-span-1 hover:shadow-card transition-shadow">
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
            <CardDescription>Data-driven recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map(insight => (
                <div key={insight.id} className="flex items-start space-x-3 p-3 rounded-md bg-muted/50">
                  {insight.icon}
                  <div>
                    <h4 className="font-medium">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Projects */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Projects</h2>
          <Link to="/projects">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.slice(0, 3).map(project => (
            <ProjectCard key={project.id} project={project} showAiInsights={false} />
          ))}
          
          {filteredProjects.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-8 bg-muted/50 rounded-lg text-center">
              <Building className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No projects found</h3>
              <p className="text-muted-foreground mt-2">
                {user?.role === 'client' 
                  ? "You haven't created any projects yet. Get started by creating your first project."
                  : "There are no projects available at the moment. Please check back later."}
              </p>
              {user?.role === 'client' && (
                <Link to="/projects/new" className="mt-4">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Project
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
