import { Plus } from "lucide-react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Task } from "@/types/project";
import { TicketCard } from "./TicketCard";
import { Button } from "@/components/ui/button";

interface KanbanColumnProps {
  id: string;
  title: string;
  colorClass: string;
  tickets: Task[];
  onTicketClick: (ticket: Task) => void;
  onAddTicket: (status: string) => void;
}

export function KanbanColumn({
  id,
  title,
  colorClass,
  tickets,
  onTicketClick,
  onAddTicket,
}: KanbanColumnProps) {
  return (
    <div className="flex flex-col flex-shrink-0 w-80">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${colorClass}`} />
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {tickets.length}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onAddTicket(id)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Column Content */}
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 rounded-lg p-2 space-y-2 overflow-y-auto transition-colors ${colorClass} ${
              snapshot.isDraggingOver ? "ring-2 ring-primary/50" : ""
            }`}
          >
            {tickets.length === 0 && !snapshot.isDraggingOver ? (
              <div className="flex items-center justify-center h-24 text-sm text-muted-foreground">
                No tickets
              </div>
            ) : (
              tickets.map((ticket, index) => (
                <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`transition-transform ${
                        snapshot.isDragging ? "rotate-2 scale-105" : ""
                      }`}
                    >
                      <TicketCard ticket={ticket} onClick={() => onTicketClick(ticket)} />
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
