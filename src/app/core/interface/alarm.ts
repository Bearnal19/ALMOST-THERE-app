export interface Alarm {
  id: string;
  name: string;
  location: string;
  hour: string;
  days: {
    mon: boolean,
    tue: boolean,
    wen: boolean,
    fri: boolean,
    sat: boolean,
    sun: boolean
  };
  status: boolean;
}
