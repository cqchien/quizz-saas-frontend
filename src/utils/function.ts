import { SCHEDULE_STATUS } from './constant';

export function mapBuilder(
  data: any[],
  field: string = 'id',
): { mapping: Record<any, any>; listing: any[] } {
  if (!Array.isArray(data) || data.length === 0) return { mapping: {}, listing: [] };
  const map: any = {};
  const dataNotUndefined = data.filter((d) => d);
  dataNotUndefined.forEach((d: any) => {
    if (!d[field]) return;
    map[d[field]] = { ...d };
  });

  return {
    mapping: map,
    listing: dataNotUndefined.map((d) => d[field]),
  };
}

export function calculateSize(size: number) {
  if (size) {
    return Number(size * 4);
  }

  return 0;
}

export function prepareScheduleInfo(values: any) {
  let startTime;
  let endTime;

  if (values.scheduleType === 'Fixed') {
    startTime = new Date(values.startAt);
    endTime = new Date(values.startAt);
    endTime = new Date(endTime.setMinutes(endTime.getMinutes() + values.period));
  } else {
    startTime = new Date(values.dateRange[0]);
    endTime = new Date(values.dateRange[1]);
  }

  return {
    code: `ES${new Date().toISOString().slice(0, 19).replace(/-/g, '').replace(/:/g, '')}`,
    startTime: startTime,
    endTime: endTime,
    time: Number(values.period),
    status: SCHEDULE_STATUS.NOT_STARTED,
    assignedGroup: values.assignedGroup,
  };
}
