import { Loader2 } from "lucide-react";
import type { ToolInvocation } from "ai";

interface ToolInvocationBadgeProps {
  toolInvocation: ToolInvocation;
}

function getLabel(toolName: string, args: Record<string, unknown>): string {
  const path = typeof args.path === "string" ? args.path : "";
  const basename = path.split("/").filter(Boolean).at(-1) ?? path;
  const command = args.command;

  if (toolName === "str_replace_editor") {
    if (command === "create") return `Creating ${basename}`;
    if (command === "str_replace" || command === "insert") return `Editing ${basename}`;
    if (command === "view") return `Reading ${basename}`;
    if (command === "undo_edit") return `Reverting ${basename}`;
  }

  if (toolName === "file_manager") {
    if (command === "rename") return `Moving ${basename}`;
    if (command === "delete") return `Deleting ${basename}`;
  }

  return toolName;
}

export function ToolInvocationBadge({ toolInvocation }: ToolInvocationBadgeProps) {
  const label = getLabel(toolInvocation.toolName, toolInvocation.args as Record<string, unknown>);
  const done = toolInvocation.state === "result";

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {done ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">{label}</span>
    </div>
  );
}
