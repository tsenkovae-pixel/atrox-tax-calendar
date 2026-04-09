"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  CalendarDays, 
  Building2, 
  ListChecks, 
  ClipboardList, 
  Bell, 
  Settings,
  LogOut,
  Shield
} from "lucide-react";
import { useTaxStore } from "@/lib/store";

const navItems = [
  { path: "/dashboard", label: "Начало", icon: Home },
  { path: "/calendar", label: "Календар", icon: CalendarDays },
  { path: "/companies", label: "Фирми", icon: Building2 },
  { path: "/checklist", label: "Чеклист", icon: ListChecks },
  { path: "/tasks", label: "Задачи", icon: ClipboardList },
  { path: "/reminders", label: "Известия", icon: Bell },
  { path: "/settings", label: "Настройки", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { office } = useTaxStore();

  return (
    <aside 
      className="hidden lg:flex flex-col w-64 min-h-screen fixed left-0 top-0 bottom-0 z-30"
      style={{ background: "#3A2E35" }}
    >
      {/* Luxury glow line — left edge */}
      <div style={{
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        width: "1px",
        height: "140px",
        background: "linear-gradient(180deg, transparent 0%, #F7D9A8 50%, transparent 100%)",
        filter: "blur(4px)",
        opacity: 0.7,
      }} />
      <div style={{
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        width: "1px",
        height: "120px",
        background: "linear-gradient(180deg, transparent 0%, #F7D9A8 50%, transparent 100%)",
        opacity: 0.5,
      }} />

      {/* Brand block */}
      <div className="px-6 pt-8 pb-7 border-b" style={{ borderColor: "rgba(247,217,168,0.12)" }}>
        {/* Small luxury label */}
        <div 
          className="text-xs tracking-widest uppercase mb-4"
          style={{ color: "rgba(247,217,168,0.45)", letterSpacing: "0.2em" }}
        >
          Modern Accounting
        </div>
        {/* Logo mark */}
        <div className="flex items-center gap-3 mb-1">
          <div 
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{ background: "transparent" }}
          >
            <div 
              className="w-full h-full flex items-center justify-center font-bold text-lg"
              style={{ 
                background: "linear-gradient(135deg, #C9A962 0%, #F7D9A8 100%)",
                color: "#3A2E35",
                borderRadius: "8px"
              }}
            >
              A
            </div>
          </div>
          <div>
            <div 
              className="font-semibold text-white tracking-wide"
              style={{ fontSize: "17px", letterSpacing: "0.04em" }}
            >
              Atrox
            </div>
            <div 
              className="text-xs"
              style={{ color: "rgba(232,216,200,0.6)", letterSpacing: "0.06em" }}
            >
              Tax Calendar 2026
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-0.5">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = pathname === path || (path === "/dashboard" && pathname === "/");
          return (
            <Link
              key={path}
              href={path}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group"
              style={{
                color: isActive ? "#3A2E35" : "rgba(247,245,242,0.65)",
                background: isActive ? "#C8A14A" : "transparent",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={e => { 
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(201,169,98,0.1)";
                  e.currentTarget.style.color = "rgba(247,245,242,0.95)";
                }
              }}
              onMouseLeave={e => { 
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(247,245,242,0.65)";
                }
              }}
            >
              <Icon 
                className="w-4 h-4 flex-shrink-0" 
                style={{ color: isActive ? "#3A2E35" : "rgba(201,169,98,0.8)" }} 
                strokeWidth={1.5} 
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-5 border-t" style={{ borderColor: "rgba(247,217,168,0.1)" }}>
        <Link 
          href="/terms"
          className="flex items-center gap-2 text-xs w-full px-3 py-2 rounded-lg transition-all mb-1"
          style={{ color: "rgba(247,245,242,0.3)" }}
          onMouseEnter={e => { 
            e.currentTarget.style.color = "#C8A14A"; 
            e.currentTarget.style.background = "rgba(201,169,98,0.08)"; 
          }}
          onMouseLeave={e => { 
            e.currentTarget.style.color = "rgba(247,245,242,0.3)"; 
            e.currentTarget.style.background = "transparent"; 
          }}
        >
          <Shield className="w-3.5 h-3.5" />
          Правна информация
        </Link>
        <button
          className="flex items-center gap-2 text-xs w-full px-3 py-2 rounded-lg transition-all cursor-pointer"
          style={{ color: "rgba(247,245,242,0.3)" }}
          onMouseEnter={e => { 
            e.currentTarget.style.color = "#C8A14A"; 
            e.currentTarget.style.background = "rgba(201,169,98,0.08)"; 
          }}
          onMouseLeave={e => { 
            e.currentTarget.style.color = "rgba(247,245,242,0.3)"; 
            e.currentTarget.style.background = "transparent"; 
          }}
        >
          <LogOut className="w-3.5 h-3.5" />
          Изход
        </button>
        <p 
          className="text-xs mt-2 px-3"
          style={{ color: "rgba(247,245,242,0.18)", letterSpacing: "0.03em" }}
        >
          © 2026 Atrox Accounting
        </p>
      </div>
    </aside>
  );
}
