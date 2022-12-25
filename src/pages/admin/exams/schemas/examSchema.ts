export default {
  formField: {
    name: {
      name: 'name',
      label: 'Name',
      errMsg: 'Please input the name of this exam',
      required: true,
      placeholder: '',
    },
    tags: {
      name: 'tags',
      label: 'Related tags',
      placeholder: '',
    },
    description: {
      name: 'description',
      label: 'Description',
      placeholder: '',
    },

    plusScorePerQuestion: {
      name: 'plusScorePerQuestion',
      label: 'Plus score per question',
    },
    minusScorePerQuestion: {
      name: 'minusScorePerQuestion',
      label: 'Minus score per question',
    },
    timePerQuestion: {
      name: 'timePerQuestion',
      label: 'Time per question',
    },
    shufflingExams: {
      name: 'shufflingExams',
      label: 'Shuffling exams',
    },
    percentageToPass: {
      name: 'percentageToPass',
      label: 'Percentage to pass',
    },

    viewPassQuestion: {
      name: 'viewPassQuestion',
      label: 'View pass question',
    },
    viewNextQuestion: {
      name: 'viewNextQuestion',
      label: 'View next question',
    },
    showCam: {
      name: 'showCam',
      label: 'Detect face in WebCam',
    },
    hideResult: {
      name: 'hideResult',
      label: 'Hide result',
    },

    questionList: {
      name: 'questions',
      required: true,
      errMsg: 'This exam need at least one question',
    },

    scheduleList: {
      name: 'schedules',
      required: true,
      errMsg: 'This exam need at least one schedule',
    },

    setting: {
      name: 'setting',
    },

    type: {
      name: 'type',
      label: 'Type',
    },
    questionBankType: {
      name: 'questionBankType',
    },
    code: {
      name: 'code',
      label: 'Code',
      required: true,
      errMsg: 'Input the code of the exam',
    },
    defaultQuestionNumber: {
      name: 'defaultQuestionNumber',
    },
  },
};
