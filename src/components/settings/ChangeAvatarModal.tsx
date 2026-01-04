import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, User } from "lucide-react";

interface ChangeAvatarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentInitial: string;
  onAvatarChange: (avatarUrl: string | null) => void;
}

export function ChangeAvatarModal({
  open,
  onOpenChange,
  currentInitial,
  onAvatarChange,
}: ChangeAvatarModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSave = () => {
    onAvatarChange(previewUrl);
    onOpenChange(false);
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onAvatarChange(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Avatar</DialogTitle>
          <DialogDescription>
            Upload a new profile picture or remove the current one.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-dashed border-muted-foreground/30">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Avatar preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-semibold text-primary">
                {currentInitial}
              </span>
            )}
          </div>
          
          <div className="w-full">
            <Label htmlFor="avatar-upload" className="cursor-pointer">
              <div className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-muted-foreground/30 rounded-lg hover:border-primary/50 transition-colors">
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click to upload an image
                </span>
              </div>
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </Label>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleRemove}
            className="w-full sm:w-auto"
          >
            Remove Avatar
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="w-full sm:w-auto"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
