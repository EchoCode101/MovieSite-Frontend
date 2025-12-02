import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface SidebarLayoutProps {
  items: SidebarItem[];
  activeValue: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function SidebarLayout({
  items,
  activeValue,
  onValueChange,
  children,
  className,
}: SidebarLayoutProps) {
  return (
    <div className={cn("flex flex-col lg:flex-row gap-6", className)}>
      {/* Sidebar */}
      <aside className="w-full lg:w-64 flex-shrink-0">
        <nav className="space-y-1">
          {items.map((item) => (
            <button
              key={item.value}
              onClick={() => onValueChange(item.value)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                activeValue === item.value
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground"
              )}
            >
              {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

