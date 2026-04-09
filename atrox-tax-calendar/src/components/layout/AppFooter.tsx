"use client";

import Link from "next/link";

export default function AppFooter() {
  return (
    <footer 
      className="border-t mt-8 py-5 px-6 text-center"
      style={{ borderColor: "#E8E4E0", background: "#F7F5F2" }}
    >
      <p className="text-xs" style={{ color: "#9A9A9A" }}>
        © 2026 Atrox Tax Calendar&nbsp;&nbsp;|&nbsp;&nbsp;
        Информацията не е данъчна консултация&nbsp;&nbsp;|&nbsp;&nbsp;
        <Link 
          href="/terms" 
          className="hover:underline"
          style={{ color: "#C9A962" }}
        >
          Правна информация
        </Link>
      </p>
    </footer>
  );
}
