
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import ProjectCard from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { MOCK_PROJECTS } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { Plus, Search, SlidersHorizontal, X } from 'lucide-react';
import { ProjectType } from '@/components/projects/ProjectCard';
import { Badge } from '@/components/ui/badge';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const Projects = () => {
  const { user } = useAuth();
  
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [budgetFilter, setBudgetFilter] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>(MOCK_PROJECTS);
  const [hasFilters, setHasFilters] = useState(false);
  
  // Extract unique locations for filter
  const locations = [...new Set(MOCK_PROJECTS.map(project => project.location.split(',')[0].trim()))];
  
  // Budget ranges for filter
  const budgetRanges = [
    { value: 'under_50k', label: 'Under $50K' },
    { value: '50k_250k', label: '$50K - $250K' },
    { value: '250k_1m', label: '$250K - $1M' },
    { value: 'over_1m', label: 'Over $1M' },
  ];
  
  // Apply filters
  useEffect(() => {
    let result = [...MOCK_PROJECTS];
    
    // Search filter
    if (searchTerm) {
      result = result.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(project => project.status === statusFilter);
    }
    
    // Budget filter
    if (budgetFilter.length > 0) {
      result = result.filter(project => {
        const budget = project.budget;
        return budgetFilter.some(range => {
          if (range === 'under_50k') return budget < 50000;
          if (range === '50k_250k') return budget >= 50000 && budget < 250000;
          if (range === '250k_1m') return budget >= 250000 && budget < 1000000;
          if (range === 'over_1m') return budget >= 1000000;
          return false;
        });
      });
    }
    
    // Location filter
    if (locationFilter.length > 0) {
      result = result.filter(project => {
        const city = project.location.split(',')[0].trim();
        return locationFilter.includes(city);
      });
    }
    
    // Sort results
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy === 'budget_high') {
      result.sort((a, b) => b.budget - a.budget);
    } else if (sortBy === 'budget_low') {
      result.sort((a, b) => a.budget - b.budget);
    } else if (sortBy === 'ai_score') {
      result.sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0));
    }
    
    setFilteredProjects(result);
    
    // Check if any filters are applied
    setHasFilters(
      searchTerm !== '' || 
      statusFilter !== 'all' || 
      budgetFilter.length > 0 || 
      locationFilter.length > 0
    );
  }, [searchTerm, statusFilter, sortBy, budgetFilter, locationFilter]);
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setBudgetFilter([]);
    setLocationFilter([]);
  };
  
  // Handle budget filter change
  const handleBudgetFilterChange = (value: string) => {
    setBudgetFilter(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };
  
  // Handle location filter change
  const handleLocationFilterChange = (value: string) => {
    setLocationFilter(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };
  
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground">Browse and find construction projects</p>
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
        
        {/* Filters Bar */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2" 
                onClick={() => setSearchTerm('')}
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={sortBy} 
              onValueChange={setSortBy}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="budget_high">Budget: High to Low</SelectItem>
                <SelectItem value="budget_low">Budget: Low to High</SelectItem>
                <SelectItem value="ai_score">AI Score</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  More Filters
                  {(budgetFilter.length > 0 || locationFilter.length > 0) && (
                    <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                      {budgetFilter.length + locationFilter.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Budget Range</h4>
                  <div className="space-y-2">
                    {budgetRanges.map((range) => (
                      <div key={range.value} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`budget-${range.value}`} 
                          checked={budgetFilter.includes(range.value)}
                          onCheckedChange={() => handleBudgetFilterChange(range.value)}
                        />
                        <Label htmlFor={`budget-${range.value}`}>{range.label}</Label>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <h4 className="font-medium">Locations</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {locations.map((location) => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`location-${location}`} 
                          checked={locationFilter.includes(location)}
                          onCheckedChange={() => handleLocationFilterChange(location)}
                        />
                        <Label htmlFor={`location-${location}`}>{location}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Filter summary */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="text-sm text-muted-foreground mr-2 py-1">
              Filters:
            </div>
            
            {searchTerm && (
              <Badge variant="outline" className="flex items-center gap-1">
                Search: {searchTerm}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm('')} />
              </Badge>
            )}
            
            {statusFilter !== 'all' && (
              <Badge variant="outline" className="flex items-center gap-1">
                Status: {statusFilter.replace('_', ' ')}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setStatusFilter('all')} />
              </Badge>
            )}
            
            {budgetFilter.map((filter) => {
              const label = budgetRanges.find(r => r.value === filter)?.label;
              return (
                <Badge key={filter} variant="outline" className="flex items-center gap-1">
                  {label}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setBudgetFilter(prev => prev.filter(f => f !== filter))}
                  />
                </Badge>
              );
            })}
            
            {locationFilter.map((location) => (
              <Badge key={location} variant="outline" className="flex items-center gap-1">
                {location}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setLocationFilter(prev => prev.filter(l => l !== location))}
                />
              </Badge>
            ))}
            
            <Button 
              variant="ghost" 
              className="text-xs h-6 px-2" 
              onClick={clearFilters}
            >
              Clear all
            </Button>
          </div>
        )}
        
        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                showAiInsights
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 bg-muted/30 rounded-lg text-center">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No projects found</h3>
            <p className="text-muted-foreground mt-2 mb-6">
              No projects match your current filters. Try adjusting your search criteria.
            </p>
            <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Projects;
