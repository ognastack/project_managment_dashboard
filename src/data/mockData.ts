import { Project, Ticket } from "@/types/project";

export const mockTickets: Ticket[] = [
  {
    id: "TKT-001",
    title: "Implement user authentication",
    description:
      "Add login and signup functionality using OAuth2. Include social login options for Google and GitHub.",
    status: "done",
    priority: "high",
    assignee: "John Doe",
    comments: [
      {
        id: "c1",
        author: "Jane Smith",
        content: "We should also consider adding 2FA in a future iteration.",
        createdAt: "2024-01-15T10:30:00Z",
      },
    ],
    attachments: [
      {
        id: "a1",
        name: "auth-flow.pdf",
        url: "#",
        size: "2.4 MB",
        type: "pdf",
      },
    ],
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-18T14:00:00Z",
  },
  {
    id: "TKT-002",
    title: "Design dashboard layout",
    description:
      "Create a responsive dashboard layout with sidebar navigation and main content area.",
    status: "in_progress",
    priority: "medium",
    assignee: "Sarah Wilson",
    comments: [],
    attachments: [],
    createdAt: "2024-01-12T11:00:00Z",
    updatedAt: "2024-01-16T09:00:00Z",
  },
  {
    id: "TKT-003",
    title: "Set up CI/CD pipeline",
    description:
      "Configure GitHub Actions for automated testing and deployment to staging environment.",
    status: "in_progress",
    priority: "high",
    assignee: "Mike Johnson",
    comments: [
      {
        id: "c2",
        author: "John Doe",
        content: "Let's also add code coverage reports.",
        createdAt: "2024-01-14T15:00:00Z",
      },
    ],
    attachments: [],
    createdAt: "2024-01-11T08:00:00Z",
    updatedAt: "2024-01-15T16:00:00Z",
  },
  {
    id: "TKT-004",
    title: "Integrate payment gateway",
    description:
      "Add Stripe integration for subscription billing. Support multiple currencies.",
    status: "todo",
    priority: "urgent",
    assignee: "John Doe",
    comments: [],
    attachments: [
      {
        id: "a2",
        name: "stripe-docs.pdf",
        url: "#",
        size: "1.2 MB",
        type: "pdf",
      },
    ],
    createdAt: "2024-01-13T14:00:00Z",
    updatedAt: "2024-01-13T14:00:00Z",
  },
  {
    id: "TKT-005",
    title: "Write API documentation",
    description:
      "Document all REST API endpoints using OpenAPI specification.",
    status: "backlog",
    priority: "low",
    comments: [],
    attachments: [],
    createdAt: "2024-01-14T10:00:00Z",
    updatedAt: "2024-01-14T10:00:00Z",
  },
  {
    id: "TKT-006",
    title: "Add dark mode support",
    description: "Implement system-wide dark mode with user preference toggle.",
    status: "backlog",
    priority: "medium",
    comments: [],
    attachments: [],
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "TKT-007",
    title: "Performance optimization",
    description:
      "Optimize bundle size and implement lazy loading for better initial load time.",
    status: "todo",
    priority: "medium",
    assignee: "Sarah Wilson",
    comments: [],
    attachments: [],
    createdAt: "2024-01-16T11:00:00Z",
    updatedAt: "2024-01-16T11:00:00Z",
  },
  {
    id: "TKT-008",
    title: "Mobile responsive design",
    description:
      "Ensure all pages work correctly on mobile devices and tablets.",
    status: "todo",
    priority: "high",
    comments: [],
    attachments: [],
    createdAt: "2024-01-17T08:00:00Z",
    updatedAt: "2024-01-17T08:00:00Z",
  },
];

export const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "TeamFlow App",
    description: "Main project management application",
    tickets: mockTickets,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "proj-2",
    name: "Marketing Website",
    description: "Company marketing and landing pages",
    tickets: mockTickets.slice(0, 4),
    createdAt: "2024-01-05T00:00:00Z",
  },
  {
    id: "proj-3",
    name: "Mobile App",
    description: "iOS and Android mobile application",
    tickets: mockTickets.slice(2, 6),
    createdAt: "2024-01-08T00:00:00Z",
  },
];
