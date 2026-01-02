import { MessageSquare, Paperclip, User } from "lucide-react";
import { Ticket, TicketPriority } from "@/types/project";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const priorityConfig: Record<
  TicketPriority,
  { label: string; className: string }
> = {
  low: { label: "Low", className: "bg-status-low/10 text-status-low" },
  medium: { label: "Medium", className: "bg-status-medium/10 text-status-medium" },
  high: { label: "High", className: "bg-status-high/10 text-status-high" },
  urgent: { label: "Urgent", className: "bg-status-urgent/10 text-status-urgent" },
};

interface TicketCardProps {
  ticket: Ticket;
  onClick: () => void;
}

export function TicketCard({ ticket, onClick }: TicketCardProps) {
  const priority = priorityConfig[ticket.priority];

  return (
    <Card
      className="p-3 cursor-pointer shadow-card hover:shadow-card-hover transition-all bg-card group"
      onClick={onClick}
    >
      {/* Priority Badge */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className={cn(
            "text-xs font-medium px-2 py-0.5 rounded",
            priority.className
          )}
        >
          {priority.label}
        </span>
        <span className="text-xs text-muted-foreground">{ticket.id}</span>
      </div>

      {/* Title */}
      <h4 className="text-sm font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {ticket.title}
      </h4>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-muted-foreground">
          {ticket.comments.length > 0 && (
            <div className="flex items-center gap-1 text-xs">
              <MessageSquare className="h-3 w-3" />
              {ticket.comments.length}
            </div>
          )}
          {ticket.attachments.length > 0 && (
            <div className="flex items-center gap-1 text-xs">
              <Paperclip className="h-3 w-3" />
              {ticket.attachments.length}
            </div>
          )}
        </div>

        {ticket.assignee && (
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-3 w-3 text-primary" />
          </div>
        )}
      </div>
    </Card>
  );
}
