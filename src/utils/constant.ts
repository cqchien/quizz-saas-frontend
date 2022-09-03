const ROLES: Record<string, string> = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

const ACCEPT_EXCEL_FILE = ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";

const QUESTION_TYPE = {
  MULTIPLE_CHOICE_QUESTION: 'multiple_choice_question',
  FILL_IN_BLANK: 'fill_in_blank',
  MATCH_THE_FOLLOWING: 'match_the_following',
  ORDERING_SEQUENCE: 'ordering_sequence',
}

const MAP_QUESTION_TYPE = {
  [QUESTION_TYPE.MULTIPLE_CHOICE_QUESTION]: 'Multiple Choice Question (MCQ)',
  [QUESTION_TYPE.FILL_IN_BLANK]: 'Fill In Blank Question (FIB)',
  [QUESTION_TYPE.MATCH_THE_FOLLOWING]: 'Match The Following Question (MTF)',
  [QUESTION_TYPE.ORDERING_SEQUENCE]: 'Ordering Sequence Question (ORD)',
}

const LANGUAGES = {
  VIET: 'vi',
  ENG: 'eng'
}

const MAP_LANGUAGES = {
  [LANGUAGES.VIET]: 'Viet',
  [LANGUAGES.ENG]: 'English',
}

const STATUS = {
  ACTIVE: 'active',
  DRAFT: 'draft'
}

const MAP_STATUS = {
  [STATUS.ACTIVE]: 'Active',
  [STATUS.DRAFT]: 'Draft',
}

const MODE = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}

const MAP_MODE = {
  [MODE.PUBLIC]: 'Public',
  [MODE.PRIVATE]: 'Private',
}

const HEURISTIC_LEVEL = {
  KNOWLEDGE: 'knowledge',
  COMPREHENSION: 'comprehension',
  APPLICATION: 'application',
  ANALYSIS: 'analysis',
  SYNTHESIS: 'synthesis',
  EVALUATION: 'evaluation',
};

const MAP_HEURISTIC_LEVEL = {
  [HEURISTIC_LEVEL.KNOWLEDGE]: 'Knowledge',
  [HEURISTIC_LEVEL.COMPREHENSION]: 'Comprehension',
  [HEURISTIC_LEVEL.APPLICATION]: 'Application',
  [HEURISTIC_LEVEL.ANALYSIS]: 'Analysis',
  [HEURISTIC_LEVEL.SYNTHESIS]: 'Synthesis',
  [HEURISTIC_LEVEL.EVALUATION]: 'Evaluation',
};

const TOPIC = {
  MATH: 'math',
  MUSIC: 'music',
  OTHER: 'other'
}

const MAP_TOPIC = {
  [TOPIC.MATH]: 'Math',
  [TOPIC.MUSIC]: 'Music',
  [TOPIC.OTHER]: 'Other'
};

export {
  ROLES,
  QUESTION_TYPE,
  MAP_QUESTION_TYPE,
  TOPIC,
  MAP_TOPIC,
  HEURISTIC_LEVEL,
  MAP_HEURISTIC_LEVEL,
  LANGUAGES,
  MAP_LANGUAGES,
  STATUS,
  MAP_STATUS,
  MODE,
  MAP_MODE,
  ACCEPT_EXCEL_FILE
};
