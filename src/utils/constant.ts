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

const HeuristicLevel = [
    'Knowledge',
    'Comprehension',
    'Application',
    'Analysis',
    'Synthesis',
    'Evaluation',
  ];

  const Topic = [
    'Maths',
    'Music',
    'Geography',
    'History',
    'Science',
    'Literature',
    'Biology',
    'IT',
    'Physics',
    'Chemistry',
  ];

export { ROLES, EditorOptionConfiguration, QuestionTypeAlias ,Topic, HeuristicLevel};
