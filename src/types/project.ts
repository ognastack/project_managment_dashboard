export type TicketStatus = "backlog" | "todo" | "in_progress" | "done";
export type TicketPriority = "low" | "medium" | "high" | "urgent";

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignee?: string;
  comments: Comment[];
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tickets: Ticket[];
  createdAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  projects: Project[];
}
