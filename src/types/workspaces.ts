export interface WorkspaceListResponse {
  workspaces: Workspace[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}


export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_by: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  members: WorkspaceMember[];
  member_count: number;
  project_count: number;
}

export interface WorkspaceMember {
  id: string;
  user_id: string;
  workspace_id: string;
  role: "admin" | "member";
  joined_at: string; // ISO timestamp
  user: User | null;
  user_profile: UserProfile | null;
}

export interface User {
    name:string
}
export interface UserProfile {
    name:string
}
