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

export interface Task {
  id: string;
  project_id: string;

  title: string;
  description: string;

  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";

  due_date: string | null;

  task_number: number;

  created_by: string;
  created_at: string;
  updated_at: string;

  assignees: string[];
}

export interface TasksListResponse {
  tasks: Task[];
}


export type Project = {
  id: string;
  workspace_id: string;

  name: string;
  description: string;
  key: string;

  color: string | null;

  is_archived: boolean;

  created_at: string;
  updated_at: string;

  task_count: number | null;
  open_task_count: number | null;
};

export type PaginatedProjectsResponse = {
  projects: Project[];

  total: number;
  page: number;
  page_size: number;
  total_pages: number;
};


