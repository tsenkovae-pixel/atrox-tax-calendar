"use client";

import { useState } from "react";
import { useTaxStore } from "@/lib/store";
import { getTasksByMonth, generateAnnualTasks } from "@/data/taxTasks";
import { formatDate, getCategoryLabel, getDaysUntilDeadline } from "@/lib/utils";
import { exportTasksToExcel } from "@/utils/excelExport";
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Building2, 
  Download,
  Plus,
  FileText
} from "lucide-react";

const months = [
  "Януари", "Февруари", "Март", "Април", "Май", "Юни",
  "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"
];

const categories = [
  { value: 'all', label: 'Всички' },
  { value: 'vat', label: 'ДДС' },
  { value: 'insurance', label: 'Осигуровки' },
  { value: 'annual_tax', label: 'Корпоративен данък' },
  { value: 'other', label: 'Други' },
];

export default function ChecklistPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedFirm, setSelectedFirm] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { firms, checklist, toggleChecklistItem } = useTaxStore();
  const currentYear = new Date().getFullYear();

  const tasks = getTasksByMonth(currentYear, selectedMonth);
  const activeFirms = firms.filter(f => f.active);

  const getTaskStatus = (taskId: string, firmId: string) => {
    const item = checklist.find(c => c.taskId === taskId && c.firmId === firmId);
    return item?.completed || false;
  };

  const filteredTasks = tasks.filter(task => 
    selectedCategory === 'all' || task.category === selectedCategory
  );

  const completedCount = checklist.filter(c => c.completed).length;
  const totalCount = tasks.length * activeFirms.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleExport = () => {
    const tasksToExport = filteredTasks.map(task => ({
      ...task,
      completed: getTaskStatus(task.id, selectedFirm === 'all' ? firms[0]?.id : selectedFirm)
    }));
    exportTasksToExcel(tasksToExport, `mesechen-cheklist-${months[selectedMonth]}-2026`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#3A2E35] mb-2">
            Месечен чеклист
          </h1>
          <p className="text-[#3A2E35]/60">
            Управление на данъчните задължения и персонализирани задачи
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#faf7f2] hover:bg-[#e8e0d5] text-[#3A2E35] font-medium rounded-xl transition-colors border border-[#e8e0d5]"
          >
            <Download className="w-5 h-5" />
            Експорт
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C9A962] hover:bg-[#b8984f] text-[#3A2E35] font-semibold rounded-xl transition-colors"
          >
            <Plus className="w-5 h-5" />
            Добави задача
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e0d5] p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-[#3A2E35]">Прогрес</span>
          <span className="text-sm font-bold text-[#3A2E35]">
            Изпълнени {completedCount} от {totalCount} ({progressPercentage}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-[#C9A962] h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-2 bg-white rounded-xl border border-[#e8e0d5] p-1">
          <button 
            className="p-2 hover:bg-[#faf7f2] rounded-lg"
            onClick={() => setSelectedMonth(m => m === 0 ? 11 : m - 1)}
          >
            ←
          </button>
          <span className="px-4 py-2 font-medium text-[#3A2E35] min-w-[140px] text-center">
            {months[selectedMonth]} 2026
          </span>
          <button 
            className="p-2 hover:bg-[#faf7f2] rounded-lg"
            onClick={() => setSelectedMonth(m => m === 11 ? 0 : m + 1)}
          >
            →
          </button>
        </div>

        <select
          value={selectedFirm}
          onChange={(e) => setSelectedFirm(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-[#e8e0d5] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A962] text-[#3A2E35]"
        >
          <option value="all">Всички фирми</option>
          {activeFirms.map(firm => (
            <option key={firm.id} value={firm.id}>{firm.name}</option>
          ))}
        </select>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${selectedCategory === cat.value 
                  ? 'bg-[#3A2E35] text-white' 
                  : 'bg-white border border-[#e8e0d5] text-[#3A2E35] hover:bg-[#faf7f2]'}
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-[#C9A962] font-medium mb-4">
          <Calendar className="w-4 h-4" />
          <span className="uppercase tracking-wider">Петък, 24 април</span>
        </div>

        {filteredTasks.map(task => {
          const firmsToShow = selectedFirm === "all" 
            ? activeFirms.slice(0, 4) 
            : activeFirms.filter(f => f.id === selectedFirm);

          if (firmsToShow.length === 0) return null;

          return firmsToShow.map(firm => {
            const isCompleted = getTaskStatus(task.id, firm.id);

            return (
              <div 
                key={`${task.id}-${firm.id}`}
                className="bg-white rounded-2xl shadow-sm border border-[#e8e0d5] p-5 flex items-start gap-4 hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleChecklistItem(task.id, firm.id)}
                  className={`
                    flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all mt-1
                    ${isCompleted 
                      ? 'bg-[#C9A962] border-[#C9A962] text-white' 
                      : 'border-gray-300 hover:border-[#C9A962]'}
                  `}
                >
                  {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-[#3A2E35]">{firm.name}</h3>
                    <span className="text-xs text-[#C9A962] uppercase tracking-wider">ОСИГУРОВКИ</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-700">CUSTOM</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{task.title}</p>
                  <div className="flex items-center gap-2 text-sm text-[#C9A962]">
                    <FileText className="w-4 h-4" />
                    <span>1 файл</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-[#3A2E35] transition-colors">
                    ✏️
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    🗑️
                  </button>
                </div>
              </div>
            );
          });
        })}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#e8e0d5]">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500">Няма задачи за избрания месец/категория</p>
          </div>
        )}
      </div>
    </div>
  );
}
