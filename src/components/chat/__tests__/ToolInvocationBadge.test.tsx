import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationBadge } from "../ToolInvocationBadge";
import type { ToolInvocation } from "ai";

afterEach(() => {
  cleanup();
});

function makeInvocation(
  toolName: string,
  args: Record<string, unknown>,
  state: ToolInvocation["state"] = "result"
): ToolInvocation {
  if (state === "result") {
    return { toolCallId: "1", toolName, args, state, result: "ok" } as ToolInvocation;
  }
  return { toolCallId: "1", toolName, args, state } as ToolInvocation;
}

test("str_replace_editor create shows Creating label", () => {
  render(<ToolInvocationBadge toolInvocation={makeInvocation("str_replace_editor", { command: "create", path: "/App.jsx" })} />);
  expect(screen.getByText("Creating App.jsx")).toBeDefined();
});

test("str_replace_editor str_replace shows Editing label", () => {
  render(<ToolInvocationBadge toolInvocation={makeInvocation("str_replace_editor", { command: "str_replace", path: "/Card.jsx" })} />);
  expect(screen.getByText("Editing Card.jsx")).toBeDefined();
});

test("str_replace_editor insert shows Editing label", () => {
  render(<ToolInvocationBadge toolInvocation={makeInvocation("str_replace_editor", { command: "insert", path: "/utils.ts" })} />);
  expect(screen.getByText("Editing utils.ts")).toBeDefined();
});

test("str_replace_editor view shows Reading label", () => {
  render(<ToolInvocationBadge toolInvocation={makeInvocation("str_replace_editor", { command: "view", path: "/index.tsx" })} />);
  expect(screen.getByText("Reading index.tsx")).toBeDefined();
});

test("str_replace_editor undo_edit shows Reverting label", () => {
  render(<ToolInvocationBadge toolInvocation={makeInvocation("str_replace_editor", { command: "undo_edit", path: "/App.jsx" })} />);
  expect(screen.getByText("Reverting App.jsx")).toBeDefined();
});

test("file_manager rename shows Moving label", () => {
  render(<ToolInvocationBadge toolInvocation={makeInvocation("file_manager", { command: "rename", path: "/OldName.jsx" })} />);
  expect(screen.getByText("Moving OldName.jsx")).toBeDefined();
});

test("file_manager delete shows Deleting label", () => {
  render(<ToolInvocationBadge toolInvocation={makeInvocation("file_manager", { command: "delete", path: "/Button.jsx" })} />);
  expect(screen.getByText("Deleting Button.jsx")).toBeDefined();
});

test("unknown tool shows raw tool name", () => {
  render(<ToolInvocationBadge toolInvocation={makeInvocation("some_tool", {})} />);
  expect(screen.getByText("some_tool")).toBeDefined();
});

test("result state renders no spinner", () => {
  const { container } = render(
    <ToolInvocationBadge toolInvocation={makeInvocation("str_replace_editor", { command: "create", path: "/App.jsx" }, "result")} />
  );
  expect(container.querySelector(".animate-spin")).toBeNull();
});

test("call state renders spinner", () => {
  const { container } = render(
    <ToolInvocationBadge toolInvocation={makeInvocation("str_replace_editor", { command: "create", path: "/App.jsx" }, "call")} />
  );
  expect(container.querySelector(".animate-spin")).toBeDefined();
});
