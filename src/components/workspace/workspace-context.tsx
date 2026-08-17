import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type WorkspaceTab =
  | "overview"
  | "transcript"
  | "notes"
  | "graph"
  | "quiz"
  | "tutor"
  | "path";

type PendingQuestion = { time: string; question?: string } | null;

type WorkspaceState = {
  tab: WorkspaceTab;
  setTab: (t: WorkspaceTab) => void;
  timestampOpen: boolean;
  timestampTime: string;
  openTimestamp: (time: string, question?: string) => void;
  closeTimestamp: () => void;
  pendingQuestion: PendingQuestion;
  conceptId: string | null;
  conceptOpen: boolean;
  openConcept: (id: string) => void;
  closeConcept: () => void;
  shareOpen: boolean;
  setShareOpen: (b: boolean) => void;
  pdfOpen: boolean;
  setPdfOpen: (b: boolean) => void;
};

const WorkspaceContext = createContext<WorkspaceState | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<WorkspaceTab>("overview");
  const [timestampOpen, setTimestampOpen] = useState(false);
  const [timestampTime, setTimestampTime] = useState("17:32");
  const [pendingQuestion, setPendingQuestion] = useState<PendingQuestion>(null);
  const [conceptId, setConceptId] = useState<string | null>(null);
  const [conceptOpen, setConceptOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);

  const value = useMemo<WorkspaceState>(
    () => ({
      tab,
      setTab,
      timestampOpen,
      timestampTime,
      openTimestamp: (time, question) => {
        setTimestampTime(time);
        setPendingQuestion(question ? { time, question } : { time });
        setTimestampOpen(true);
      },
      closeTimestamp: () => setTimestampOpen(false),
      pendingQuestion,
      conceptId,
      conceptOpen,
      openConcept: (id) => {
        setConceptId(id);
        setConceptOpen(true);
      },
      closeConcept: () => setConceptOpen(false),
      shareOpen,
      setShareOpen,
      pdfOpen,
      setPdfOpen,
    }),
    [tab, timestampOpen, timestampTime, pendingQuestion, conceptId, conceptOpen, shareOpen, pdfOpen],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return ctx;
}
