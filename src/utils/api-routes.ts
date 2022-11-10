const API_QUESTIONS = '/questions';
export const API_IMPORT_QUESTIONS = `${API_QUESTIONS}/upload`;
export const API_CREATE = `${API_QUESTIONS}`;
export const API_UPDATE = `${API_QUESTIONS}/:id`;

export const API_EXAMS = '/exams';
export const API_EXAM_ONE = `${API_EXAMS}/:id`;
export const API_OVERVIEW_EXAM = `${API_EXAMS}/:id/overview`;

export const API_USER_EXAMS = '/user-exams';
export const API_TAKE_EXAM = `${API_USER_EXAMS}/:id/take-exam`;
export const API_SUBMIT_EXAM = `${API_USER_EXAMS}/:id/submit`;

export const API_GROUPS = '/groups';
export const API_GROUP_ONE = `${API_GROUPS}/:id`;
