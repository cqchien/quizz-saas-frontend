// import EditorCustom from '@/components/Editor';
// import { DefaultQuestionObject, QuestionTypeAlias } from '@/utils/constant';
// import { PlusCircleOutlined } from '@ant-design/icons';
// import { PageContainer, ProCard } from '@ant-design/pro-components';
// import { Button, Card, notification, Tabs } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { FormattedMessage } from 'umi';
// import { connect } from 'dva';
// import AdditionInformationForm from '../components/AdditionInformationForm';
// import MultipleChoiceQuestionForm from '../components/MultipleChoiceQuestion';

// const { TabPane } = Tabs;
// interface IQuestionUpdationPage {
//   id: string;
//   dispatch: any;
//   loadingInfo: boolean;
//   question: API.Question;
// }

// const QuestionUpdationPage: React.FC<IQuestionUpdationPage> = ({
//   id,
//   dispatch,
//   loadingInfo = true,
//   question,
// }) => {
//   const [selectedType, setSelectedType] = useState(QuestionTypeAlias.MultipleChoiceQuestion);
//   const [currentQuestion, setCurrentQuestion] = useState<API.Question>(DefaultQuestionObject);
//   const [currentOptions, setCurrentOptions] = useState<API.Option[]>([]);

//   useEffect(() => {
//     // Call API to get question by Id
//     dispatch({
//       type: 'questions/getDetail',
//       payload: {
//         questionId: id,
//       },
//     });
//     // Set question
//     setCurrentQuestion(DefaultQuestionObject);

//     // Set question.type
//     setSelectedType('MCQ');

//     // Set question.options
//     setCurrentOptions([
//       {
//         order: 0,
//         option: 'Việt Nam',
//         value: false,
//       },
//     ]);
//   }, []);

//   const IsValidData = () => {
//     if (currentQuestion.question.length === 0) {
//       notification.error({
//         message: `Question content is empty`,
//         placement: 'bottomRight',
//       });
//       return false;
//     } else if (currentQuestion.options.length === 0) {
//       notification.error({
//         message: `No options have been created yet`,
//         placement: 'bottomRight',
//       });
//       return false;
//     } else return true;
//   };

//   const operations = (
//     <Button
//       type="primary"
//       icon={<PlusCircleOutlined />}
//       onClick={() => {
//         if (IsValidData()) {
//           // Call API save question
//         }
//       }}
//     >
//       Save question
//     </Button>
//   );

//   useEffect(() => {
//     setCurrentQuestion({ ...currentQuestion, options: currentOptions });
//   }, [currentOptions]);

//   return (
//     <PageContainer>
//       <Card>
//         <ProCard>
//           <>
//             <Tabs tabBarExtraContent={operations}>
//               <TabPane tab="Question information" key="1">
//                 <FormattedMessage id="pages.createQuestion.tooltip.enterQuestionContent" />
//                 <EditorCustom
//                   question={question.question}
//                   handleEditorChange={(newValue: any) =>
//                     setCurrentQuestion({ ...currentQuestion, question: newValue })
//                   }
//                 />
//                 {/* <Editor
//                   value={currentQuestion.question}
//                   onEditorChange={(newValue) =>
//                     setCurrentQuestion({ ...currentQuestion, question: newValue })
//                   }
//                   init={InitQuestionEditor}
//                 /> */}
//                 {selectedType === QuestionTypeAlias.MultipleChoiceQuestion && (
//                   <MultipleChoiceQuestionForm
//                     currentOptions={currentOptions}
//                     setCurrentOptions={setCurrentOptions}
//                   />
//                 )}
//               </TabPane>
//               <TabPane tab="Addition information" key="2">
//                 <AdditionInformationForm
//                   currentQuestion={currentQuestion}
//                   setCurrentQuestion={setCurrentQuestion}
//                 />
//               </TabPane>
//             </Tabs>
//           </>
//         </ProCard>
//       </Card>
//     </PageContainer>
//   );
// };

// export default connect(({ loading, questions }: any, { match }: any) => {
//   const { id } = match.params;
//   const { dictionary } = questions;
//   return {
//     id,
//     loadingInfo: loading.effects['communities/getById'],
//     question: dictionary[id] || {},
//   };
// })(QuestionUpdationPage);
