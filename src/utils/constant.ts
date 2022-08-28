const ROLES: Record<string, string> = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

const ACCEPT_EXCEL_FILE = ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";

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
  height: 300,
  menubar: true,
  selector: 'textarea#classic',
  autosave_ask_before_unload: false,
  powerpaste_allow_local_images: true,
  plugins: [
    'a11ychecker', 'advcode', 'advlist', 'anchor', 'autolink', 'codesample', 'fullscreen', 'help',
    'image', 'editimage', 'tinydrive', 'lists', 'link', 'media', 'powerpaste', 'preview',
    'searchreplace', 'table', 'template', 'tinymcespellchecker', 'visualblocks', 'wordcount'
  ],  toolbar: 'insertfile a11ycheck undo redo | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image',
  toolbar_mode: 'floating',
  spellchecker_dialog: true,
  spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
  tinydrive_demo_files_url: '../../../public/images/tiny-drive/files.json',
  tinydrive_token_provider: (success, failure) => {
    success({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huZG9lIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Ks_BdfH4CWilyzLNk8S2gDARFhuxIauLa8PwhdEQhEo' });
  },
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
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
  InitialQuestion,
  ACCEPT_EXCEL_FILE
};
