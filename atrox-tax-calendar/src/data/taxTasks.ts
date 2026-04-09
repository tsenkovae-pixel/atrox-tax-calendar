import { TaxTask } from '@/types';

export const generateAnnualTasks = (year: number): TaxTask[] => {
  const tasks: TaxTask[] = [];

  // === МЕСЕЧНИ ЗАДАЧИ (12 месеца × няколко задачи) ===
  for (let month = 0; month < 12; month++) {
    const monthStr = String(month + 1).padStart(2, '0');
    const prevMonthStr = String(month === 0 ? 12 : month).padStart(2, '0');
    const prevYear = month === 0 ? year - 1 : year;

    // 1. ДДС декларация (до 14-то число)
    tasks.push({
      id: `vat-${year}-${monthStr}`,
      title: 'ДДС декларация',
      description: 'Подаване на декларация по ДДС за предходния месец',
      deadline: `${year}-${monthStr}-14`,
      deadlineType: 'monthly',
      category: 'vat',
      responsible: 'accountant',
      priority: 'high',
      completed: false
    });

    // 2. Справка за начислен и платен ДДС
    tasks.push({
      id: `vat-book-${year}-${monthStr}`,
      title: 'Справка-дневник за ДДС',
      description: 'Изготвяне на справка-дневник за продажби и покупки',
      deadline: `${year}-${monthStr}-14`,
      deadlineType: 'monthly',
      category: 'vat',
      responsible: 'accountant',
      priority: 'high',
      completed: false
    });

    // 3. Осигуровки и данъци (до 25-то число)
    tasks.push({
      id: `insurance-${year}-${monthStr}`,
      title: 'Осигуровки и данъци по ЗДДФЛ',
      description: 'Внасяне на осигуровки и авансов данък по ЗДДФЛ',
      deadline: `${year}-${monthStr}-25`,
      deadlineType: 'monthly',
      category: 'insurance',
      responsible: 'accountant',
      priority: 'high',
      completed: false
    });

    // 4. Заплати
    tasks.push({
      id: `salary-${year}-${monthStr}`,
      title: 'Изплащане на заплати',
      description: 'Изчисляване и изплащане на заплати',
      deadline: `${year}-${monthStr}-28`,
      deadlineType: 'monthly',
      category: 'salary',
      responsible: 'accountant',
      priority: 'high',
      completed: false
    });

    // 5. Интрастат (ако е приложимо) - до 14-то
    if (month % 2 === 1) { // Четни месеци (февруари, април...)
      tasks.push({
        id: `intrastat-${year}-${monthStr}`,
        title: 'Декларация Интрастат',
        description: 'Подаване на статистическа декларация за ВЕТ',
        deadline: `${year}-${monthStr}-14`,
        deadlineType: 'monthly',
        category: 'statistics',
        responsible: 'accountant',
        priority: 'medium',
        completed: false
      });
    }
  }

  // === ТРИМЕСЕЧНИ ЗАДАЧИ ===
  const quarters = [
    { q: 1, end: '03-31', deadline: '04-15' },
    { q: 2, end: '06-30', deadline: '07-15' },
    { q: 3, end: '09-30', deadline: '10-15' },
    { q: 4, end: '12-31', deadline: '01-15' }
  ];

  quarters.forEach(({ q, deadline }) => {
    const yearStr = q === 4 ? year + 1 : year;
    const monthStr = q === 4 ? '01' : String(q * 3 + 1).padStart(2, '0');
    const dayStr = q === 4 ? '15' : '15';

    tasks.push({
      id: `vat-quarter-${year}-${q}`,
      title: `Тримесечна ДДС декларация Q${q}`,
      description: `ДДС декларация за тримесечие ${q}`,
      deadline: `${yearStr}-${monthStr}-${dayStr}`,
      deadlineType: 'quarterly',
      category: 'vat',
      responsible: 'accountant',
      priority: 'high',
      completed: false
    });
  });

  // === ГОДИШНИ ЗАДАЧИ ===

  // 1. Годишна данъчна декларация по ЗДДФЛ (Април)
  tasks.push({
    id: `annual-gddfl-${year}`,
    title: 'ГДД по ЗДДФЛ - физически лица',
    description: 'Годишна данъчна декларация по ЗДДФЛ за самоосигуряващи се лица',
    deadline: `${year}-04-30`,
    deadlineType: 'annual',
    category: 'annual_tax',
    responsible: 'accountant',
    priority: 'high',
    completed: false
  });

  // 2. Годишен финансов отчет (Март/Юни)
  tasks.push({
    id: `gfo-${year}`,
    title: 'Годишен финансов отчет',
    description: 'Подаване на ГФО в Търговския регистър',
    deadline: `${year}-06-30`,
    deadlineType: 'annual',
    category: 'annual_tax',
    responsible: 'accountant',
    priority: 'high',
    completed: false
  });

  // 3. Данък върху печалбата (Март за АД/ЕАД, Юни за ООД)
  tasks.push({
    id: `profit-tax-ood-${year}`,
    title: 'Данък върху печалбата (ООД)',
    description: 'Данъчна декларация по чл. 92 от ЗКПО',
    deadline: `${year}-06-30`,
    deadlineType: 'annual',
    category: 'annual_tax',
    responsible: 'accountant',
    priority: 'high',
    completed: false
  });

  tasks.push({
    id: `profit-tax-ad-${year}`,
    title: 'Данък върху печалбата (АД)',
    description: 'Данъчна декларация по чл. 92 от ЗКПО',
    deadline: `${year}-03-31`,
    deadlineType: 'annual',
    category: 'annual_tax',
    responsible: 'accountant',
    priority: 'high',
    completed: false
  });

  // 4. Декларация по чл. 55 за осигуровки (Февруари)
  tasks.push({
    id: `insurance-55-${year}`,
    title: 'Декларация по чл. 55 за осигуровки',
    description: 'Годишна декларация за доходите и осигурителния стаж',
    deadline: `${year}-02-28`,
    deadlineType: 'annual',
    category: 'insurance',
    responsible: 'accountant',
    priority: 'high',
    completed: false
  });

  // 5. Справка за изплатени доходи на физически лица (Април)
  tasks.push({
    id: `income-report-${year}`,
    title: 'Справка по чл. 73 ЗДДФЛ',
    description: 'Справка за изплатени доходи на физически лица',
    deadline: `${year}-04-30`,
    deadlineType: 'annual',
    category: 'annual_tax',
    responsible: 'accountant',
    priority: 'high',
    completed: false
  });

  // 6. Декларация за облагане с ДОД (Януари)
  tasks.push({
    id: `dod-declaration-${year}`,
    title: 'Декларация за облагане с ДОД',
    description: 'Декларация за авансови вноски за данъци',
    deadline: `${year}-01-31`,
    deadlineType: 'annual',
    category: 'annual_tax',
    responsible: 'accountant',
    priority: 'medium',
    completed: false
  });

  // 7. Средносписъчен брой персонал (Януари)
  tasks.push({
    id: `avg-employees-${year}`,
    title: 'Справка за средносписъчен брой персонал',
    description: 'Подаване на справка към НОИ',
    deadline: `${year}-01-31`,
    deadlineType: 'annual',
    category: 'statistics',
    responsible: 'accountant',
    priority: 'medium',
    completed: false
  });

  // 8. Годишна данъчна декларация за чуждестранни граждани (Декември)
  tasks.push({
    id: `foreign-tax-${year}`,
    title: 'Годишна данъчна декларация (чужденци)',
    description: 'За чуждестранни граждани с постоянно пребиваване',
    deadline: `${year}-12-31`,
    deadlineType: 'annual',
    category: 'annual_tax',
    responsible: 'accountant',
    priority: 'medium',
    completed: false
  });

  // 9. Актуализация на осигурителен доход (Май)
  tasks.push({
    id: `insurance-update-${year}`,
    title: 'Актуализация на осигурителен доход',
    description: 'Деклариране на осигурителен доход за самоосигуряващи се',
    deadline: `${year}-05-31`,
    deadlineType: 'annual',
    category: 'insurance',
    responsible: 'accountant',
    priority: 'medium',
    completed: false
  });

  return tasks;
};

export const getTasksByMonth = (year: number, month: number): TaxTask[] => {
  const allTasks = generateAnnualTasks(year);
  return allTasks.filter(task => {
    const taskDate = new Date(task.deadline);
    return taskDate.getMonth() === month;
  });
};

export const getUpcomingTasks = (year: number, days: number = 30): TaxTask[] => {
  const allTasks = generateAnnualTasks(year);
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);

  return allTasks.filter(task => {
    const taskDate = new Date(task.deadline);
    return taskDate >= today && taskDate <= futureDate && !task.completed;
  }).sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
};
