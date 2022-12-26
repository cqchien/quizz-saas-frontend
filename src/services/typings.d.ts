// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ApiResponse<T> = {
    data: T;
    statusCode?: string;
    message?: string;
    success?: boolean;
  };

  type LoginResponse = {
    token: Token;
    user: User;
  };

  type GroupMember = {
    name: string;
    email: string;
  }

  type Token = {
    expiresIn: number;
    accessToken: string;
  };

  type User = {
    id: string;
    name: string;
    role: string;
    email: string;
    password?: string;
    avatar?: string;
    phone?: string;
    updatedAt?: Date;
    createdAt?: Date;
  };

  type Question = {
    id: string;
    question: string;
    type: string;
    heuristicLevel: string;
    status: string;
    level: number;
    topic: string;
    options: Option[];
    tags: string[];
    attachment?: string[];
    language: string;
    mode: boolean;
    updatedAt?: Date;
    createdAt?: Date;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
    total?: number;
  };

  type PageQuery = {
    order?: string;
    page?: number;
    take?: number;
    searchField?: string;
    searchValue?: string;
  };

  type Option = {
    order: number;
    option: string;
    value: any;
  };

  type SheetData = {
    category: any;
    data: any;
    json?: any;
  };

  type Exam = {
    id?: string;
    code: string;
    name: string;
    tags: string[];
    description: string;
    defaultQuestionNumber: number;
    type: string;
    questionBankType: string;
    questions: string[] | Question[];
    setting: Setting;
    schedules: Schedule[];
    userExams: UserExam[];
  };

  type Setting = {
    plusScorePerQuestion: number;
    minusScorePerQuestion: number;
    viewPassQuestion: boolean;
    viewNextQuestion: boolean;
    showCam: boolean;
    timePerQuestion: number;
    shufflingExams: number;
    hideResult: boolean;
    percentageToPass: number;
  };

  type Schedule = {
    code: string;
    time?: number;
    startTime: Date;
    endTime: Date;
    status: string;
    assignedGroup?: string | Group;
  };

  type SubmitExamData = {
    answers: QuestionAnswer[];
  };

  type QuestionAnswer = {
    questionId: string;
    answerOrder: number;
    answerValue?: any;
  };

  type UserExam = {
    id: string;
    quest;
    templateExam: TemplateExam;
    user: User;
    setting: Setting;
    code: string;
    name: string;
    description: string;
    type: string;
    status: string;
    scheduleCode: string;
    score: number;
    total: number;
    numberOfCorrectAnswer?: number;
    resultStatus: string;
    questionBankType: string;
    questions: QuestionAnswerGet[];
    createdAt: Date;
    updatedAt: Date;
  };

  type QuestionAnswerGet = {
    question: Question;
    answerOrder: number;
    answerValue: any;
  };

  type TemplateExam = {
    id: string;
    code: string;
    name: string;
    description: string;
    defaultQuestionNumber: number;
    time: number;
    type: string;
    questionBankType: string;
    questions: Question[];
    setting: Setting;
    schedules: Schedule[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: User;
    updatedBy: User;
  };

  type Group = {
    id?: string;
    name: string;
    description: string;
    members: GroupMember[];
  };

  type GroupMember = {
    name: string;
    email: string;
  };

  // type RuleListItem = {
  //   key?: number;
  //   disabled?: boolean;
  //   href?: string;
  //   avatar?: string;
  //   name?: string;
  //   owner?: string;
  //   desc?: string;
  //   callNo?: number;
  //   status?: number;
  //   updatedAt?: string;
  //   createdAt?: string;
  //   progress?: number;
  // };

  // type RuleList = {
  //   data?: RuleListItem[];
  //   /** 列表的内容总数 */
  //   total?: number;
  //   success?: boolean;
  // };

  type LoginParams = {
    email?: string;
    password?: string;
  };

  type RegisterParams = {
    name?: string;
    email?: string;
    password?: string;
  };

  // type NoticeIconList = {
  //   data?: NoticeIconItem[];
  //   /** 列表的内容总数 */
  //   total?: number;
  //   success?: boolean;
  // };

  // type NoticeIconItemType = 'notification' | 'message' | 'event';

  // type NoticeIconItem = {
  //   id?: string;
  //   extra?: string;
  //   key?: string;
  //   read?: boolean;
  //   avatar?: string;
  //   title?: string;
  //   status?: string;
  //   datetime?: string;
  //   description?: string;
  //   type?: NoticeIconItemType;
  // };
}
