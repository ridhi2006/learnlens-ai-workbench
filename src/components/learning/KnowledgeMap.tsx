import { useCallback, useMemo, useState } from "react";
import { ReactFlow, Background, Controls, Handle, Position, type Node, type Edge, type NodeProps } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { concepts, knowledgeAreas, type Concept } from "@/data/mockData";
import { cn } from "@/lib/utils";

const dotClass: Record<Concept["status"], string> = {
  mastered: "bg-success",
  learning: "bg-cyan",
  weak: "bg-warning",
  "not-covered": "bg-muted-foreground/50",
};

function ConceptNode({ data, selected }: NodeProps) {
  const concept = data.concept as Concept;
  return (
    <div
      className={cn(
        "border-border bg-surface/90 min-w-[150px] rounded-xl border px-3 py-2 text-xs shadow-sm backdrop-blur-sm transition-colors",
        selected && "border-primary/60 ring-primary/30 ring-2",
      )}
    >
      <Handle type="target" position={Position.Top} className="!bg-border-strong !h-1.5 !w-1.5 !border-0" />
      <div className="flex items-center gap-1.5">
        <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dotClass[concept.status])} />
        <span className="truncate font-medium">{concept.label}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-border-strong !h-1.5 !w-1.5 !border-0" />
    </div>
  );
}

const nodeTypes = { concept: ConceptNode };

const layout: Record<string, { x: number; y: number }> = {
  "binary-search": { x: 380, y: 40 },
  "search-space": { x: 160, y: 160 },
  "mid-calculation": { x: 380, y: 160 },
  "lower-bound": { x: 600, y: 160 },
  "upper-bound": { x: 600, y: 280 },
  "boundary-conditions": { x: 380, y: 280 },
  "time-complexity": { x: 160, y: 280 },
  "rotated-sorted-array": { x: 820, y: 160 },
  "binary-search-on-answer": { x: 820, y: 280 },
  "peak-element": { x: 820, y: 400 },
};

const edgesData: [string, string][] = [
  ["binary-search", "search-space"],
  ["binary-search", "mid-calculation"],
  ["binary-search", "lower-bound"],
  ["lower-bound", "upper-bound"],
  ["mid-calculation", "boundary-conditions"],
  ["search-space", "time-complexity"],
  ["lower-bound", "rotated-sorted-array"],
  ["rotated-sorted-array", "binary-search-on-answer"],
  ["rotated-sorted-array", "peak-element"],
];

export function KnowledgeMap() {
  const [selected, setSelected] = useState<Concept | null>(null);

  const nodes = useMemo<Node[]>(
    () =>
      concepts.map((c) => ({
        id: c.id,
        type: "concept",
        position: layout[c.id] ?? { x: 0, y: 0 },
        data: { concept: c },
      })),
    [],
  );

  const edges = useMemo<Edge[]>(
    () =>
      edgesData.map(([source, target]) => ({
        id: `${source}-${target}`,
        source,
        target,
        style: { stroke: "var(--border-strong)" },
      })),
    [],
  );

  const onNodeClick = useCallback((_: unknown, node: Node) => {
    const concept = concepts.find((c) => c.id === node.id) ?? null;
    setSelected(concept);
  }, []);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      <div className="border-border bg-surface/40 h-[420px] overflow-hidden rounded-2xl border">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.25 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
        >
          <Background gap={20} size={1} color="var(--border)" />
          <Controls showInteractive={false} className="!shadow-none" />
        </ReactFlow>
      </div>
      <div className="border-border bg-surface/60 rounded-2xl border p-4">
        {selected ? (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <span className={cn("h-1.5 w-1.5 rounded-full", dotClass[selected.status])} />
              <h4 className="text-sm font-medium">{selected.label}</h4>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">{selected.definition}</p>
            <div className="text-muted-foreground flex items-center justify-between text-[11px]">
              <span>Confidence</span>
              <span className="font-medium tabular-nums">{selected.confidence}%</span>
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground flex h-full flex-col items-center justify-center text-center text-xs">
            <p>Click a node to see its details here.</p>
            <div className="mt-4 space-y-1.5 self-stretch text-left">
              {knowledgeAreas.slice(0, 3).map((a) => (
                <div key={a.topic} className="flex items-center justify-between">
                  <span>{a.topic}</span>
                  <span className="tabular-nums">{a.value}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
