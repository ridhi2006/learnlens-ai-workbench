import { useState, type ReactNode } from "react";
import { motion } from "motion/react";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopBar } from "@/components/layout/TopBar";
import { cn } from "@/lib/utils";

export function AppLayout({
  title,
  breadcrumb,
  children,
  contentClassName,
  showSearch = true,
  topBarActions,
}: {
  title: ReactNode;
  breadcrumb?: string | undefined;
  children: ReactNode;
  contentClassName?: string | undefined;
  showSearch?: boolean | undefined;
  topBarActions?: ReactNode | undefined;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-background flex min-h-svh w-full">
      <AppSidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          title={title}
          breadcrumb={breadcrumb}
          onMenuClick={() => setMobileOpen(true)}
          showSearch={showSearch}
          actions={topBarActions}
        />
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn("min-w-0 flex-1 px-4 py-6 md:px-6 lg:px-8", contentClassName)}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}