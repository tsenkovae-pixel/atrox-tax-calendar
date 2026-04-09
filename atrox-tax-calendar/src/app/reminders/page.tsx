'use client';

import React, { useEffect, useState } from 'react';
import { TaxTask } from '@/types/tax';
import { taxCalendarData } from '@/data/taxCalendar';

interface Notification {
  id: string;
  title: string;
  deadline: string;
  category: string;
  daysLeft: number;
  priority: 'urgent' | 'warning' | 'normal';
}

export default function RemindersPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const today = new Date();
    const tasks: TaxTask[] = taxCalendarData; // Или от API/state

    const getDaysUntilDeadline = (deadline: string) => {
      const deadlineDate = new Date(deadline);
      const diffTime = deadlineDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };

    const notifs = tasks.map(task => {
      const daysLeft = getDaysUntilDeadline(task.deadline);
      
      return {
        id: task.id,
        title: task.title,
        deadline: task.deadline,
        category: task.category,
        daysLeft: daysLeft,
        priority: daysLeft <= 3 ? 'urgent' : daysLeft <= 7 ? 'warning' : 'normal'
      };
    });

    setNotifications(notifs);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Напомняния</h1>
      
      {notifications.length === 0 ? (
        <p>Няма предстоящи задачи</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 rounded-lg border ${
                notif.priority === 'urgent' 
                  ? 'bg-red-50 border-red-200' 
                  : notif.priority === 'warning'
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{notif.title}</h3>
                  <p className="text-sm text-gray-600">
                    Категория: {notif.category}
                  </p>
                  <p className="text-sm text-gray-600">
                    Краен срок: {new Date(notif.deadline).toLocaleDateString('bg-BG')}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    notif.priority === 'urgent' 
                      ? 'bg-red-100 text-red-800' 
                      : notif.priority === 'warning'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {notif.daysLeft === 0 
                      ? 'Днес!' 
                      : notif.daysLeft === 1 
                      ? 'Утре' 
                      : `След ${notif.daysLeft} дни`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
