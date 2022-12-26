import { SCHEDULE_TYPE } from '@/utils/constant';

export default {
  formField: {
    scheduleType: {
      name: 'scheduleType',
      label: 'Schedule type',
      errMsg: 'This field is required',
      required: true,
      placeholder: '',
      options: [SCHEDULE_TYPE.FIXED, SCHEDULE_TYPE.FLEXIBLE], // 'Flexible'
    },
    startAt: {
      name: 'startAt',
      label: 'Start at',
      errMsg: 'This field is required',
      required: true,
      placeholder: '',
      minuteStep: 5,
      format: 'YYYY-MM-DD HH:mm',
    },
    period: {
      name: 'period',
      label: 'Time (Minutes)',
      errMsg: 'This field is required',
      required: true,
      placeholder: '',
      initialValue: '15',
    },
    dateRange: {
      name: 'dateRange',
      label: 'Date range',
      errMsg: 'This field is required',
      required: true,
      placeholder: ['Start at', 'End at'],
      minuteStep: 5,
      format: 'YYYY-MM-DD HH:mm',
    },
    assignedGroup: {
      name: 'assignedGroup',
      label: 'Group',
      errMsg: '',
      required: false,
      placeholder: '',
    },
    code: {
      name: 'code',
      label: 'Code',
      errMsg: 'This field is required',
      required: true,
      placeholder: 'MIS_2022',
    },
  },
};
