
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { ProjectType } from '@/components/projects/ProjectCard';

interface BidFormProps {
  projectId: string;
  onSuccess: () => void;
  project: ProjectType;
}

const BidForm: React.FC<BidFormProps> = ({ projectId, onSuccess, project }) => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    amount: '',
    duration: '',
    proposal: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to submit a bid');
      return;
    }
    
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.amount || !formData.duration || !formData.proposal) {
      toast.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Calculate AI score for the bid
      const bidAmount = parseFloat(formData.amount);
      const projectBudget = project.budget;
      
      // Simple AI score calculation for demo purposes
      let aiScore = 85; // Base score
      
      // Adjust score based on bid amount vs budget
      const budgetRatio = bidAmount / projectBudget;
      if (budgetRatio <= 0.8) aiScore += 10; // Much under budget
      else if (budgetRatio <= 0.95) aiScore += 5; // Slightly under budget
      else if (budgetRatio > 1.1) aiScore -= 15; // Over budget
      
      // Ensure score is within 0-100 range
      aiScore = Math.max(0, Math.min(100, aiScore));
      
      // Mock AI analysis
      let aiAnalysis = "";
      
      if (aiScore >= 90) {
        aiAnalysis = "Excellent bid! The price is competitive and the proposed timeline is reasonable.";
      } else if (aiScore >= 75) {
        aiAnalysis = "Good bid with a fair price. Consider optimizing the timeline for better results.";
      } else if (aiScore >= 60) {
        aiAnalysis = "Average bid. The price is somewhat high for this type of project based on historical data.";
      } else {
        aiAnalysis = "This bid may be challenging to fulfill within the specified parameters. Consider revising your proposal.";
      }
      
      // Update project's bid count (in a real app, this would be done via API)
      project.bidCount += 1;
      
      toast.success('Bid submitted successfully!');
      
      // Show AI analysis toast
      setTimeout(() => {
        toast('AI Analysis', {
          description: aiAnalysis,
          icon: '🤖',
          duration: 5000,
        });
      }, 1000);
      
      onSuccess();
    } catch (error) {
      console.error('Error submitting bid:', error);
      toast.error('Failed to submit bid. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Format currency for display
  const formatCurrency = (value: string) => {
    if (!value) return '';
    const number = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };
  
  // AI estimate range (10% below to 10% above budget)
  const aiEstimateLow = formatCurrency((project.budget * 0.9).toString());
  const aiEstimateHigh = formatCurrency((project.budget * 1.1).toString());
  
  return (
    <Card className="w-full shadow-medium animate-scale-in">
      <CardHeader>
        <CardTitle>Submit Your Bid</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md mb-4">
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">AI Estimate</p>
            <p className="text-sm text-blue-600 dark:text-blue-200">Recommended bid range: {aiEstimateLow} - {aiEstimateHigh}</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Bid Amount (USD)</Label>
            <Input
              id="amount"
              name="amount"
              placeholder="e.g., 45000"
              value={formData.amount}
              onChange={handleChange}
              required
              type="number"
              min="0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Estimated Duration (days)</Label>
            <Input
              id="duration"
              name="duration"
              placeholder="e.g., 30"
              value={formData.duration}
              onChange={handleChange}
              required
              type="number"
              min="1"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="proposal">Your Proposal</Label>
            <Textarea
              id="proposal"
              name="proposal"
              placeholder="Describe your approach, experience with similar projects, and why you should be selected..."
              value={formData.proposal}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline"
            onClick={onSuccess}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </div>
            ) : 'Submit Bid'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BidForm;
