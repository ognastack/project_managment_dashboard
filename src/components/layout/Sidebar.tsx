import { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  LayoutDashboard,
  FolderKanban,
  Settings,
  LogOut,
  ChevronDown,
  Plus,
  Eye
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { CreateWorkspaceModal } from "@/components/workspace/CreateWorkspaceModal";
import { WorkspaceListResponse,Workspace } from "@/types/workspaces";
import { useWorkProject } from "@/contexts/WorkProjectContext";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FolderKanban, label: "Projects", path: "/projects" },
  { icon: Settings, label: "Settings", path: "/settings" },
];


interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, user, client } = useAuth();
  const {workspace,setWorkspace} = useWorkProject()
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const fetchWorkspaces = useCallback(async () => {
    if (!client) return;

    try {
      const response = await client.get<WorkspaceListResponse>("/v1/workspaces");
      if(response.data){
        const tempWork:Workspace[]= response.data.workspaces as Workspace[]; 
        setWorkspaces(tempWork)
        if(tempWork.length >0 && !workspace){
          setWorkspace(tempWork[0])
        }
      }else{
        toast.error(response.error.msg || 'Error fetching workspaces')
      }
    } catch (error) {
      console.error("Failed to fetch workspaces", error);
    }
  }, [client,setWorkspace,workspace]);

  const handleCreateWorkspace = async (workspace: Workspace) => {
    await fetchWorkspaces()
    setWorkspace(workspace);
    toast.success(`Workspace "${workspace.name}" created`);
  };

  const handleSelectWorkspace = (workspace: Workspace) => {
    setWorkspace(workspace);
    toast.success(`Switched to "${workspace.name}"`);
  };


  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  return (
    <aside
      className={cn(
        "flex flex-col w-64 bg-sidebar border-r border-sidebar-border h-screen",
        className
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="p-1.5 bg-primary rounded-lg">
            <LayoutGrid className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">
            TeamFlow
          </span>
        </Link>
      </div>

      {/* Workspace Selector */}
      <div className="p-3">
        <DropdownMenu>
          {workspace ?(
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between h-10 px-3 hover:bg-sidebar-accent"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground">
                  <Eye className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium truncate">
                  {workspace.name}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          ):(
            <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between h-10 px-3 hover:bg-sidebar-accent"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground">
                  OG
                </div>
                <span className="text-sm font-medium truncate">
                  WorkSpaces
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
            </DropdownMenuTrigger>
          )}
          <DropdownMenuContent align="start" className="w-56">
            {workspaces.map((workspace) => (
              <DropdownMenuItem 
                key={workspace.id} 
                className="cursor-pointer"
                onClick={() => handleSelectWorkspace(workspace)}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground">
                    {workspace.name.slice(0,2).toUpperCase()}
                  </div>
                  <span>{workspace.name}</span>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem 
              className="cursor-pointer text-muted-foreground"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create workspace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "sidebarActive" : "sidebar"}
                  size="sm"
                  className="h-9"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {user?.email?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.email || "User"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CreateWorkspaceModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onCreateWorkspace={handleCreateWorkspace}
      />
    </aside>
  );
}
