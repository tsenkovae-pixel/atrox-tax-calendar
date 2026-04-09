"use client";

import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";

export default function PageNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-[#faf7f2] border border-[#e8e0d5] flex items-center justify-center">
          <FileQuestion className="w-12 h-12 text-[#C9A962]" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-[#3A2E35] mb-2">404</h1>
          <p className="text-gray-500 text-lg">Страницата не е намерена</p>
        </div>
        <Link 
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A962] hover:bg-[#b8984f] text-[#3A2E35] font-semibold rounded-xl transition-colors"
        >
          <Home className="w-5 h-5" />
          Към началото
        </Link>
      </div>
    </div>
  );
}
