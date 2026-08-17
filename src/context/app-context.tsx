import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light" | "system";

type AppState = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolvedTheme: "dark" | "light";
  authed: boolean;
  signIn: () => void;
  signOut: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  learningMode: string;
  setLearningMode: (m: string) => void;
  savedVideos: string[];
  toggleSaved: (id: string) => void;
  quizScore: number | null;
  setQuizScore: (n: number | null) => void;
  interviewDone: boolean;
  setInterviewDone: (b: boolean) => void;
};

const AppContext = createContext<AppState | null>(null);

const systemDark = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [resolvedTheme, setResolved] = useState<"dark" | "light">("dark");
  const [authed, setAuthed] = useState(false);
  const [sidebarCollapsed, setCollapsed] = useState(false);
  const [learningMode, setLearningMode] = useState("college");
  const [savedVideos, setSaved] = useState<string[]>([]);
  const [quizScore, setQuizScore] = useState<number | null>(7);
  const [interviewDone, setInterviewDone] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("ll-theme") as Theme | null;
    if (stored) setThemeState(stored);
    setAuthed(window.localStorage.getItem("ll-authed") === "1");
  }, []);

  useEffect(() => {
    const next = theme === "system" ? (systemDark() ? "dark" : "light") : theme;
    setResolved(next);
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
    window.localStorage.setItem("ll-theme", theme);
  }, [theme]);

  const signIn = useCallback(() => {
    setAuthed(true);
    window.localStorage.setItem("ll-authed", "1");
  }, []);
  const signOut = useCallback(() => {
    setAuthed(false);
    window.localStorage.removeItem("ll-authed");
  }, []);

  const toggleSaved = useCallback((id: string) => {
    setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const value = useMemo<AppState>(
    () => ({
      theme,
      setTheme: setThemeState,
      resolvedTheme,
      authed,
      signIn,
      signOut,
      sidebarCollapsed,
      toggleSidebar: () => setCollapsed((c) => !c),
      learningMode,
      setLearningMode,
      savedVideos,
      toggleSaved,
      quizScore,
      setQuizScore,
      interviewDone,
      setInterviewDone,
    }),
    [
      theme,
      resolvedTheme,
      authed,
      signIn,
      signOut,
      sidebarCollapsed,
      learningMode,
      savedVideos,
      toggleSaved,
      quizScore,
      interviewDone,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}