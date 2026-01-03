import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Plus, ArrowLeft, MoreHorizontal } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/board/KanbanBoard";
import { TicketDetailsModal } from "@/components/board/TicketDetailsModal";
import { CreateTicketModal } from "@/components/board/CreateTicketModal";
import { mockProjects } from "@/data/mockData";
import { Ticket, TicketStatus, TicketPriority } from "@/types/project";

export default function ProjectBoard() {
  const { projectId } = useParams<{ projectId: string }>();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const project = mockProjects.find((p) => p.id === projectId) || mockProjects[0];
  const [tickets, setTickets] = useState<Ticket[]>(project.tickets);

  const handleTicketMove = (ticketId: string, newStatus: TicketStatus) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  const handleCreateTicket = (data: {
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
  }) => {
    const newTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      assignee: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
      attachments: [],
    };
    setTickets((prev) => [...prev, newTicket]);
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
                {tickets.length} tickets
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

        {/* Kanban Board */}
        <div className="flex-1 overflow-hidden">
          <KanbanBoard
            tickets={tickets}
            onTicketClick={setSelectedTicket}
            onTicketMove={handleTicketMove}
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
        />
      </div>
    </DashboardLayout>
  );
}
