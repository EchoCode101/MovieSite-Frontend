import { Link } from "@tanstack/react-router";
import {
  Calendar,
  Flag,
  Film,
  LayoutDashboard,
  MessageSquare,
  PlayCircle,
  Radio,
  Star,
  Tag,
  Tv,
  Users,
  UsersRound,
  Video,
  Banknote,
  CreditCard,
  Receipt,
  Percent,
  Image,
  Settings2,
  FileText,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  label?: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    items: [
      { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
      { label: "Users", to: "/users", icon: Users },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Videos", to: "/content/videos", icon: Video },
      { label: "Movies", to: "/content/movies", icon: Film },
      { label: "TV Shows", to: "/content/tv-shows", icon: Tv },
      { label: "Seasons", to: "/content/seasons", icon: Calendar },
      { label: "Episodes", to: "/content/episodes", icon: PlayCircle },
      { label: "Genres", to: "/content/genres", icon: Tag },
      { label: "Cast/Crew", to: "/content/cast-crew", icon: UsersRound },
      { label: "Channels", to: "/content/channels", icon: Radio },
    ],
  },
  {
    label: "Engagement",
    items: [
      { label: "Comments", to: "/engagement/comments", icon: MessageSquare },
      { label: "Reviews", to: "/engagement/reviews", icon: Star },
      { label: "Reports", to: "/engagement/reports", icon: Flag },
    ],
  },
  {
    label: "Monetization",
    items: [
      { label: "Plans", to: "/monetization/plans", icon: Banknote },
      { label: "Coupons", to: "/monetization/coupons", icon: Percent },
      {
        label: "Transactions",
        to: "/monetization/transactions",
        icon: Receipt,
      },
      { label: "Taxes", to: "/monetization/taxes", icon: Receipt },
      {
        label: "Payment Methods",
        to: "/monetization/payment-methods",
        icon: CreditCard,
      },
    ],
  },
  {
    label: "CMS",
    items: [
      { label: "Banners", to: "/cms/banners", icon: Image },
      { label: "Settings", to: "/cms/settings", icon: Settings2 },
      { label: "Pages", to: "/cms/pages", icon: FileText },
    ],
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950/95 backdrop-blur-sm shadow-xl",
        className
      )}
    >
      <div className="px-6 py-5 border-b border-slate-800/50">
        <span className="text-xl font-bold text-slate-50 tracking-tight">
          Vidstie Admin
        </span>
      </div>
      <nav className="flex-1 space-y-6 px-3 py-4 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label || "main"} className="space-y-1">
            {section.label && (
              <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {section.label}
              </div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800/50 hover:text-slate-50 transition-all duration-200 group"
                  activeProps={{
                    className:
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium bg-[#517cee]/20 text-[#517cee] shadow-sm",
                  }}
                >
                  <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
