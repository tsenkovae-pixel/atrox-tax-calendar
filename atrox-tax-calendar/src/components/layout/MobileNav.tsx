"use client";

import { useState } from "react";
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
  Menu, 
  X 
} from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Начало", icon: Home },
  { path: "/calendar", label: "Календар", icon: CalendarDays },
  { path: "/companies", label: "Фирми", icon: Building2 },
  { path: "/checklist", label: "Чеклист", icon: ListChecks },
  { path: "/tasks", label: "Задачи", icon: ClipboardList },
  { path: "/reminders", label: "Известия", icon: Bell },
  { path: "/settings", label: "Настройки", icon: Settings },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top bar */}
      <div 
        className="lg:hidden flex items-center justify-between px-4 py-3 fixed top-0 left-0 right-0 z-40"
        style={{ background: "#3A2E35", borderBottom: "1px solid rgba(247,217,168,0.1)" }}
      >
        <div className="flex items-center gap-2.5">
          <div 
            className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(201,169,98,0.15)", border: "1px solid rgba(201,169,98,0.3)" }}
          >
            <span 
              className="font-bold text-sm"
              style={{ color: "#C8A14A" }}
            >
              A
            </span>
          </div>
          <span 
            className="font-semibold text-white tracking-wide"
            style={{ fontSize: "15px", letterSpacing: "0.04em" }}
          >
            Atrox
          </span>
          <span 
            className="text-xs"
            style={{ color: "rgba(201,169,98,0.6)" }}
          >
            Tax Calendar 2026
          </span>
        </div>
        <button 
          onClick={() => setOpen(o => !o)} 
          className="p-1.5 rounded-lg"
          style={{ color: "#C8A14A" }}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <div 
          className="lg:hidden fixed top-14 left-0 right-0 z-50 py-2 px-3 space-y-0.5 shadow-xl"
          style={{ background: "#3A2E35", borderBottom: "1px solid rgba(247,217,168,0.1)" }}
        >
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = pathname === path;
            return (
              <Link 
                key={path} 
                href={path} 
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium"
                style={{
                  color: isActive ? "#3A2E35" : "rgba(247,245,242,0.7)",
                  background: isActive ? "#C8A14A" : "transparent",
                }}
              >
                <Icon 
                  className="w-4 h-4" 
                  style={{ color: isActive ? "#3A2E35" : "rgba(201,169,98,0.8)" }} 
                  strokeWidth={1.5} 
                />
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
