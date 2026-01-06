import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, FolderKanban, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateProjectModal } from "@/components/project/CreateProjectModal";
import { mockProjects, mockTickets } from "@/data/mockData";
import type { PaginatedProjectsResponse, Project } from "@/types/project";
import { useAuth } from "@/contexts/AuthContext";
import { useWorkProject } from "@/contexts/WorkProjectContext";
import { toast } from "sonner";

type DashboardStats ={
    total: number,
    inProgress: number,
  }

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { client } = useAuth();
  const {workspace} = useWorkProject()  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [stats,setStats] = useState<DashboardStats>({
      total: 0,
      inProgress: 0,
  })


  const fetchProjects = useCallback(async () => {
    if (!client) return;

    try {
      const response = await client.get<PaginatedProjectsResponse>(`/v1/projects`);
      if(response.data){

        const prs=response.data.projects
        
        const newStats:DashboardStats={
            total: 0,
            inProgress: 0,
        }
        prs.forEach((pr)=>{
          newStats.total += pr.task_count
          newStats.inProgress += pr.open_task_count
        })

        setStats(newStats)
        setProjects(prs)

      }else{
        toast.error(response.error.msg || 'Error fetching workspaces')
      }
    } catch (error) {
      console.error("Failed to fetch workspaces", error);
    }
  }, [client]);
  
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);    

  const handleCreateProject = (newProject: Project) => {
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's an overview of your projects.
            </p>
          </div>
          <Button variant="hero" size="sm" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Tickets
              </CardTitle>
              <FolderKanban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Progress
              </CardTitle>
              <Clock className="h-4 w-4 text-status-medium" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{stats.inProgress}</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Projects</h2>
            <Link to="/projects" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`}>
                <Card className="shadow-card hover:shadow-card-hover transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <FolderKanban className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-base font-medium mt-3 group-hover:text-primary transition-colors">
                      {project.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{project.task_count} tickets</span>
                      <span>
                        {project.open_task_count} completed
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
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
