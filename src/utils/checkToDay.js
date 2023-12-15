export function checkToDay(date, month, year) {
  const toDay = new Date().toDateString();
  const unknowDate = new Date(year, month, date).toDateString();
  if (toDay === unknowDate) return true;
  return false;
}
