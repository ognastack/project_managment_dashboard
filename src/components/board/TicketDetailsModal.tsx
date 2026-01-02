import { X, MessageSquare, Paperclip, User, Calendar, Flag } from "lucide-react";
import { Ticket, TicketPriority, TicketStatus } from "@/types/project";
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
  ticket: Ticket | null;
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
            {ticket.assignee && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {ticket.assignee}
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
              <span>Created {new Date(ticket.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <Separator />

          {/* Attachments */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Paperclip className="h-4 w-4" />
              Attachments ({ticket.attachments.length})
            </h3>
            {ticket.attachments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No attachments</p>
            ) : (
              <div className="space-y-2">
                {ticket.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                      <Paperclip className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {attachment.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{attachment.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Comments */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Comments ({ticket.comments.length})
            </h3>
            {ticket.comments.length === 0 ? (
              <p className="text-sm text-muted-foreground mb-4">No comments yet</p>
            ) : (
              <div className="space-y-4 mb-4">
                {ticket.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {comment.author[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">
                          {comment.author}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment */}
            <div className="space-y-3">
              <Textarea
                placeholder="Add a comment..."
                className="min-h-[80px] resize-none"
              />
              <div className="flex justify-end">
                <Button variant="hero" size="sm">
                  Add Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
