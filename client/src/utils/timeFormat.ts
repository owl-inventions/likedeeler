import { parse, format } from 'date-fns';

export const formatTime = (time: string): string => {
  const parsedTime = parse(time, 'HH:mm:ss', new Date());
  return format(parsedTime, 'HH:mm');
};
