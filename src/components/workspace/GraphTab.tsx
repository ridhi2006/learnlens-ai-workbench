import { useCallback, useMemo, useState } from "react";
import {
  Background,
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { cn } from "@/lib/utils";
import { concepts, type Status } from "@/data/mockData";
import { useWorkspace } from "./workspace-context";

const dotClass: Record<Status, string> = {
  mastered: "bg-success",
  learning: "bg-cyan",
  weak: "bg-warning",
  "not-covered": "bg-muted-foreground/60",
};

function ConceptNode({ data, id }: NodeProps) {
  const d = data as { label: string; kind: "root" | "category" | "leaf"; status?: Status; confidence?: number; dim?: boolean };
  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-2.5 text-center text-xs font-medium shadow-sm transition-opacity duration-200",
        d.kind === "root" && "border-primary/60 bg-gradient-brand text-primary-foreground min-w-[150px] text-sm font-semibold shadow-lg",
        d.kind === "category" && "border-cyan/40 bg-cyan/10 text-cyan min-w-[130px]",
        d.kind === "leaf" && "border-border bg-surface text-foreground min-w-[150px]",
        d.dim && "opacity-25",
      )}
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="flex items-center justify-center gap-1.5">
        {d.kind === "leaf" && d.status && <span className={cn("h-1.5 w-1.5 rounded-full", dotClass[d.status])} />}
        {d.label}
      </div>
      {d.kind === "leaf" && d.status !== "not-covered" && (
        <div className="text-muted-foreground mt-0.5 text-[10px]">{d.confidence}%</div>
      )}
      <Handle type="source" position={Position.Bottom} className="opacity-0" id={id} />
    </div>
  );
}

const nodeTypes = { concept: ConceptNode };

const categories = [
  { id: "fundamentals", label: "Fundamentals" },
  { id: "variations", label: "Variations" },
  { id: "complexity", label: "Complexity" },
];

export function GraphTab() {
  const { openConcept } = useWorkspace();
  const [hovered, setHovered] = useState<string | null>(null);

  const { nodes, edges } = useMemo(() => {
    const root = concepts.find((c) => c.group === "root")!;
    const ns: Node[] = [
      { id: root.id, type: "concept", position: { x: 480, y: 0 }, data: { label: root.label, kind: "root" } },
    ];
    const es: Edge[] = [];
    categories.forEach((cat, ci) => {
      const catX = 120 + ci * 400;
      ns.push({ id: `cat-${cat.id}`, type: "concept", position: { x: catX, y: 140 }, data: { label: cat.label, kind: "category" } });
      es.push({ id: `e-root-${cat.id}`, source: root.id, target: `cat-${cat.id}`, animated: true, style: { stroke: "var(--color-border-strong)" } });
      const leaves = concepts.filter((c) => c.group === cat.id);
      leaves.forEach((leaf, li) => {
        ns.push({
          id: leaf.id,
          type: "concept",
          position: { x: catX - 40 + (li % 2) * 90, y: 280 + Math.floor(li / 2) * 110 },
          data: { label: leaf.label, kind: "leaf", status: leaf.status, confidence: leaf.confidence },
        });
        es.push({ id: `e-${cat.id}-${leaf.id}`, source: `cat-${cat.id}`, target: leaf.id, style: { stroke: "var(--color-border)" } });
      });
    });
    return { nodes: ns, edges: es };
  }, []);

  const related = useMemo(() => {
    if (!hovered) return null;
    const set = new Set<string>([hovered]);
    edges.forEach((e) => {
      if (e.source === hovered) set.add(e.target);
      if (e.target === hovered) set.add(e.source);
    });
    return set;
  }, [hovered, edges]);

  const styledNodes = nodes.map((n) => ({
    ...n,
    data: { ...n.data, dim: related ? !related.has(n.id) : false },
  }));

  const styledEdges = edges.map((e) => ({
    ...e,
    style: {
      ...e.style,
      opacity: related ? (related.has(e.source) && related.has(e.target) ? 1 : 0.15) : 1,
    },
  }));

  const onNodeClick = useCallback(
    (_: unknown, node: Node) => {
      if (concepts.some((c) => c.id === node.id)) openConcept(node.id);
    },
    [openConcept],
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold">Knowledge Graph</h2>
        <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-[11px]">
          {(["mastered", "learning", "weak", "not-covered"] as Status[]).map((s) => (
            <span key={s} className="flex items-center gap-1.5">
              <span className={cn("h-1.5 w-1.5 rounded-full", dotClass[s])} />
              {s === "not-covered" ? "Not covered" : s[0]!.toUpperCase() + s.slice(1)}
            </span>
          ))}
        </div>
      </div>

      <div className="border-border bg-surface/30 h-[640px] w-full overflow-hidden rounded-2xl border">
        <ReactFlow
          nodes={styledNodes}
          edges={styledEdges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onNodeMouseEnter={(_, n) => setHovered(n.id)}
          onNodeMouseLeave={() => setHovered(null)}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={24} color="var(--color-border)" />
          <Controls showInteractive={false} />
          <MiniMap pannable zoomable className="!bg-surface !border-border" />
        </ReactFlow>
      </div>
    </div>
  );
}
