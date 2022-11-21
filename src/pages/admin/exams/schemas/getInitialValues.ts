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
    type,
    questionBankType,
    code,
    defaultQuestionNumber,
  },
} = examFields;

export function getInitialValue(objectInfo?: API.Exam) {
  const scheduleListTemp: API.Schedule[] =
    objectInfo &&
    objectInfo[scheduleList.name].map((x: any) => {
      return { ...x, assignedGroup: (x.assignedGroup as API.Group).id };
    });

  return {
    [name.name]: (objectInfo && objectInfo[name.name]) || '',
    [type.name]: (objectInfo && objectInfo[type.name]) || 'exam',
    [questionBankType.name]: (objectInfo && objectInfo[questionBankType.name]) || 'system',
    [defaultQuestionNumber.name]: (objectInfo && objectInfo[defaultQuestionNumber.name]) || 0,
    [code.name]: (objectInfo && objectInfo[code.name]) || '',
    [name.name]: (objectInfo && objectInfo[name.name]) || '',
    [description.name]: (objectInfo && objectInfo[description.name]) || '',
    [tags.name]: (objectInfo && objectInfo[tags.name]) || [],
    [questionList.name]: (objectInfo && objectInfo[questionList.name]) || [],
    [scheduleList.name]: (objectInfo && scheduleListTemp) || [],
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
        (objectInfo && objectInfo[setting.name][viewPassQuestion.name]) || true,
      [viewNextQuestion.name]:
        (objectInfo && objectInfo[setting.name][viewNextQuestion.name]) || true,
      [showAllQuestion.name]:
        (objectInfo && objectInfo[setting.name][showAllQuestion.name]) || false,
      [hideResult.name]: (objectInfo && objectInfo[setting.name][hideResult.name]) || true,
    },
  };
}
