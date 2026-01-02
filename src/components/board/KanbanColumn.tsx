import { Plus } from "lucide-react";
import { Ticket } from "@/types/project";
import { TicketCard } from "./TicketCard";
import { Button } from "@/components/ui/button";

interface KanbanColumnProps {
  title: string;
  colorClass: string;
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

export function KanbanColumn({
  title,
  colorClass,
  tickets,
  onTicketClick,
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
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Column Content */}
      <div
        className={`flex-1 rounded-lg p-2 space-y-2 overflow-y-auto ${colorClass}`}
      >
        {tickets.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-sm text-muted-foreground">
            No tickets
          </div>
        ) : (
          tickets.map((ticket, index) => (
            <div
              key={ticket.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TicketCard ticket={ticket} onClick={() => onTicketClick(ticket)} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
