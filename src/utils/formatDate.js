const formatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(value) {
  return formatter.format(new Date(`${value}T00:00:00Z`));
}
