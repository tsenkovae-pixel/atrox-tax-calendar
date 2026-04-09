"use client";

import { Shield, FileText, Scale, AlertCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center pb-6 border-b border-[#e8e0d5]">
        <Shield className="w-16 h-16 mx-auto mb-4 text-[#C9A962]" />
        <h1 className="text-3xl font-serif font-bold text-[#3A2E35] mb-2">
          Правна информация
        </h1>
        <p className="text-[#3A2E35]/60">
          Условия за ползване и правна рамка
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-[#C9A962]" />
            <h2 className="text-xl font-bold text-[#3A2E35]">Отказ от отговорност</h2>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="text-amber-900 leading-relaxed">
              <strong>Важно:</strong> Atrox Tax Calendar е инструмент за планиране и организация. 
              Информацията, представена в това приложение, е с общ информационен характер и 
              <strong> не представлява данъчна консултация</strong>. За конкретни данъчни въпроси 
              се обърнете към квалифициран данъчен консултант или счетоводител.
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-6 h-6 text-[#C9A962]" />
            <h2 className="text-xl font-bold text-[#3A2E35]">Правна рамка</h2>
          </div>
          <div className="bg-white border border-[#e8e0d5] rounded-xl p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Приложението работи съгласно действащото законодателство на Република България, включително:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#C9A962] mt-1">•</span>
                <span>Закон за данък върху добавената стойност (ЗДДС)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A962] mt-1">•</span>
                <span>Закон за данъците върху доходите на физическите лица (ЗДДФЛ)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A962] mt-1">•</span>
                <span>Закон за корпоративното подоходно облагане (ЗКПО)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A962] mt-1">•</span>
                <span>Кодекс за социално осигуряване (КСО)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C9A962] mt-1">•</span>
                <span>Закон за счетоводството</span>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-[#C9A962]" />
            <h2 className="text-xl font-bold text-[#3A2E35]">Актуалност на данните</h2>
          </div>
          <div className="bg-white border border-[#e8e0d5] rounded-xl p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              Сроковете в календара са базирани на нормативната уредба към началото на 2026 г. 
              При промени в законодателството или издадени указания от компетентните органи 
              (НАП, НОИ, НСИ), потребителят следва сам да провери актуалните срокове.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Препоръчваме редовно следене на официалните сайтове на:
            </p>
            <ul className="mt-3 space-y-1 text-gray-700">
              <li>• Национална агенция за приходите (НАП)</li>
              <li>• Национален осигурителен институт (НОИ)</li>
              <li>• Национален статистически институт (НСИ)</li>
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-[#C9A962]" />
            <h2 className="text-xl font-bold text-[#3A2E35]">Защита на данните</h2>
          </div>
          <div className="bg-white border border-[#e8e0d5] rounded-xl p-6">
            <p className="text-gray-700 leading-relaxed">
              Atrox Tax Calendar съхранява данните локално във Вашия браузър. 
              Ние не събираме, не обработваме и не предаваме лични данни на трети страни. 
              Всяка информация за фирми и задачи се пази само на Вашето устройство.
            </p>
          </div>
        </section>
      </div>

      <div className="text-center pt-6 border-t border-[#e8e0d5] text-sm text-gray-500">
        <p>Последна актуализация: Януари 2026</p>
        <p className="mt-1">© 2026 Atrox Accounting. Всички права запазени.</p>
      </div>
    </div>
  );
}
