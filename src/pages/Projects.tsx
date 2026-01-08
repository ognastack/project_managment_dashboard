import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Plus, FolderKanban, Search } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateProjectModal } from "@/components/project/CreateProjectModal";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useWorkProject } from "@/contexts/WorkProjectContext";

import type { Project,PaginatedProjectsResponse } from "@/types/project";

export default function Projects() {
  const { client } = useAuth();
  const {workspace} = useWorkProject()
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateProject = (newProject: Project) => {
    setProjects((prev) => [...prev, newProject]);
  };

  const fetchProjects = useCallback(async () => {
    if (!client) return;

    try {
      const response = await client.get<PaginatedProjectsResponse>(`/v1/projects?workspace_id=${workspace.id}`);
      if(response.data){
        setProjects(response.data.projects)
      }else{
        toast.error(response.error.msg || 'Error fetching workspaces')
      }
    } catch (error) {
      console.error("Failed to fetch workspaces", error);
    }
  }, [client,workspace]);
  
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);  

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Projects</h1>
            <p className="text-muted-foreground mt-1">
              Manage and organize your team's projects
            </p>
          </div>
          <Button variant="hero" size="sm" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10 h-10"
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`}>
              <Card className="shadow-card hover:shadow-card-hover transition-all cursor-pointer group h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <FolderKanban className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-lg font-medium mt-4 group-hover:text-primary transition-colors">
                    {project.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-muted-foreground">
                        {project.task_count}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-status-low" />
                      <span className="text-muted-foreground">
                        {project.open_task_count}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* Empty state / Add new */}
          <Card 
            className="shadow-card border-dashed hover:border-primary/50 transition-colors cursor-pointer group h-full flex items-center justify-center min-h-[200px]"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors mb-4">
                <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Create new project
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <CreateProjectModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onCreateProject={handleCreateProject}
      />
    </DashboardLayout>
  );
}
