import { parse, format } from 'date-fns'

export const formatStrapiTimestamp = (
    time: string,
    formatString: string = 'HH:mm'
): string => {
  const parsedTime = parse(time, 'HH:mm:ss', new Date())
  return format(parsedTime, formatString)
}
