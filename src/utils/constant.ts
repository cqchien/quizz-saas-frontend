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

const InitQuestionEditor = {
  height: 200,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount',
  ],
  toolbar:
    'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
  content_style:
    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
}

const DefaultQuestionObject = {
  id: '0',
  question: 'Quốc gia nào có dân số lớn thứ hai trên thế giới?',
  type: 'FIB',
  heuristicLevel: 'KNOWLEDGE',
  status: 'PENDING',
  level: 6,
  topic: 'Quốc Gia',
  options: [
    {
      order: 0,
      option: 'Việt Nam',
      value: false,
    },
  ],
  tags: ['Địa Lý', 'Quốc Gia', 'Dân Số'],
  language: 'vi-VN',
  isPrivate: false,
  updatedAt: new Date(),
  createdAt: new Date(),
}

const InitialQuestion = {
  id: '0',
  question: '',
  type: 'MCQ',
  heuristicLevel: '',
  status: 'PENDING',
  level: 0,
  topic: '',
  options: [],
  tags: [],
  language: 'vi-VN',
  isPrivate: true,
  updatedAt: new Date(),
  createdAt: new Date(),
};

export { 
  ROLES, 
  EditorOptionConfiguration, 
  QuestionTypeAlias ,
  Topic, 
  HeuristicLevel, 
  InitQuestionEditor, 
  DefaultQuestionObject, 
  InitialQuestion
};
