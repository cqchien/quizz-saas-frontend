const ROLES: Record<string, string> = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

const ACCEPT_EXCEL_FILE =
  '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel';

const QUESTION_TYPE = {
  MULTIPLE_CHOICE_QUESTION: 'multiple_choice_question',
  FILL_IN_BLANK: 'fill_in_blank',
  MATCH_THE_FOLLOWING: 'match_the_following',
  ORDERING_SEQUENCE: 'ordering_sequence',
};

const QUESTION_TYPE_STRING = {
  MULTIPLE_CHOICE_QUESTION: 'Multiple Choice Question',
  FILL_IN_BLANK: 'Fill In Blank Question',
  MATCH_THE_FOLLOWING: 'Match The Following Question',
  ORDERING_SEQUENCE: 'Ordering Sequence Question',
};

export const DATE_FORMAT = 'DD-MM-YYYY';
export const DATE_FORMAT_MONTH = 'MM-YYYY';
export const DATE_FORMAT_YEAR = 'YYYY';
export const TIME_FORMAT_FULL = 'HH:mm:ss';
export const DATE_TIME_FORMAT = 'DD-MM-YYYY HH:mm A';
export const PAGE_LIMIT = 10;
export const PAGE_DEFAULT = 1;
export const DEFAULT_PAGE_OPTIONS = [10, 25, 50];
export const SORT_DIRECTIONS = { ascend: '+', descend: '-' };

const MAP_QUESTION_TYPE = {
  [QUESTION_TYPE.MULTIPLE_CHOICE_QUESTION]: 'Multiple Choice Question (MCQ)',
  [QUESTION_TYPE.FILL_IN_BLANK]: 'Fill In Blank Question (FIB)',
  [QUESTION_TYPE.MATCH_THE_FOLLOWING]: 'Match The Following Question (MTF)',
  [QUESTION_TYPE.ORDERING_SEQUENCE]: 'Ordering Sequence Question (ORD)',
};

const MAP_QUESTION_TYPE_SHORT = {
  [QUESTION_TYPE.MULTIPLE_CHOICE_QUESTION]: 'MCQ',
  [QUESTION_TYPE.FILL_IN_BLANK]: 'FIB',
  [QUESTION_TYPE.MATCH_THE_FOLLOWING]: 'MTF',
  [QUESTION_TYPE.ORDERING_SEQUENCE]: 'ORD',
};

const LANGUAGES = {
  VIET: 'vi',
  ENG: 'en',
};

const MAP_LANGUAGES = {
  [LANGUAGES.VIET]: 'Viet',
  [LANGUAGES.ENG]: 'English',
};

const STATUS = {
  ACTIVE: 'active',
  DRAFT: 'draft',
};

const MAP_STATUS = {
  [STATUS.ACTIVE]: 'Active',
  [STATUS.DRAFT]: 'Draft',
};

const MODE = {
  PUBLIC: 'public',
  PRIVATE: 'private',
};

const MAP_MODE = {
  [MODE.PUBLIC]: 'Public',
  [MODE.PRIVATE]: 'Private',
};

const HEURISTIC_LEVEL = {
  KNOWLEDGE: 'knowledge',
  COMPREHENSION: 'comprehension',
  APPLICATION: 'application',
  ANALYSIS: 'analysis',
  SYNTHESIS: 'synthesis',
  EVALUATION: 'evaluation',
};

const HEURISTIC_LEVEL_STRING = {
  KNOWLEDGE: 'Knowledge',
  COMPREHENSION: 'Comprehension',
  APPLICATION: 'Application',
  ANALYSIS: 'Analysis',
  SYNTHESIS: 'Synthesis',
  EVALUATION: 'Evaluation',
};

const MAP_HEURISTIC_LEVEL = {
  [HEURISTIC_LEVEL.KNOWLEDGE]: HEURISTIC_LEVEL_STRING.KNOWLEDGE,
  [HEURISTIC_LEVEL.COMPREHENSION]: HEURISTIC_LEVEL_STRING.COMPREHENSION,
  [HEURISTIC_LEVEL.APPLICATION]: HEURISTIC_LEVEL_STRING.APPLICATION,
  [HEURISTIC_LEVEL.ANALYSIS]: HEURISTIC_LEVEL_STRING.ANALYSIS,
  [HEURISTIC_LEVEL.SYNTHESIS]: HEURISTIC_LEVEL_STRING.SYNTHESIS,
  [HEURISTIC_LEVEL.EVALUATION]: HEURISTIC_LEVEL_STRING.EVALUATION,
};

const TOPIC = {
  MATH: 'math',
  MUSIC: 'music',
  OTHER: 'other',
};

const MAP_TOPIC = {
  [TOPIC.MATH]: 'Math',
  [TOPIC.MUSIC]: 'Music',
  [TOPIC.OTHER]: 'Other',
};

const EXAM_TYPE = {
  EXAM: 'exam',
  QUIZZ: 'quizz',
};

const MAP_EXAM_TYPE = {
  [EXAM_TYPE.EXAM]: 'Exam',
  [EXAM_TYPE.QUIZZ]: 'Quizz',
};

const QUESTION_BANK_TYPE = {
  SYSTEM: 'system',
  PERSONAL: 'personal',
};

const MAP_QUESTION_BANK_TYPE = {
  [QUESTION_BANK_TYPE.SYSTEM]: 'System',
  [QUESTION_BANK_TYPE.PERSONAL]: 'Personal',
};

const SCHEDULE_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
};

const USER_EXAM_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  SUBMITTED: 'submitted',
};

const USER_EXAM_RESULT = {
  FAILED: 'Failed',
  PASSED: 'Passed',
  NOTSET: 'Not Set',
};

const MAP_SCHEDULE_STATUS = {
  [SCHEDULE_STATUS.NOT_STARTED]: 'Not started',
  [SCHEDULE_STATUS.IN_PROGRESS]: 'In progress',
  [SCHEDULE_STATUS.COMPLETED]: 'Completed',
};

const NUMBER_OF_QUESTION_PER_PAGE = 10;
const NUMBER_OF_EXAM_PER_PAGE = 10;
const NUMBER_OF_EXAM_CARD_PER_PAGE = 8;

const SCHEDULE_TYPE = {
  FIXED: 'Fixed',
  FLEXIBLE: 'Flexible',
};

const DISPATCH_TYPE = {
  // EXAMS
  EXAMS_FETCH: 'exams/fetch',
  EXAMS_CREATE: 'exams/create',
  EXAMS_UPDATE: 'exams/update',
  EXAMS_DELETE: 'exams/delete',
  EXAMS_DETAILS: 'exams/getDetail',
  EXAMS_OVERVIEW: 'exams/overview',

  // GROUPS
  GROUPS_FETCH: 'groups/fetch',
  GROUPS_CREATE: 'groups/create',
  GROUPS_UPDATE: 'groups/update',

  // QUESTIONS
  QUESTIONS_FETCH: 'questions/fetch',
  QUESTIONS_CREATE: 'questions/create',
  QUESTIONS_UPDATE: 'questions/update',
  QUESTIONS_DELETE: 'questions/delete',
  QUESTIONS_DETAILS: 'questions/getDetail',
  QUESTIONS_IMPORT: 'questions/import',

  // USER_EXAMS
  USER_EXAMS_FETCH: 'userExamsNamespace/fetch',
  USER_EXAMS_TAKE_EXAM: 'userExamsNamespace/takeExam',
  USER_EXAMS_SUBMIT_EXAM: 'userExamsNamespace/submitExam',
  USER_EXAMS_OVERVIEW: 'userExamsNamespace/overview',
};

const MY_COLOR = {
  WHITE: '#ffffff',
  CORRECT_ANSWER: '#52c41a', //green-6
  WRONG_ANSWER: '#f5222d', //red-6
  NOT_ANSWERED: '#eeeee4',
  ANSWERED: '#063970',
};

export {
  ROLES,
  QUESTION_TYPE,
  QUESTION_TYPE_STRING,
  MAP_QUESTION_TYPE,
  TOPIC,
  MAP_TOPIC,
  HEURISTIC_LEVEL,
  HEURISTIC_LEVEL_STRING,
  MAP_HEURISTIC_LEVEL,
  LANGUAGES,
  MAP_LANGUAGES,
  STATUS,
  MAP_STATUS,
  MODE,
  MAP_MODE,
  ACCEPT_EXCEL_FILE,
  NUMBER_OF_QUESTION_PER_PAGE,
  NUMBER_OF_EXAM_PER_PAGE,
  NUMBER_OF_EXAM_CARD_PER_PAGE,
  MAP_QUESTION_TYPE_SHORT,
  EXAM_TYPE,
  MAP_EXAM_TYPE,
  QUESTION_BANK_TYPE,
  MAP_QUESTION_BANK_TYPE,
  SCHEDULE_STATUS,
  MAP_SCHEDULE_STATUS,
  USER_EXAM_STATUS,
  USER_EXAM_RESULT,
  SCHEDULE_TYPE,
  DISPATCH_TYPE,
  MY_COLOR,
};
