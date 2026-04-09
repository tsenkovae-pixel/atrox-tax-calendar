"use client";

import { useState } from "react";
import { useTaxStore } from "@/lib/store";
import { Building2, Plus, Search, MoreVertical, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

export default function Companies() {
  const { firms, deleteFirm } = useTaxStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFirms = firms.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.eik.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#3A2E35] mb-1">
            Фирми
          </h1>
          <p className="text-[#3A2E35]/60">
            Управление на клиентските фирми
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#3A2E35] hover:bg-[#2a2026] text-white font-medium rounded-xl transition-colors">
          <Plus className="w-5 h-5" />
          Добави фирма
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Търсене по име или ЕИК..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#e8e0d5] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A962]"
        />
      </div>

      {/* Companies Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e0d5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#faf7f2] border-b border-[#e8e0d5]">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-bold text-[#3A2E35]/70 uppercase tracking-wider">Фирма</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-[#3A2E35]/70 uppercase tracking-wider">ЕИК</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-[#3A2E35]/70 uppercase tracking-wider">МОЛ</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-[#3A2E35]/70 uppercase tracking-wider">ДДС</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-[#3A2E35]/70 uppercase tracking-wider">Статус</th>
                <th className="text-right px-6 py-4 text-sm font-bold text-[#3A2E35]/70 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e0d5]">
              {filteredFirms.map((firm) => (
                <tr key={firm.id} className="hover:bg-[#faf7f2]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#C9A962]/10 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-[#C9A962]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#3A2E35]">{firm.name}</p>
                        <p className="text-sm text-gray-500">{firm.type.toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#3A2E35]">{firm.eik}</td>
                  <td className="px-6 py-4 text-[#3A2E35]">{firm.mol}</td>
                  <td className="px-6 py-4">
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${firm.vatType === 'monthly' ? 'bg-blue-100 text-blue-800' : 
                        firm.vatType === 'quarterly' ? 'bg-amber-100 text-amber-800' : 
                        'bg-gray-100 text-gray-800'}
                    `}>
                      {firm.vatType === 'monthly' ? 'Месечен' : 
                       firm.vatType === 'quarterly' ? 'Тримесечен' : 'Не се регистрира'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${firm.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    `}>
                      {firm.active ? 'Активна' : 'Неактивна'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-[#e8e0d5] rounded-lg transition-colors text-gray-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteFirm(firm.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredFirms.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Няма намерени фирми</p>
                    <p className="text-sm mt-1">Добавете първата фирма, за да започнете</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
