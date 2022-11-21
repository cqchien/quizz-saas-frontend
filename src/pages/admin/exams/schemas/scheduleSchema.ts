export default {
  formField: {
    scheduleType: {
      name: 'scheduleType',
      label: 'Schedule type',
      errMsg: 'This field is required',
      required: true,
      placeholder: '',
      options: ['Fixed'], // 'Flexible'
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
      label: 'Grace Period to Join (Minutes)',
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
      label: 'Schedule to a group',
      errMsg: 'This field is required',
      required: true,
      placeholder: '',
    },
  },
};
