const baseDateInput = document.getElementById('baseDate');
const dateOperationInput = document.getElementById('dateOperation');
const yearsInput = document.getElementById('years');
const monthsInput = document.getElementById('months');
const weeksInput = document.getElementById('weeks');
const daysInput = document.getElementById('days');

const originResult = document.getElementById('originResult');
const periodResult = document.getElementById('periodResult');
const dateResult = document.getElementById('dateResult');
const weekdayResult = document.getElementById('weekdayResult');

const dateCalculateBtn = document.getElementById('dateCalculateBtn');
const dateResetBtn = document.getElementById('dateResetBtn');

const weekdayFormatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' });
const dateFormatter = new Intl.DateTimeFormat('pt-BR');

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const addYearsMonthsSafely = (date, years, months, sign) => {
  const totalMonths = (years * 12) + months;
  const delta = totalMonths * sign;

  const startYear = date.getFullYear();
  const startMonth = date.getMonth();
  const startDay = date.getDate();

  const targetMonthIndex = (startMonth + delta);
  const targetYear = startYear + Math.floor(targetMonthIndex / 12);
  const targetMonth = ((targetMonthIndex % 12) + 12) % 12;
  const maxDay = getDaysInMonth(targetYear, targetMonth);

  return new Date(targetYear, targetMonth, Math.min(startDay, maxDay));
};

const calculateDate = () => {
  if (!baseDateInput.value) {
    weekdayResult.textContent = 'Escolha uma data inicial para continuar.';
    weekdayResult.className = 'helper error';
    return;
  }

  const baseDate = new Date(`${baseDateInput.value}T00:00:00`);
  const sign = dateOperationInput.value === 'subtract' ? -1 : 1;

  const years = Number(yearsInput.value || 0);
  const months = Number(monthsInput.value || 0);
  const weeks = Number(weeksInput.value || 0);
  const days = Number(daysInput.value || 0);

  let computedDate = addYearsMonthsSafely(baseDate, years, months, sign);
  const totalDays = ((weeks * 7) + days) * sign;
  computedDate.setDate(computedDate.getDate() + totalDays);

  originResult.textContent = dateFormatter.format(baseDate);
  periodResult.textContent = `${sign === 1 ? '+' : '-'}${years}a ${months}m ${weeks}s ${days}d`;
  dateResult.textContent = dateFormatter.format(computedDate);
  weekdayResult.textContent = `A data final cai em ${weekdayFormatter.format(computedDate)}.`;
  weekdayResult.className = 'helper success';
};

const resetDateCalc = () => {
  baseDateInput.value = '';
  dateOperationInput.value = 'add';
  yearsInput.value = '0';
  monthsInput.value = '0';
  weeksInput.value = '0';
  daysInput.value = '0';

  originResult.textContent = '--/--/----';
  periodResult.textContent = '+0a 0m 0s 0d';
  dateResult.textContent = '--/--/----';
  weekdayResult.textContent = 'Informe os dados para realizar o cálculo.';
  weekdayResult.className = 'helper';
};

dateCalculateBtn.addEventListener('click', calculateDate);
dateResetBtn.addEventListener('click', resetDateCalc);
