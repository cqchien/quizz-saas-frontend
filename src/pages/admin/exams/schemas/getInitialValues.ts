import examFields from './examSchema';

const {
  formField: {
    name,
    description,
    tags,
    setting,
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
    [setting.name]: {
      [plusScorePerQuestion.name]: (objectInfo && objectInfo[plusScorePerQuestion.name]) || 0,
      [minusScorePerQuestion.name]: (objectInfo && objectInfo[minusScorePerQuestion.name]) || 0,
      [timePerQuestion.name]: (objectInfo && objectInfo[timePerQuestion.name]) || 0,
      [shufflingExams.name]: (objectInfo && objectInfo[shufflingExams.name]) || 0,
      [percentageToPass.name]: (objectInfo && objectInfo[percentageToPass.name]) || 50,
      [viewPassQuestion.name]: (objectInfo && objectInfo[viewPassQuestion.name]) || false,
      [viewNextQuestion.name]: (objectInfo && objectInfo[viewNextQuestion.name]) || false,
      [showAllQuestion.name]: (objectInfo && objectInfo[showAllQuestion.name]) || false,
      [hideResult.name]: (objectInfo && objectInfo[hideResult.name]) || false,
    },
  };
}
