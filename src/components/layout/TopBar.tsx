import { Link } from "@tanstack/react-router";
import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import type { ReactNode } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from "@/context/app-context";
import { notifications, user } from "@/data/mockData";

export function TopBar({
  title,
  breadcrumb,
  onMenuClick,
  showSearch = true,
  actions,
}: {
  title: ReactNode;
  breadcrumb?: string | undefined;
  onMenuClick: () => void;
  showSearch?: boolean | undefined;
  actions?: ReactNode | undefined;
}) {
  const { resolvedTheme, setTheme, signOut } = useApp();

  return (
    <header className="border-border bg-background/80 sticky top-0 z-30 flex h-14 items-center gap-3 border-b px-4 backdrop-blur-xl md:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="text-muted-foreground hover:text-foreground -ml-1 rounded-md p-2 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-4.5 w-4.5" />
      </button>

      <div className="min-w-0 flex-1">
        {breadcrumb && (
          <div className="text-muted-foreground truncate text-[11px]">{breadcrumb}</div>
        )}
        <div className="truncate text-sm font-medium">{title}</div>
      </div>

      {showSearch && (
        <div className="border-border bg-surface/60 text-muted-foreground hidden items-center gap-2 rounded-[10px] border px-3 py-1.5 md:flex md:w-64 lg:w-80">
          <Search className="h-3.5 w-3.5" />
          <input
            className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground/80"
            placeholder="Search videos, concepts, notes..."
            aria-label="Search"
          />
        </div>
      )}

      {actions}

      <DropdownMenu>
        <DropdownMenuTrigger
          className="text-muted-foreground hover:text-foreground relative rounded-md p-2 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="bg-cyan absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notifications.map((n) => (
            <div key={n.title} className="px-2 py-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium">{n.title}</span>
                <span className="text-muted-foreground text-[10px]">{n.when}</span>
              </div>
              <p className="text-muted-foreground mt-0.5 text-xs">{n.body}</p>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <button
        type="button"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        className="text-muted-foreground hover:text-foreground rounded-md p-2 transition-colors"
        aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
      >
        {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger
          className="bg-gradient-brand text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold"
          aria-label="Account menu"
        >
          {user.initials}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="text-sm font-medium">{user.fullName}</div>
            <div className="text-muted-foreground text-xs font-normal">{user.email}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/" onClick={signOut}>
              Sign out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}