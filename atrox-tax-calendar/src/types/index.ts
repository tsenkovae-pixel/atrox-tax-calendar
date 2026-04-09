export interface TaxTask {
  id: string;
  title: string;
  description: string;
  deadline: string; // ISO date
  deadlineType: 'fixed' | 'monthly' | 'quarterly' | 'annual';
  category: 'vat' | 'salary' | 'insurance' | 'annual_tax' | 'statistics' | 'other';
  responsible: 'accountant' | 'manager' | 'client';
  priority: 'high' | 'medium' | 'low';
  firmId?: string;
  completed: boolean;
  completedDate?: string;
  notes?: string;
}

export interface Firm {
  id: string;
  name: string;
  eik: string;
  vatNumber?: string;
  address: string;
  mol: string; // МОЛ
  email: string;
  phone: string;
  type: 'et' | 'ood' | 'eood' | 'ad' | 'kd';
  vatType: 'monthly' | 'quarterly' | 'no_vat';
  employees: number;
  active: boolean;
  createdAt: string;
}

export interface OfficeSettings {
  name: string;
  eik: string;
  manager: string;
  email: string;
  phone: string;
  address: string;
}

export interface ChecklistItem {
  id: string;
  taskId: string;
  firmId: string;
  completed: boolean;
  completedAt?: string;
  notes: string;
}

export interface CalendarEvent {
  date: string;
  tasks: TaxTask[];
  isHoliday?: boolean;
  holidayName?: string;
}
