import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { Plus, ArrowLeft, MoreHorizontal } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/board/KanbanBoard";
import { TicketDetailsModal } from "@/components/board/TicketDetailsModal";
import { CreateTicketModal } from "@/components/board/CreateTicketModal";
import { mockProjects } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Task, TicketStatus, TicketPriority,TasksListResponse } from "@/types/project";
import { title } from "process";

export default function ProjectBoard() {
  const { projectId } = useParams<{ projectId: string }>();

  const { client } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState<Task | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [defaultTicketStatus, setDefaultTicketStatus] = useState<TicketStatus>("backlog");
  
  const project = mockProjects.find((p) => p.id === projectId) || mockProjects[0];
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTicketMove = (ticketId: string, newStatus: TicketStatus) => {
    
  };

  const fatchTasks = useCallback(async () => {
    if (!client) return;

    if(projectId){
    try {
      const response = await client.get<TasksListResponse>(`/v1/tasks?project_id=${projectId}`);
      if(response.data){
        setTasks(response.data.tasks)
      }else{
        toast.error(response.error.msg || 'Error fetching workspaces')
      }
    } catch (error) {
      console.error("Failed to fetch workspaces", error);
    }
    }else{
      toast.error('Please select a project')
    }

  }, [client,projectId]);
  
  useEffect(() => {
    fatchTasks();
  }, [fatchTasks]);   

  const handleCreateTicket = async (data: {
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
  }) => {
    const response = await client.post('/v1/tasks',{
            project_id: projectId,
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
        })
    
    if(response.data){
      console.log(response.data)
    }else(
      toast.error(response.error.msg || 'SOmethign went wrong creating task')
    )

  };

  const handleAddTicketFromColumn = (status: TicketStatus) => {
    setDefaultTicketStatus(status);
    setIsCreateModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-background">
          <div className="flex items-center gap-4">
            <Link to="/projects">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {project.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                tickets
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="hero" size="sm" onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4" />
              New Ticket
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <KanbanBoard
            tickets={tasks}
            onTicketClick={setSelectedTicket}
            onTicketMove={handleTicketMove}
            onAddTicket={handleAddTicketFromColumn}
          />
        </div>

        {/* Ticket Details Modal */}
        <TicketDetailsModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />

        {/* Create Ticket Modal */}
        <CreateTicketModal
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateTicket}
          defaultStatus={defaultTicketStatus}
        />
      </div>
    </DashboardLayout>
  );
}
