import { X, MessageSquare, Paperclip, User, Calendar, Flag } from "lucide-react";
import { Task, TicketPriority, TicketStatus } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const priorityConfig: Record<
  TicketPriority,
  { label: string; className: string }
> = {
  low: { label: "Low", className: "bg-status-low/10 text-status-low border-status-low/20" },
  medium: { label: "Medium", className: "bg-status-medium/10 text-status-medium border-status-medium/20" },
  high: { label: "High", className: "bg-status-high/10 text-status-high border-status-high/20" },
  urgent: { label: "Urgent", className: "bg-status-urgent/10 text-status-urgent border-status-urgent/20" },
};

const statusConfig: Record<TicketStatus, { label: string; className: string }> = {
  backlog: { label: "Backlog", className: "bg-muted text-muted-foreground" },
  todo: { label: "Todo", className: "bg-secondary text-secondary-foreground" },
  in_progress: { label: "In Progress", className: "bg-primary/10 text-primary" },
  done: { label: "Done", className: "bg-status-low/10 text-status-low" },
};

interface TicketDetailsModalProps {
  ticket: Task | null;
  onClose: () => void;
}

export function TicketDetailsModal({ ticket, onClose }: TicketDetailsModalProps) {
  if (!ticket) return null;

  const priority = priorityConfig[ticket.priority];
  const status = statusConfig[ticket.status];

  return (
    <Dialog open={!!ticket} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>{ticket.id}</span>
          </div>
          <DialogTitle className="text-xl font-semibold text-foreground">
            {ticket.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Priority */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className={cn("font-medium", status.className)}>
              {status.label}
            </Badge>
            <Badge variant="outline" className={cn("font-medium", priority.className)}>
              <Flag className="h-3 w-3 mr-1" />
              {priority.label}
            </Badge>
            {ticket.assignees && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {ticket.assignees}
              </div>
            )}
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {ticket.description}
            </p>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Created {new Date(ticket.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
