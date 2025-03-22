
import { ProjectType } from '@/components/projects/ProjectCard';

// Mock projects data
export const MOCK_PROJECTS: ProjectType[] = [
  {
    id: 'project-1',
    title: 'Modern Office Building Renovation',
    description: 'Complete renovation of a 5-story office building including structural repairs, electrical upgrades, plumbing, HVAC replacement, and interior finish work. The building is approximately 30,000 sq ft and located in the downtown business district.',
    location: 'Chicago, IL',
    budget: 850000,
    deadline: '2024-09-15',
    status: 'open',
    bidCount: 6,
    createdBy: {
      id: '1',
      name: 'John Client',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    aiScore: 87,
    aiInsight: "Based on 6 similar projects, this renovation should take 4-5 months to complete. Consider allocating 15% of budget for unforeseen structural issues given the building's age.",
    createdAt: '2023-11-15T10:30:00Z'
  },
  {
    id: 'project-2',
    title: 'Residential Complex Construction',
    description: 'New construction of a 3-building residential complex with a total of 120 units, underground parking garage, swimming pool, and fitness center. The project includes landscaping and common area development.',
    location: 'Austin, TX',
    budget: 12500000,
    deadline: '2025-03-20',
    status: 'open',
    bidCount: 8,
    createdBy: {
      id: '1',
      name: 'John Client',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    aiScore: 92,
    aiInsight: "High chance of success based on contractor availability in Austin. Weather patterns suggest starting foundation work in April for optimal conditions.",
    createdAt: '2023-12-05T14:45:00Z'
  },
  {
    id: 'project-3',
    title: 'Historical Theatre Restoration',
    description: 'Careful restoration of a 1920s theatre with historical significance. Work includes facade repair, roof replacement, ornate plasterwork restoration, seating replacement, and modernization of stage equipment while preserving historical elements.',
    location: 'Boston, MA',
    budget: 3800000,
    deadline: '2024-12-10',
    status: 'in_progress',
    bidCount: 4,
    createdBy: {
      id: '1',
      name: 'John Client',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    aiScore: 78,
    aiInsight: "Historical restorations typically exceed budget by 20-30%. Consider extending timeline by 2 months to accommodate specialized craftsmanship requirements.",
    createdAt: '2023-10-22T09:15:00Z'
  },
  {
    id: 'project-4',
    title: 'Shopping Mall Food Court Remodel',
    description: 'Complete remodeling of a 15,000 sq ft food court area in an operating shopping mall. Project includes new flooring, ceiling, lighting, HVAC modifications, and construction of six new vendor spaces with utility connections.',
    location: 'Miami, FL',
    budget: 650000,
    deadline: '2024-08-01',
    status: 'completed',
    bidCount: 5,
    createdBy: {
      id: '1',
      name: 'John Client',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    aiScore: 85,
    aiInsight: "Similar mall renovations show night work requirements increase costs by approximately 12%. Phased approach recommended to maintain partial operations.",
    createdAt: '2023-09-10T11:20:00Z'
  },
  {
    id: 'project-5',
    title: 'Bridge Repair and Reinforcement',
    description: 'Structural repair and reinforcement of a two-lane concrete bridge spanning 150ft. Project includes crack repair, concrete spall repair, reinforcement of support columns, replacement of expansion joints, and resurfacing of the deck.',
    location: 'Portland, OR',
    budget: 1200000,
    deadline: '2024-07-15',
    status: 'open',
    bidCount: 3,
    createdBy: {
      id: '4',
      name: 'City of Portland',
      avatar: undefined
    },
    aiScore: 90,
    aiInsight: "Expected 15% faster completion than similar projects due to low precipitation forecast. Specialized equipment for river access is readily available in this region.",
    createdAt: '2023-11-28T16:10:00Z'
  },
  {
    id: 'project-6',
    title: 'University Science Building Addition',
    description: 'Construction of a 35,000 sq ft addition to an existing university science building. The project includes wet and dry laboratories, lecture halls, offices, and specialized HVAC and electrical systems for research equipment.',
    location: 'Raleigh, NC',
    budget: 8500000,
    deadline: '2025-01-10',
    status: 'in_progress',
    bidCount: 6,
    createdBy: {
      id: '5',
      name: 'State University',
      avatar: undefined
    },
    aiScore: 82,
    aiInsight: "Academic schedule coordination is critical. Data from similar projects suggests scheduling heavy demolition during winter and summer breaks.",
    createdAt: '2023-08-15T13:45:00Z'
  },
  {
    id: 'project-7',
    title: 'Municipal Water Treatment Plant Upgrade',
    description: 'Comprehensive upgrade of a water treatment facility serving a community of 50,000 people. Project includes replacement of filtration systems, modernization of control systems, and construction of a new chemical treatment building.',
    location: 'Denver, CO',
    budget: 4500000,
    deadline: '2024-11-30',
    status: 'open',
    bidCount: 4,
    createdBy: {
      id: '6',
      name: 'Denver Water Authority',
      avatar: undefined
    },
    aiScore: 88,
    aiInsight: "Regulatory compliance is the highest risk factor. Analysis shows allocating 8% of budget for testing and certification is optimal.",
    createdAt: '2023-12-20T10:10:00Z'
  },
  {
    id: 'project-8',
    title: 'Luxury Hotel Spa Addition',
    description: 'Construction of a 12,000 sq ft spa addition to an existing luxury hotel. The project includes indoor pool, treatment rooms, sauna and steam rooms, relaxation spaces, and associated mechanical systems.',
    location: 'Scottsdale, AZ',
    budget: 3200000,
    deadline: '2024-10-15',
    status: 'open',
    bidCount: 7,
    createdBy: {
      id: '1',
      name: 'John Client',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    aiScore: 91,
    aiInsight: "Luxury hospitality projects benefit from clear milestone scheduling. Recommend weekly progress meetings with all stakeholders to maintain quality standards.",
    createdAt: '2023-10-05T15:30:00Z'
  }
];
