"use client";

import { useEffect, useState } from "react";
import { useTaxStore } from "@/lib/store";
import { getUpcomingTasks } from "@/data/taxTasks";
import { formatDate, getDaysUntilDeadline, getCategoryLabel } from "@/lib/utils";
import { Bell, CheckCircle2, AlertTriangle, Clock, X } from "lucide-react";

export default function RemindersPage() {
  const { firms } = useTaxStore();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const upcoming = getUpcomingTasks(currentYear, 30);

    // Create notifications for urgent tasks
    const urgentTasks = upcoming.filter(task => {
      const daysLeft = getDaysUntilDeadline(task.deadline);
      return daysLeft <= 7 && daysLeft >= 0;
    });

    const notifs = urgentTasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      category: task.category,
      daysLeft: getDaysUntilDeadline(task.deadline),
      priority: task.daysLeft <= 3 ? 'urgent' : 'warning'
    }));

    setNotifications(notifs);
  }, []);

  const dismissNotification = (id: string) => {
    setDismissed([...dismissed, id]);
  };

  const activeNotifications = notifications.filter(n => !dismissed.includes(n.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#3A2E35] mb-2">
          Известия
        </h1>
        <p className="text-[#3A2E35]/60">
          Важни напомняния за наближаващи срокове
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-200 p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-sm text-red-700">Критични (0-3 дни)</p>
              <p className="text-2xl font-bold text-red-800">
                {activeNotifications.filter(n => n.daysLeft <= 3).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-amber-600" />
            <div>
              <p className="text-sm text-amber-700">Внимание (4-7 дни)</p>
              <p className="text-2xl font-bold text-amber-800">
                {activeNotifications.filter(n => n.daysLeft > 3 && n.daysLeft <= 7).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-blue-700">Общо известия</p>
              <p className="text-2xl font-bold text-blue-800">{activeNotifications.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {activeNotifications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#e8e0d5]">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h3 className="text-lg font-semibold text-[#3A2E35] mb-2">Всичко е наред!</h3>
            <p className="text-gray-500">Няма спешни известия за следващите 7 дни</p>
          </div>
        ) : (
          activeNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`
                relative p-6 rounded-2xl border transition-all
                ${notification.daysLeft <= 3 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-amber-50 border-amber-200'}
              `}
            >
              <button
                onClick={() => dismissNotification(notification.id)}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-black/5 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="flex items-start gap-4">
                <div className={`
                  p-3 rounded-xl
                  ${notification.daysLeft <= 3 ? 'bg-red-100' : 'bg-amber-100'}
                `}>
                  {notification.daysLeft <= 3 ? (
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  ) : (
                    <Clock className="w-6 h-6 text-amber-600" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-[#3A2E35]">
                      {notification.title}
                    </h3>
                    <span className={`
                      px-2 py-0.5 rounded-full text-xs font-medium
                      ${notification.daysLeft <= 3 
                        ? 'bg-red-200 text-red-800' 
                        : 'bg-amber-200 text-amber-800'}
                    `}>
                      {notification.daysLeft === 0 
                        ? 'ДНЕС!' 
                        : notification.daysLeft === 1 
                          ? 'Утре' 
                          : `${notification.daysLeft} дни`}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-3">{notification.description}</p>

                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-500">
                      Краен срок: <strong className="text-[#3A2E35]">{formatDate(notification.deadline)}</strong>
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
                      {getCategoryLabel(notification.category)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
