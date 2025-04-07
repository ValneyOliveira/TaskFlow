import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { FolderOpen, Plus } from "lucide-react";
import { ProjectFormDialog } from "../ProjectFormDialog";
import { TaskFormDialog } from "../tasks/TaskFormDialog";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  actionLabel?: string;
  action: string ;
}

export function EmptyState({ 
  title, 
  description, 
  icon, 
  action 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg bg-muted/10 min-h-[300px]">
      {icon || <FolderOpen className="h-12 w-12 text-muted-foreground/60 mb-4" />}
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">{description}</p>
      
      {action === 'create_project' && (
        <ProjectFormDialog action='form' actionName='new' children='Novo Projeto'/>
      )}
      {action === 'create_task' && (
        <TaskFormDialog text="Criar Tarefa"/>
      )}
    </div>
  );
}