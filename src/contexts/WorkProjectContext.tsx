import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { Workspace } from "@/types/workspaces";

interface WorkSpaceProject {
  workspace: Workspace | null;
  setWorkspace: (workspace: Workspace | null) => void;
}

const WorkProjectContext = createContext<WorkSpaceProject | undefined>(undefined);

export function WorkProjectProvider({ children }: { children: ReactNode }) {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);

  const value = useMemo(
    () => ({
      workspace,
      setWorkspace,
    }),
    [workspace] // setWorkspace is stable
  );

  return (
    <WorkProjectContext.Provider value={value}>
      {children}
    </WorkProjectContext.Provider>
  );
}

export function useWorkProject() {
  const context = useContext(WorkProjectContext);
  if (!context) {
    throw new Error("useWorkProject must be used within an AuthProvider");
  }
  return context;
}
