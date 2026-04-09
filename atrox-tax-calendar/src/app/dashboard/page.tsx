"use client";

import { useTaxStore } from "@/lib/store";
import { getUpcomingTasks } from "@/data/taxTasks";
import { formatDate, getDaysUntilDeadline, getCategoryLabel } from "@/lib/utils";
import { CalendarDays, Building2, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { office, firms, getCompletionStats } = useTaxStore();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const upcomingTasks = getUpcomingTasks(currentYear, 30);
  const stats = getCompletionStats(currentYear, currentMonth);
  const activeFirms = firms.filter(f => f.active).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#3A2E35] mb-2">
          Здравейте, {office.manager.split(' ')[0] || 'Колега'}
        </h1>
        <p className="text-[#3A2E35]/60">
          Ето какво предстои през този месец
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Активни фирми"
          value={activeFirms}
          icon={Building2}
          href="/companies"
        />
        <StatCard 
          title="Предстоящи задачи"
          value={upcomingTasks.length}
          icon={CalendarDays}
          href="/calendar"
          highlight
        />
        <StatCard 
          title="Изпълнени"
          value={`${stats.percentage}%`}
          icon={CheckCircle2}
          href="/checklist"
        />
        <StatCard 
          title="Спешни"
          value={upcomingTasks.filter(t => getDaysUntilDeadline(t.deadline) <= 7).length}
          icon={AlertCircle}
          href="/reminders"
          alert
        />
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e0d5] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#3A2E35]">Предстоящи срокове</h2>
          <Link 
            href="/calendar" 
            className="text-[#C9A962] hover:text-[#b8984f] text-sm font-medium"
          >
            Виж всички →
          </Link>
        </div>

        <div className="space-y-3">
          {upcomingTasks.slice(0, 5).map((task) => {
            const daysLeft = getDaysUntilDeadline(task.deadline);
            return (
              <div 
                key={task.id}
                className="flex items-center justify-between p-4 rounded-xl bg-[#faf7f2] border border-[#e8e0d5] hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-2 h-12 rounded-full
                    ${daysLeft <= 3 ? 'bg-red-500' : daysLeft <= 7 ? 'bg-amber-500' : 'bg-[#C9A962]'}
                  `} />
                  <div>
                    <h3 className="font-semibold text-[#3A2E35]">{task.title}</h3>
                    <p className="text-sm text-gray-500">{getCategoryLabel(task.category)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#3A2E35]">{formatDate(task.deadline)}</p>
                  <p className={`text-sm ${daysLeft <= 3 ? 'text-red-600' : 'text-gray-500'}`}>
                    {daysLeft === 0 ? 'Днес!' : daysLeft === 1 ? 'Утре' : `${daysLeft} дни`}
                  </p>
                </div>
              </div>
            );
          })}

          {upcomingTasks.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Няма предстоящи задачи за следващите 30 дни
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  href, 
  highlight,
  alert 
}: { 
  title: string; 
  value: string | number; 
  icon: any; 
  href: string;
  highlight?: boolean;
  alert?: boolean;
}) {
  return (
    <Link 
      href={href}
      className={`
        block p-6 rounded-2xl border transition-all hover:shadow-lg
        ${highlight ? 'bg-[#C9A962] border-[#C9A962] text-[#3A2E35]' : 
          alert ? 'bg-red-50 border-red-200 text-red-900' : 
          'bg-white border-[#e8e0d5] text-[#3A2E35]'}
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium mb-1 ${highlight || alert ? 'opacity-90' : 'text-gray-500'}`}>
            {title}
          </p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className={`
          p-3 rounded-xl
          ${highlight ? 'bg-[#3A2E35]/10' : alert ? 'bg-red-100' : 'bg-[#faf7f2]'}
        `}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Link>
  );
}
