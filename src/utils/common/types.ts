export type SuspensionTimes = '1 week' | '1 month' | '3 months';

export type Day = 'Mon' | 'Tue' | 'Wed' | 'Thur' | 'Fri' | 'Sat' | 'Sun';

export type RoutineDescription = {
  description: string;
  duration?: number;
  optional: boolean;
};

export type Routine = {
  name: RoutineDescription;
};
