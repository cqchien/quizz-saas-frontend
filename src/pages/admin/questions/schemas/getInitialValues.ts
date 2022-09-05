import { LANGUAGES, MODE, STATUS, TOPIC } from '@/utils/constant';
import { HEURISTIC_LEVEL } from '@/utils/constant';
import questionFields from './questionSchema';

const {
  formField: {
    question,
    options,
    heuristicLevel,
    topic,
    status,
    language,
    mode,
    tags,
  },
} = questionFields;

export function getInitialValue(questionInfo?: API.Question) {
  return {
    [question.name]: (questionInfo && questionInfo[question.name]) || '',
    [options.name]: (questionInfo && questionInfo[options.name]) || [],
    [heuristicLevel.name]: (questionInfo && questionInfo[heuristicLevel.name]) || HEURISTIC_LEVEL.KNOWLEDGE,
    [topic.name]: (questionInfo && questionInfo[topic.name]) || TOPIC.OTHER,
    [status.name]: (questionInfo && questionInfo[status.name]) || STATUS.ACTIVE,
    [language.name]: (questionInfo && questionInfo[language.name]) || LANGUAGES.ENG,
    [mode.name]: (questionInfo && questionInfo[mode.name]) || MODE.PUBLIC,
    [tags.name]: (questionInfo && (questionInfo[tags.name])) || [],
  }
}