import examFields from './examSchema';

const {
  formField: {
    name,
    description,
    tags,
    setting,
    questionList,
    scheduleList,
    plusScorePerQuestion,
    minusScorePerQuestion,
    timePerQuestion,
    shufflingExams,
    percentageToPass,
    viewPassQuestion,
    viewNextQuestion,
    showAllQuestion,
    hideResult,
  },
} = examFields;

export function getInitialValue(objectInfo?: API.Exam) {
  return {
    [name.name]: (objectInfo && objectInfo[name.name]) || '',
    [description.name]: (objectInfo && objectInfo[description.name]) || '',
    [tags.name]: (objectInfo && objectInfo[tags.name]) || ['TOAN', 'TOAN12'],
    [questionList.name]: (objectInfo && objectInfo[questionList.name]) || [], // TODO
    [scheduleList.name]: (objectInfo && objectInfo[scheduleList.name]) || [],
    [setting.name]: {
      [plusScorePerQuestion.name]:
        (objectInfo && objectInfo[setting.name][plusScorePerQuestion.name]) || 0,
      [minusScorePerQuestion.name]:
        (objectInfo && objectInfo[setting.name][minusScorePerQuestion.name]) || 0,
      [timePerQuestion.name]: (objectInfo && objectInfo[setting.name][timePerQuestion.name]) || 0,
      [shufflingExams.name]: (objectInfo && objectInfo[setting.name][shufflingExams.name]) || 0,
      [percentageToPass.name]:
        (objectInfo && objectInfo[setting.name][percentageToPass.name]) || 50,
      [viewPassQuestion.name]:
        (objectInfo && objectInfo[setting.name][viewPassQuestion.name]) || false,
      [viewNextQuestion.name]:
        (objectInfo && objectInfo[setting.name][viewNextQuestion.name]) || false,
      [showAllQuestion.name]:
        (objectInfo && objectInfo[setting.name][showAllQuestion.name]) || false,
      [hideResult.name]: (objectInfo && objectInfo[setting.name][hideResult.name]) || false,
    },
  };
}
