const baseDateTimeInput = document.getElementById('baseDateTime');
const dateOperationInput = document.getElementById('dateOperation');
const yearsInput = document.getElementById('years');
const monthsInput = document.getElementById('months');
const weeksInput = document.getElementById('weeks');
const daysInput = document.getElementById('days');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

const originResult = document.getElementById('originResult');
const periodResult = document.getElementById('periodResult');
const dateResult = document.getElementById('dateResult');
const timeResult = document.getElementById('timeResult');
const weekdayResult = document.getElementById('weekdayResult');

const dateCalculateBtn = document.getElementById('dateCalculateBtn');
const dateResetBtn = document.getElementById('dateResetBtn');

const weekdayFormatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' });
const dateFormatter = new Intl.DateTimeFormat('pt-BR');
const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
});
const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
});

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const addYearsMonthsSafely = (date, years, months, sign) => {
  const totalMonths = (years * 12) + months;
  const delta = totalMonths * sign;

  const startYear = date.getFullYear();
  const startMonth = date.getMonth();
  const startDay = date.getDate();
  const startHour = date.getHours();
  const startMinute = date.getMinutes();
  const startSecond = date.getSeconds();

  const targetMonthIndex = startMonth + delta;
  const targetYear = startYear + Math.floor(targetMonthIndex / 12);
  const targetMonth = ((targetMonthIndex % 12) + 12) % 12;
  const maxDay = getDaysInMonth(targetYear, targetMonth);

  return new Date(
    targetYear,
    targetMonth,
    Math.min(startDay, maxDay),
    startHour,
    startMinute,
    startSecond,
    0
  );
};

const calculateDate = () => {
  if (!baseDateTimeInput.value) {
    weekdayResult.textContent = 'Escolha uma data e hora inicial para continuar.';
    weekdayResult.className = 'helper error';
    return;
  }

  const baseDateTime = new Date(baseDateTimeInput.value);
  if (Number.isNaN(baseDateTime.getTime())) {
    weekdayResult.textContent = 'Data/hora inicial inválida.';
    weekdayResult.className = 'helper error';
    return;
  }

  const sign = dateOperationInput.value === 'subtract' ? -1 : 1;

  const years = Number(yearsInput.value || 0);
  const months = Number(monthsInput.value || 0);
  const weeks = Number(weeksInput.value || 0);
  const days = Number(daysInput.value || 0);
  const hours = Number(hoursInput.value || 0);
  const minutes = Number(minutesInput.value || 0);
  const seconds = Number(secondsInput.value || 0);

  let computedDateTime = addYearsMonthsSafely(baseDateTime, years, months, sign);
  const totalDays = ((weeks * 7) + days) * sign;
  computedDateTime.setDate(computedDateTime.getDate() + totalDays);

  const totalSeconds = ((hours * 3600) + (minutes * 60) + seconds) * sign;
  computedDateTime = new Date(computedDateTime.getTime() + (totalSeconds * 1000));

  originResult.textContent = dateTimeFormatter.format(baseDateTime);
  periodResult.textContent = `${sign === 1 ? '+' : '-'}${years}a ${months}m ${weeks}sem ${days}d ${hours}h ${minutes}min ${seconds}seg`;
  dateResult.textContent = dateFormatter.format(computedDateTime);
  timeResult.textContent = timeFormatter.format(computedDateTime);
  weekdayResult.textContent = `Resultado: ${weekdayFormatter.format(computedDateTime)}.`;
  weekdayResult.className = 'helper success';
};

const resetDateCalc = () => {
  baseDateTimeInput.value = '';
  dateOperationInput.value = 'add';
  yearsInput.value = '0';
  monthsInput.value = '0';
  weeksInput.value = '0';
  daysInput.value = '0';
  hoursInput.value = '0';
  minutesInput.value = '0';
  secondsInput.value = '0';

  originResult.textContent = '--/--/---- --:--:--';
  periodResult.textContent = '+0a 0m 0sem 0d 0h 0min 0seg';
  dateResult.textContent = '--/--/----';
  timeResult.textContent = '--:--:--';
  weekdayResult.textContent = 'Informe os dados para realizar o cálculo.';
  weekdayResult.className = 'helper';
};

dateCalculateBtn.addEventListener('click', calculateDate);
dateResetBtn.addEventListener('click', resetDateCalc);
