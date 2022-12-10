export const dateTimeBeautifier = (dateString: string, dateOnly: boolean = false) => {
  const [date, time] = dateString.split("T")
  if (dateOnly) return date
  else return `${date} ${time.split(".")[0]}`
}
