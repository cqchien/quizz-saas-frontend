import PageLayout from '@/layout/PageLayout';
import { DISPATCH_TYPE } from '@/utils/constant';
import type { FC } from 'react';
import { useEffect } from 'react';
import ExamForm from '../form-exam';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'umi';

const ExamUpdationPage: FC = () => {
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();
  const loadingInfo = useSelector((state: any) => state.loading?.effects[DISPATCH_TYPE.EXAMS_DETAILS]);
  const exams = useSelector((state: any) => state.exams?.dictionary);

  const exam = exams[id];

  useEffect(() => {
    dispatch({
      type: DISPATCH_TYPE.EXAMS_DETAILS,
      payload: {
        examId: id,
      },
    });
  }, [dispatch, id]);

  return (
    <PageLayout title="Edit Template" loading={loadingInfo}>
      <ExamForm exam={exam} />
    </PageLayout>
  );
};

export default ExamUpdationPage;