import { Link, useRouterState, type LinkProps } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  BookMarked,
  Brain,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Settings,
  User,
  X,
} from "lucide-react";

import { Logo, LogoMark } from "@/components/common/Logo";
import { useApp } from "@/context/app-context";
import { videos } from "@/data/mockData";
import { cn } from "@/lib/utils";

type To = NonNullable<LinkProps["to"]>;

const mainNav: { to: To; label: string; icon: typeof Brain }[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/my-learning", label: "My Learning", icon: Brain },
  { to: "/library", label: "Library", icon: BookMarked },
];

const footerNav: { to: To; label: string; icon: typeof Brain }[] = [
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/profile", label: "Profile", icon: User },
];

function NavRow({
  to,
  params,
  label,
  icon: Icon,
  collapsed,
  active,
  onNavigate,
  muted,
}: {
  to: To;
  params?: Record<string, string> | undefined;
  label: string;
  icon?: typeof Brain | undefined;
  collapsed: boolean;
  active: boolean;
  onNavigate?: (() => void) | undefined;
  muted?: boolean | undefined;
}) {
  return (
    <Link
      to={to}
      {...(params ? { params } : {})}
      {...(onNavigate ? { onClick: onNavigate } : {})}
      {...(collapsed ? { title: label } : {})}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors duration-200",
        active
          ? "bg-primary/12 text-foreground font-medium"
          : muted
            ? "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
            : "text-foreground/75 hover:text-foreground hover:bg-foreground/5",
      )}
    >
      {active && (
        <motion.span
          layoutId="sidebar-active"
          className="bg-gradient-brand absolute top-1.5 bottom-1.5 -left-2 w-[2px] rounded-full"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      {Icon ? (
        <Icon className="h-4 w-4 shrink-0" />
      ) : (
        <span className="bg-muted-foreground/50 ml-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
      )}
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}

function SidebarBody({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: (() => void) | undefined;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { toggleSidebar } = useApp();

  return (
    <div className="flex h-full flex-col gap-5 px-3 py-4">
      <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between px-1.5")}>
        <Link to="/dashboard" aria-label="LearnLens AI dashboard">
          {collapsed ? <LogoMark /> : <Logo />}
        </Link>
        {!collapsed && (
          <button
            type="button"
            onClick={toggleSidebar}
            className="text-muted-foreground hover:text-foreground hover:bg-foreground/5 hidden rounded-md p-1.5 transition-colors lg:block"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        )}
      </div>

      <Link
        to="/analyze"
        onClick={onNavigate}
        className={cn(
          "bg-gradient-brand text-primary-foreground flex items-center justify-center gap-2 rounded-[10px] px-3 py-2 text-sm font-medium transition-transform duration-200 hover:-translate-y-px",
          collapsed && "px-0",
        )}
      >
        <Plus className="h-4 w-4" />
        {!collapsed && "Analyze New Video"}
      </Link>

      <nav className="flex-1 space-y-6 overflow-y-auto scrollbar-slim">
        <div className="space-y-0.5">
          {!collapsed && (
            <div className="text-muted-foreground/70 px-2.5 pb-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase">
              Main
            </div>
          )}
          {mainNav.map((item) => (
            <NavRow
              key={item.to}
              {...item}
              collapsed={collapsed}
              active={pathname === item.to}
              {...(onNavigate ? { onNavigate } : {})}
            />
          ))}
        </div>

        {!collapsed && (
          <div className="space-y-0.5">
            <div className="text-muted-foreground/70 px-2.5 pb-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase">
              Recent
            </div>
            {videos.slice(0, 3).map((v) => (
              <NavRow
                key={v.id}
                to="/learn/$videoId"
                params={{ videoId: v.id }}
                label={v.topic === "Frontend Engineering" ? "React Hooks" : v.title.split(" ").slice(0, 3).join(" ")}
                collapsed={collapsed}
                active={pathname.startsWith(`/learn/${v.id}`)}
                muted
                {...(onNavigate ? { onNavigate } : {})}
              />
            ))}
          </div>
        )}
      </nav>

      <div className="border-border space-y-0.5 border-t pt-3">
        {footerNav.map((item) => (
          <NavRow
            key={item.to}
            {...item}
            collapsed={collapsed}
            active={pathname === item.to}
            {...(onNavigate ? { onNavigate } : {})}
          />
        ))}
        {collapsed && (
          <button
            type="button"
            onClick={toggleSidebar}
            className="text-muted-foreground hover:text-foreground hover:bg-foreground/5 mx-auto mt-1 flex rounded-md p-2"
            aria-label="Expand sidebar"
          >
            <PanelLeftOpen className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export function AppSidebar({
  mobileOpen,
  onMobileClose,
}: {
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const { sidebarCollapsed } = useApp();

  return (
    <>
      <aside
        className={cn(
          "bg-sidebar border-sidebar-border sticky top-0 hidden h-svh shrink-0 border-r transition-[width] duration-300 lg:block",
          sidebarCollapsed ? "w-[68px]" : "w-[256px]",
        )}
      >
        <SidebarBody collapsed={sidebarCollapsed} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onMobileClose}
              aria-label="Close navigation"
            />
            <motion.div
              className="bg-sidebar border-sidebar-border absolute inset-y-0 left-0 w-[272px] border-r"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 420, damping: 38 }}
            >
              <button
                onClick={onMobileClose}
                className="text-muted-foreground hover:text-foreground absolute top-4 right-3 rounded-md p-1.5"
                aria-label="Close navigation"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarBody collapsed={false} onNavigate={onMobileClose} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}