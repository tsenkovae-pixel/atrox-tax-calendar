"use client";

import * as XLSX from 'xlsx';
import { TaxTask, Firm } from '@/types';

export function exportTasksToExcel(tasks: TaxTask[], filename: string = 'danuchni-zadachi') {
  // Prepare data for Excel
  const data = tasks.map(task => ({
    'Задача': task.title,
    'Описание': task.description,
    'Категория': getCategoryLabel(task.category),
    'Краен срок': task.deadline,
    'Тип': task.deadlineType === 'monthly' ? 'Месечно' : 
           task.deadlineType === 'quarterly' ? 'Тримесечно' : 'Годишно',
    'Приоритет': task.priority === 'high' ? 'Висок' : 
                 task.priority === 'medium' ? 'Среден' : 'Нисък',
    'Статус': task.completed ? 'Изпълнено' : 'Предстоящо'
  }));

  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // Set column widths
  const colWidths = [
    { wch: 40 }, // Задача
    { wch: 50 }, // Описание
    { wch: 15 }, // Категория
    { wch: 12 }, // Краен срок
    { wch: 15 }, // Тип
    { wch: 10 }, // Приоритет
    { wch: 12 }, // Статус
  ];
  ws['!cols'] = colWidths;

  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Данъчни задачи');

  // Generate Excel file
  XLSX.writeFile(wb, `${filename}-${new Date().toISOString().split('T')[0]}.xlsx`);
}

export function exportFirmsToExcel(firms: Firm[], filename: string = 'firmi') {
  const data = firms.map(firm => ({
    'Име': firm.name,
    'ЕИК': firm.eik,
    'Вид': firm.type.toUpperCase(),
    'МОЛ': firm.mol,
    'Адрес': firm.address,
    'Email': firm.email,
    'Телефон': firm.phone,
    'ДДС режим': firm.vatType === 'monthly' ? 'Месечен' : 
                 firm.vatType === 'quarterly' ? 'Тримесечен' : 'Не се регистрира',
    'Служители': firm.employees,
    'Статус': firm.active ? 'Активна' : 'Неактивна'
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  ws['!cols'] = [
    { wch: 30 }, { wch: 12 }, { wch: 10 }, { wch: 20 }, 
    { wch: 30 }, { wch: 25 }, { wch: 15 }, { wch: 18 }, { wch: 12 }, { wch: 12 }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Фирми');
  XLSX.writeFile(wb, `${filename}-${new Date().toISOString().split('T')[0]}.xlsx`);
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'vat': 'ДДС',
    'salary': 'Заплати',
    'insurance': 'Осигуровки',
    'annual_tax': 'Годишни данъци',
    'statistics': 'Статистика',
    'other': 'Други'
  };
  return labels[category] || category;
}
