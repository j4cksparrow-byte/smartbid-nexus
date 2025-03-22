
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';

export interface ProjectType {
  id: string;
  title: string;
  description: string;
  location: string;
  budget: number;
  deadline: string;
  status: 'open' | 'in_progress' | 'completed';
  bidCount: number;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  aiScore?: number;
  aiInsight?: string;
  createdAt: string;
}

interface ProjectCardProps {
  project: ProjectType;
  showActions?: boolean;
  showAiInsights?: boolean;
  variant?: 'default' | 'compact';
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  showActions = true,
  showAiInsights = false,
  variant = 'default'
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const getStatusColor = (status: string) => {
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
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Open for Bids';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-card group",
      variant === 'compact' ? 'h-full' : ''
    )}>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <Badge className={cn(
            "uppercase text-xs font-medium rounded-full",
            getStatusColor(project.status)
          )}>
            {getStatusText(project.status)}
          </Badge>
          
          {project.aiScore !== undefined && (
            <div className="flex items-center space-x-1 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
              <TrendingUp className="h-3 w-3" />
              <span>AI Score: {project.aiScore}%</span>
            </div>
          )}
        </div>
        
        <CardTitle className="mt-2 group-hover:text-primary transition-colors">
          <Link to={`/projects/${project.id}`}>
            {project.title}
          </Link>
        </CardTitle>
        
        {variant === 'default' && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {project.description}
          </p>
        )}
      </CardHeader>
      
      <CardContent className={cn(
        "px-4",
        variant === 'compact' ? 'py-2' : 'py-4'
      )}>
        <div className={cn(
          "grid gap-3",
          variant === 'compact' ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'
        )}>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{formatCurrency(project.budget)}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{project.location}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Due {formatDate(project.deadline)}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{project.bidCount} bids</span>
          </div>
        </div>
        
        {showAiInsights && project.aiInsight && (
          <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm">
            <div className="font-medium text-blue-700 dark:text-blue-300 flex items-center mb-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              AI Insight
            </div>
            <p className="text-blue-700 dark:text-blue-200 text-xs">{project.aiInsight}</p>
          </div>
        )}
      </CardContent>
      
      {showActions && (
        <CardFooter className="px-4 py-3 bg-muted/30 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src={project.createdBy.avatar} />
              <AvatarFallback>{project.createdBy.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-xs text-muted-foreground">
              Posted by <span className="font-medium text-foreground">{project.createdBy.name}</span>
            </div>
          </div>
          
          <Link to={`/projects/${project.id}`}>
            <Button size="sm" variant="secondary">
              {project.status === 'open' ? 'Place Bid' : 'View Details'}
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProjectCard;
