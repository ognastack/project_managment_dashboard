import { Ticket, TicketStatus } from "@/types/project";
import { KanbanColumn } from "./KanbanColumn";

const columns: { id: TicketStatus; title: string; colorClass: string }[] = [
  { id: "backlog", title: "Backlog", colorClass: "bg-kanban-backlog" },
  { id: "todo", title: "Todo", colorClass: "bg-kanban-todo" },
  { id: "in_progress", title: "In Progress", colorClass: "bg-kanban-progress" },
  { id: "done", title: "Done", colorClass: "bg-kanban-done" },
];

interface KanbanBoardProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

export function KanbanBoard({ tickets, onTicketClick }: KanbanBoardProps) {
  const getTicketsByStatus = (status: TicketStatus) =>
    tickets.filter((ticket) => ticket.status === status);

  return (
    <div className="flex h-full gap-4 p-6 overflow-x-auto">
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          title={column.title}
          colorClass={column.colorClass}
          tickets={getTicketsByStatus(column.id)}
          onTicketClick={onTicketClick}
        />
      ))}
    </div>
  );
}
