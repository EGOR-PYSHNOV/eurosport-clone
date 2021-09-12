import { format, formatDistanceStrict, isThisWeek } from 'date-fns';

export const formatDate = (date: Date): string => {
  if (isThisWeek(new Date(date), { weekStartsOn: 1 })) {
    return formatDistanceStrict(new Date(date), new Date(), { addSuffix: true });
  }
  return format(new Date(date), "dd/MM/yyyy 'at' p");
};
