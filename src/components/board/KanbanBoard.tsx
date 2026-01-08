import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Task, TicketStatus } from "@/types/project";
import { KanbanColumn } from "./KanbanColumn";

const columns: { id: TicketStatus; title: string; colorClass: string }[] = [
  { id: "backlog", title: "Backlog", colorClass: "bg-kanban-backlog" },
  { id: "todo", title: "Todo", colorClass: "bg-kanban-todo" },
  { id: "in_progress", title: "In Progress", colorClass: "bg-kanban-progress" },
  { id: "done", title: "Done", colorClass: "bg-kanban-done" },
];

interface KanbanBoardProps {
  tickets: Task[];
  onTicketClick: (ticket: Task) => void;
  onTicketMove?: (ticketId: string, newStatus: TicketStatus) => void;
  onAddTicket?: (status: TicketStatus) => void;
}

export function KanbanBoard({ tickets, onTicketClick, onTicketMove, onAddTicket }: KanbanBoardProps) {
  const getTicketsByStatus = (status: TicketStatus) =>
    tickets.filter((ticket) => ticket.status === status);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStatus = destination.droppableId as TicketStatus;
    onTicketMove?.(draggableId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex h-full gap-4 p-6 overflow-x-auto">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            colorClass={column.colorClass}
            tickets={getTicketsByStatus(column.id)}
            onTicketClick={onTicketClick}
            onAddTicket={(status) => onAddTicket?.(status as TicketStatus)}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
