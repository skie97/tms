// Convert date from UTC datetime to ISO date
export function getDate(date: string | Date) {
  const rawDate = new Date(date);
  const z = rawDate.getTimezoneOffset() * 60 * 1000;
  const localDate = new Date(rawDate.valueOf() - z.valueOf());
  const localDateISO = localDate.toISOString().slice(0, 10);
  return localDateISO;
}

// Format date in `%d %b %y` format e.g. 22 Sep 22
export function formatDate(dateStr: string) {
  if (dateStr) {
    var date = new Date(dateStr);
    var y = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
    var m = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
    var d = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
    return d + " " + m + " " + y;
  }
};