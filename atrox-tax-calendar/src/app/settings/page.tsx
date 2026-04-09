"use client";

import { useState } from "react";
import { Save, Building, Mail, User, FileText } from "lucide-react";
import { useTaxStore } from "@/lib/store";

export default function SettingsPage() {
  const { office, setOffice } = useTaxStore();
  const [formData, setFormData] = useState(office);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOffice(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-[#e8e0d5] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A962] focus:border-transparent transition-all text-[#3A2E35] placeholder:text-gray-400";
  const labelClasses = "block text-xs font-bold tracking-wider text-[#3A2E35]/70 uppercase mb-2";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-[#3A2E35] mb-2">
          Настройки
        </h1>
        <p className="text-[#3A2E35]/60">
          Информация за счетоводната кантора
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e8e0d5] p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Office Name */}
          <div>
            <label className={labelClasses}>
              Наименование на кантората
            </label>
            <div className="relative">
              <Building className="absolute left-4 top-3.5 w-5 h-5 text-[#C9A962]" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`${inputClasses} pl-12`}
                placeholder="Име на кантората"
              />
            </div>
          </div>

          {/* EIK / BULSTAT */}
          <div>
            <label className={labelClasses}>
              ЕИК / БУЛСТАТ
            </label>
            <div className="relative">
              <FileText className="absolute left-4 top-3.5 w-5 h-5 text-[#C9A962]" />
              <input
                type="text"
                value={formData.eik}
                onChange={(e) => setFormData({ ...formData, eik: e.target.value })}
                className={`${inputClasses} pl-12`}
                placeholder="200950798"
                maxLength={9}
              />
            </div>
          </div>

          {/* Manager */}
          <div>
            <label className={labelClasses}>
              Главен счетоводител
            </label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-5 h-5 text-[#C9A962]" />
              <input
                type="text"
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                className={`${inputClasses} pl-12`}
                placeholder="Име и фамилия"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={labelClasses}>
              Имейл за контакт
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-[#C9A962]" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`${inputClasses} pl-12`}
                placeholder="office@example.com"
              />
            </div>
          </div>

          {/* Phone - additional field */}
          <div>
            <label className={labelClasses}>
              Телефон за контакт
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-[#C9A962] font-bold text-sm">T</span>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`${inputClasses} pl-12`}
                placeholder="+359 888 123 456"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-[#C9A962] hover:bg-[#b8984f] text-[#3A2E35] font-semibold rounded-xl transition-colors shadow-sm"
            >
              <Save className="w-5 h-5" />
              Запази настройките
            </button>

            {saved && (
              <p className="mt-3 text-green-600 text-sm font-medium">
                ✓ Настройките са запазени успешно!
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
