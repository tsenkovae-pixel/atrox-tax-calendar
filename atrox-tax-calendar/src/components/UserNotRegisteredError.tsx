"use client";

import { Shield, Mail } from "lucide-react";

export default function UserNotRegisteredError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F5F2]">
      <div className="max-w-md w-full mx-4 bg-white rounded-2xl shadow-lg border border-[#e8e0d5] p-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-amber-600" />
        </div>
        <h2 className="text-xl font-bold text-[#3A2E35] mb-2">Достъпът е ограничен</h2>
        <p className="text-gray-600 mb-6">
          Този акаунт няма достъп до приложението. Моля, свържете се с администратор за повече информация.
        </p>
        <a 
          href="mailto:support@atrox.bg"
          className="inline-flex items-center gap-2 text-[#C9A962] hover:text-[#b8984f] font-medium"
        >
          <Mail className="w-5 h-5" />
          Свържете се с поддръжка
        </a>
      </div>
    </div>
  );
}
