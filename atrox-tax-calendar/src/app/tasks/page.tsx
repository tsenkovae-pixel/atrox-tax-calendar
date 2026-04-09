"use client";

import { useState } from "react";
import { useTaxStore } from "@/lib/store";
import { generateAnnualTasks } from "@/data/taxTasks";
import { formatDate, getCategoryLabel, getDaysUntilDeadline, getPriorityColor } from "@/lib/utils";
import { exportTasksToExcel } from "@/utils/excelExport";
import { 
  ClipboardList, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter,
  Download,
  FileSpreadsheet
} from "lucide-react";

export default function TasksPage() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState("");

  const { checklist } = useTaxStore();
  const currentYear = new Date().getFullYear();
  const allTasks = generateAnnualTasks(currentYear);

  const filteredTasks = allTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;

    if (filter === 'all') return matchesSearch && matchesCategory;

    const isCompleted = checklist.some(c => c.taskId === task.id && c.completed);
    if (filter === 'completed') return isCompleted && matchesSearch && matchesCategory;
    return !isCompleted && matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'Всички категории' },
    { value: 'vat', label: 'ДДС' },
    { value: 'salary', label: 'Заплати' },
    { value: 'insurance', label: 'Осигуровки' },
    { value: 'annual_tax', label: 'Годишни данъци' },
    { value: 'statistics', label: 'Статистика' },
  ];

  const handleExportExcel = () => {
    exportTasksToExcel(filteredTasks, 'vsichki-zadachi-2026');
  };

  return (
    <div className="space-y-6">
      {/* Header with Export Button */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#3A2E35] mb-2">
            Всички данъчни задължения за 2026
          </h1>
          <p className="text-[#3A2E35]/60">
            Списък с данъци и такси — {allTasks.length} записа
          </p>
        </div>

        <button
          onClick={handleExportExcel}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#C9A962] hover:bg-[#b8984f] text-[#3A2E35] font-semibold rounded-xl transition-colors shadow-sm"
        >
          <Download className="w-5 h-5" />
          Експорт Excel
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox 
          title="Общо задачи" 
          value={allTasks.length} 
          icon={ClipboardList}
          color="#C9A962"
        />
        <StatBox 
          title="Изпълнени" 
          value={checklist.filter(c => c.completed).length} 
          icon={CheckCircle2}
          color="#22c55e"
        />
        <StatBox 
          title="Предстоящи" 
          value={allTasks.filter(t => new Date(t.deadline) > new Date()).length} 
          icon={Clock}
          color="#3b82f6"
        />
        <StatBox 
          title="Спешни" 
          value={allTasks.filter(t => getDaysUntilDeadline(t.deadline) <= 7 && getDaysUntilDeadline(t.deadline) >= 0).length} 
          icon={AlertCircle}
          color="#ef4444"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Търсене на задачи..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-[#e8e0d5] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A962]"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-[#e8e0d5] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A962]"
        >
          {categories.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        <div className="flex bg-white rounded-xl border border-[#e8e0d5] p-1">
          {(['all', 'pending', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${filter === f 
                  ? 'bg-[#C9A962] text-[#3A2E35]' 
                  : 'text-gray-600 hover:bg-gray-100'}
              `}
            >
              {f === 'all' ? 'Всички' : f === 'pending' ? 'Предстоящи' : 'Изпълнени'}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e0d5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#faf7f2] border-b border-[#e8e0d5]">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-bold text-[#3A2E35]/70 uppercase">Задача</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-[#3A2E35]/70 uppercase">Тип</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-[#3A2E35]/70 uppercase">Краен срок</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-[#3A2E35]/70 uppercase">Дни</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-[#3A2E35]/70 uppercase">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e0d5]">
              {filteredTasks.map((task) => {
                const daysLeft = getDaysUntilDeadline(task.deadline);
                const isCompleted = checklist.some(c => c.taskId === task.id && c.completed);

                return (
                  <tr 
                    key={task.id} 
                    className={`hover:bg-[#faf7f2]/50 transition-colors ${daysLeft <= 7 && daysLeft >= 0 ? 'bg-amber-50/50' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#3A2E35]">{task.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {getCategoryLabel(task.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#3A2E35]">
                      {formatDate(task.deadline)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`
                        text-sm font-medium
                        ${daysLeft <= 3 ? 'text-red-600' : 
                          daysLeft <= 7 ? 'text-amber-600' : 'text-gray-500'}
                      `}>
                        {daysLeft === 0 ? 'Днес' : 
                         daysLeft < 0 ? 'Просрочено' : 
                         `${daysLeft} дни`}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`
                        flex items-center gap-2 text-sm
                        ${isCompleted ? 'text-green-600' : 'text-gray-500'}
                      `}>
                        <span className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                        {isCompleted ? 'Изпълнено' : 'Предстоящо'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <ClipboardList className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500">Няма намерени задачи</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatBox({ title, value, icon: Icon, color }: { title: string; value: number; icon: any; color: string }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-[#e8e0d5] flex items-center gap-3">
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: `${color}20` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-[#3A2E35]">{value}</p>
      </div>
    </div>
  );
}
