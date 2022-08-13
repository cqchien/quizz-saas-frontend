const ROLES: Record<string, string> = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

const EditorOptionConfiguration = {
  toolbar: ["bold", "italic"],
};

const QuestionTypeAlias = {
  MultipleChoiceQuestion: "MCQ",
  FillInBlanks: "FIB",
  MatchTheFollowing: "MTF",
  OrderingSequence: "ORD",
};

export { ROLES, EditorOptionConfiguration, QuestionTypeAlias };
