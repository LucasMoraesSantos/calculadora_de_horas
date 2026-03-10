const startDateInput = document.getElementById('startDate');
const startTimeInput = document.getElementById('startTime');
const endDateInput = document.getElementById('endDate');
const endTimeInput = document.getElementById('endTime');
const operationInput = document.getElementById('operation');
const adjustHoursInput = document.getElementById('adjustHours');
const adjustMinutesInput = document.getElementById('adjustMinutes');

const baseResult = document.getElementById('baseResult');
const adjustmentResult = document.getElementById('adjustmentResult');
const finalResult = document.getElementById('finalResult');
const resultText = document.getElementById('resultText');

const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');

const pad = (value) => value.toString().padStart(2, '0');

const parseDateTime = (dateValue, timeValue) => {
  if (!dateValue || !timeValue) {
    return null;
  }
  return new Date(`${dateValue}T${timeValue}`);
};

const formatDuration = (minutesTotal) => {
  const signal = minutesTotal < 0 ? '-' : '';
  const absoluteMinutes = Math.abs(minutesTotal);
  const hours = Math.floor(absoluteMinutes / 60);
  const minutes = absoluteMinutes % 60;
  return `${signal}${pad(hours)}:${pad(minutes)}`;
};

const calculate = () => {
  const startDateTime = parseDateTime(startDateInput.value, startTimeInput.value);
  const endDateTime = parseDateTime(endDateInput.value, endTimeInput.value);

  if (!startDateTime || !endDateTime || Number.isNaN(startDateTime) || Number.isNaN(endDateTime)) {
    resultText.textContent = 'Preencha data e hora de início/fim corretamente.';
    resultText.className = 'helper error';
    return;
  }

  const baseMinutes = Math.round((endDateTime - startDateTime) / 60000);
  const hoursToAdjust = Number(adjustHoursInput.value || 0);
  const minutesToAdjust = Number(adjustMinutesInput.value || 0);
  const adjustmentMinutes = (hoursToAdjust * 60) + minutesToAdjust;

  const signedAdjustment = operationInput.value === 'subtract'
    ? -adjustmentMinutes
    : adjustmentMinutes;

  const finalMinutes = baseMinutes + signedAdjustment;

  baseResult.textContent = formatDuration(baseMinutes);
  adjustmentResult.textContent = `${signedAdjustment < 0 ? '-' : '+'}${formatDuration(Math.abs(signedAdjustment))}`;
  finalResult.textContent = formatDuration(finalMinutes);

  resultText.textContent = 'Cálculo realizado com sucesso.';
  resultText.className = 'helper success';
};

const reset = () => {
  startDateInput.value = '';
  startTimeInput.value = '';
  endDateInput.value = '';
  endTimeInput.value = '';
  operationInput.value = 'add';
  adjustHoursInput.value = '0';
  adjustMinutesInput.value = '0';

  baseResult.textContent = '--:--';
  adjustmentResult.textContent = '+00:00';
  finalResult.textContent = '--:--';
  resultText.textContent = 'Preencha os campos e clique em calcular.';
  resultText.className = 'helper';
};

calculateBtn.addEventListener('click', calculate);
resetBtn.addEventListener('click', reset);
