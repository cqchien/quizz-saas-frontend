import examinationFields from './examinationSchema';

const {
  formField: { title, description, tags, durationMode , marksMode, 
    negativeMarking, overallPassPercentage, shuffleQuestions,
    disableSectionNavigation, disableFinishButton, 
    enableQuestionListView, hideSolutions
  },
} = examinationFields;

export function getInitialValue(objectInfo?: API.Examination) {
  return {
    [title.name]: (objectInfo && objectInfo[title.name]) || '',
    [description.name]: (objectInfo && objectInfo[description.name]) || '',
    [tags.name]: (objectInfo && objectInfo[tags.name]) || ['TOAN', 'TOAN12'],
    [durationMode.name]: (objectInfo && objectInfo[durationMode.name]) || false,
    [marksMode.name]: (objectInfo && objectInfo[marksMode.name]) || false,
    [negativeMarking.name]: (objectInfo && objectInfo[negativeMarking.name]) || false,
    [overallPassPercentage.name]: (objectInfo && objectInfo[overallPassPercentage.name]) || false,
    [shuffleQuestions.name]: (objectInfo && objectInfo[shuffleQuestions.name]) || false,
    [disableSectionNavigation.name]: (objectInfo && objectInfo[disableSectionNavigation.name]) || false,
    [disableFinishButton.name]: (objectInfo && objectInfo[disableFinishButton.name]) || false,
    [enableQuestionListView.name]: (objectInfo && objectInfo[enableQuestionListView.name]) || false,
    [hideSolutions.name]: (objectInfo && objectInfo[hideSolutions.name]) || false,
  };
}
