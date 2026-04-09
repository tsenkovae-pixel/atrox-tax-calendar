"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { getTasksByMonth, generateAnnualTasks } from "@/data/taxTasks";
import { formatDate, getCategoryLabel, getDaysUntilDeadline } from "@/lib/utils";
import { useTaxStore } from "@/lib/store";

const months = [
  "Януари", "Февруари", "Март", "Април", "Май", "Юни",
  "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { checklist } = useTaxStore();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const tasks = getTasksByMonth(year, month);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Monday start

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#3A2E35] mb-1">
            Данъчен календар
          </h1>
          <p className="text-[#3A2E35]/60">
            Всички срокове и задължения за {year}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={prevMonth}
            className="p-2 hover:bg-[#e8e0d5] rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#3A2E35]" />
          </button>
          <div className="px-4 py-2 bg-white border border-[#e8e0d5] rounded-lg font-semibold text-[#3A2E35] min-w-[140px] text-center">
            {months[month]} {year}
          </div>
          <button 
            onClick={nextMonth}
            className="p-2 hover:bg-[#e8e0d5] rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-[#3A2E35]" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#e8e0d5] p-6">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map(day => (
              <div key={day} className="text-center text-sm font-bold text-[#3A2E35]/50 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: startingDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayTasks = tasks.filter(t => new Date(t.deadline).getDate() === day);
              const hasTasks = dayTasks.length > 0;
              const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

              return (
                <div 
                  key={day}
                  className={`
                    aspect-square p-2 rounded-xl border transition-all cursor-pointer hover:shadow-md
                    ${isToday ? 'border-[#C9A962] bg-[#C9A962]/10' : 'border-[#e8e0d5]'}
                    ${hasTasks ? 'bg-[#faf7f2]' : 'bg-white'}
                  `}
                >
                  <div className="font-semibold text-sm text-[#3A2E35]">{day}</div>
                  {hasTasks && (
                    <div className="mt-1 space-y-1">
                      {dayTasks.slice(0, 2).map((task, idx) => (
                        <div 
                          key={idx}
                          className={`
                            text-[10px] px-1.5 py-0.5 rounded truncate
                            ${task.priority === 'high' ? 'bg-red-100 text-red-700' : 
                              task.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 
                              'bg-green-100 text-green-700'}
                          `}
                        >
                          {task.title}
                        </div>
                      ))}
                      {dayTasks.length > 2 && (
                        <div className="text-[10px] text-gray-500 pl-1">+{dayTasks.length - 2}</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e0d5] p-6">
          <h2 className="text-lg font-bold text-[#3A2E35] mb-4">
            Задачи за {months[month]}
          </h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Няма задачи за този месец</p>
            ) : (
              tasks.map(task => {
                const daysLeft = getDaysUntilDeadline(task.deadline);
                return (
                  <div 
                    key={task.id}
                    className="p-4 rounded-xl bg-[#faf7f2] border border-[#e8e0d5]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-[#3A2E35] text-sm">{task.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{getCategoryLabel(task.category)}</p>
                      </div>
                      <span className={`
                        text-xs px-2 py-1 rounded-full whitespace-nowrap
                        ${task.priority === 'high' ? 'bg-red-100 text-red-700' : 
                          task.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 
                          'bg-green-100 text-green-700'}
                      `}>
                        {daysLeft === 0 ? 'Днес' : `${daysLeft}д`}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{formatDate(task.deadline)}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
