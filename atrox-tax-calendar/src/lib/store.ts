import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Firm, OfficeSettings, ChecklistItem, TaxTask } from '@/types';
import { generateAnnualTasks } from '@/data/taxTasks';

interface TaxStore {
  // Settings
  office: OfficeSettings;
  setOffice: (office: OfficeSettings) => void;

  // Firms
  firms: Firm[];
  addFirm: (firm: Firm) => void;
  updateFirm: (id: string, firm: Partial<Firm>) => void;
  deleteFirm: (id: string) => void;
  getActiveFirms: () => Firm[];

  // Checklist
  checklist: ChecklistItem[];
  toggleChecklistItem: (taskId: string, firmId: string) => void;
  addChecklistNote: (taskId: string, firmId: string, note: string) => void;

  // Tasks
  getTasksForFirm: (firmId: string, year: number) => TaxTask[];

  // Stats
  getCompletionStats: (year: number, month: number) => {
    total: number;
    completed: number;
    percentage: number;
  };
}

// Sample firms for demonstration
const sampleFirms: Firm[] = [
  {
    id: "firm-1",
    name: "Атрокс Консулт ЕООД",
    eik: "200950798",
    vatNumber: "BG200950798",
    address: "гр. София, ул. Примерна 123",
    mol: "Елена Ценкова",
    email: "contact@atrox.bg",
    phone: "+359 888 123 456",
    type: "eood",
    vatType: "monthly",
    employees: 5,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "firm-2",
    name: "Техно Трейд ООД",
    eik: "123456789",
    vatNumber: "BG123456789",
    address: "гр. София, бул. България 1",
    mol: "Иван Иванов",
    email: "office@technotrade.bg",
    phone: "+359 888 999 888",
    type: "ood",
    vatType: "quarterly",
    employees: 12,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "firm-3",
    name: "Мария Петрова ЕТ",
    eik: "987654321",
    address: "гр. Пловдив, ул. Централна 5",
    mol: "Мария Петрова",
    email: "maria@example.bg",
    phone: "+359 877 123 456",
    type: "et",
    vatType: "no_vat",
    employees: 0,
    active: true,
    createdAt: new Date().toISOString(),
  },
];

export const useTaxStore = create<TaxStore>()(
  persist(
    (set, get) => ({
      // Default office settings
      office: {
        name: 'Атрокс Акаунтинг енд Файненс ЕООД',
        eik: '200950798',
        manager: 'Елена Ценкова',
        email: 'atroxacc@gmail.com',
        phone: '+359 888 123 456',
        address: 'гр. София, ул. Примерна 123'
      },
      setOffice: (office) => set({ office }),

      // Firms - initialize with sample data
      firms: sampleFirms,
      addFirm: (firm) => set((state) => ({ 
        firms: [...state.firms, firm] 
      })),
      updateFirm: (id, updatedFirm) => set((state) => ({
        firms: state.firms.map(f => f.id === id ? { ...f, ...updatedFirm } : f)
      })),
      deleteFirm: (id) => set((state) => ({
        firms: state.firms.filter(f => f.id !== id)
      })),
      getActiveFirms: () => get().firms.filter(f => f.active),

      // Checklist
      checklist: [],
      toggleChecklistItem: (taskId, firmId) => set((state) => {
        const existing = state.checklist.find(
          item => item.taskId === taskId && item.firmId === firmId
        );

        if (existing) {
          return {
            checklist: state.checklist.map(item =>
              item.taskId === taskId && item.firmId === firmId
                ? { ...item, completed: !item.completed, completedAt: !item.completed ? new Date().toISOString() : undefined }
                : item
            )
          };
        } else {
          return {
            checklist: [...state.checklist, {
              id: `${taskId}-${firmId}`,
              taskId,
              firmId,
              completed: true,
              completedAt: new Date().toISOString(),
              notes: ''
            }]
          };
        }
      }),
      addChecklistNote: (taskId, firmId, note) => set((state) => ({
        checklist: state.checklist.map(item =>
          item.taskId === taskId && item.firmId === firmId
            ? { ...item, notes: note }
            : item
        )
      })),

      // Tasks
      getTasksForFirm: (firmId, year) => {
        const firm = get().firms.find(f => f.id === firmId);
        if (!firm) return [];

        const baseTasks = generateAnnualTasks(year);
        const checklist = get().checklist;

        return baseTasks.map(task => {
          const checkItem = checklist.find(
            c => c.taskId === task.id && c.firmId === firmId
          );
          return {
            ...task,
            firmId,
            completed: checkItem?.completed || false,
            notes: checkItem?.notes
          };
        });
      },

      // Stats
      getCompletionStats: (year, month) => {
        const { firms, checklist } = get();
        const baseTasks = generateAnnualTasks(year).filter(
          t => new Date(t.deadline).getMonth() === month
        );

        const total = baseTasks.length * firms.length;
        const completed = checklist.filter(c => {
          const task = baseTasks.find(t => t.id === c.taskId);
          return task && c.completed;
        }).length;

        return {
          total,
          completed,
          percentage: total > 0 ? Math.round((completed / total) * 100) : 0
        };
      }
    }),
    {
      name: 'atrox-tax-storage',
    }
  )
);
