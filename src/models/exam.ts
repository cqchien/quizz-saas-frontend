import { notification } from 'antd';
import { createExam, getAll, getById, updateExam, deleteById, overviewExam } from '@/services/exam';
import { mapBuilder } from '@/utils/function';
import type { Effect, Reducer } from 'umi';

const NAMESPACE = 'exams';
export interface IExamState {
  dictionary: Record<string, any>;
  ids: string[];
  pagingParams: API.PageParams;
}

interface IExamModel {
  namespace: string;
  state: IExamState;
  effects: {
    fetch: Effect;
    getDetail: Effect;
    delete: Effect;
    create: Effect;
    update: Effect;
    overview: Effect;
  };
  reducers: {
    updateDictionary: Reducer;
    updateDictionaryItem: Reducer;
  };
}

const ExamModel: IExamModel = {
  namespace: NAMESPACE,

  state: {
    dictionary: {},
    ids: [],
    pagingParams: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const { params } = payload;
        const response = yield call(getAll, params);

        if (Array.isArray(response.data) && response.success) {
          const { mapping: dic } = mapBuilder(response.data, 'id');
          const newPagingParams = {
            current: response.meta.page,
            pageSize: response.meta.take,
            total: response.meta.itemCount,
          };
          yield put({
            type: 'updateDictionary',
            payload: { data: dic, pagingParams: newPagingParams },
          });
          return true;
        }

        notification.error({
          message: response.message || 'Something went wrong',
        });

        return false;
      } catch (err) {
        console.error(`Error when trying to get exams:`, err);
        notification.error({
          message: 'Something went wrong',
        });
        return false;
      }
    },

    *getDetail({ payload }, { call, put }) {
      try {
        const { examId } = payload;

        const response = yield call(getById, examId);

        if (response.success) {
          yield put({
            type: 'updateDictionaryItem',
            payload: {
              id: examId,
              data: response.data,
            },
          });

          return response.data;
        }

        notification.error({
          message: response.message || 'Something went wrong',
        });

        return false;
      } catch (err) {
        console.error(`Error when trying to get the detailed exam:`, err);
        notification.error({
          message: 'Something went wrong',
        });
        return false;
      }
    },

    *delete({ payload }, { call }) {
      try {
        const { examId } = payload;

        const response = yield call(deleteById, examId);
        if (response.success) {
          return true;
        }

        notification.error({
          message: response.message || 'Something went wrong',
        });

        return false;
      } catch (err) {
        console.error(`Error when trying to delete a exam:`, err);
        notification.error({
          message: 'Something went wrong',
        });
        return false;
      }
    },

    *create({ payload }, { call, put }) {
      try {
        const { exam, cb } = payload;
        const response = yield call(createExam, exam);
        if (response.success) {
          const { mapping: dic } = mapBuilder(response.data, 'id');

          yield put({
            type: 'updateDictionary',
            payload: { data: dic },
          });

          notification.success({
            message: 'Create new exam successfully!',
          });

          cb(response.data.id);
          return response.data;
        }

        notification.error({
          message: response.message || 'Something went wrong',
        });

        return false;
      } catch (err) {
        console.error(`Error when trying to get the detailed exam:`, err);

        notification.error({
          message: 'Something went wrong',
        });
        return false;
      }
    },

    *update({ payload }, { call, put }) {
      try {
        const { exam, examId, cb } = payload;
        const response = yield call(updateExam, exam, examId);
        if (response.success) {
          const { mapping: dic } = mapBuilder(response.data, 'id');

          yield put({
            type: 'updateDictionary',
            payload: { data: dic },
          });

          notification.success({
            message: 'Update exam successfully!',
          });

          cb(response.data.id);
          return response.data;
        }

        notification.error({
          message: response.message || 'Something went wrong',
        });

        return false;
      } catch (err) {
        console.error(`Error when trying to get the detailed exam:`, err);

        notification.error({
          message: 'Something went wrong',
        });
        return false;
      }
    },

    *overview({ payload }, { call }) {
      try {
        const { examId } = payload;

        const response = yield call(overviewExam, examId);

        if (response.success) {
          return response.data;
        }

        notification.error({
          message: response.message || 'Something went wrong',
        });

        return false;
      } catch (err) {
        console.error(`Error when trying to get the detailed exam:`, err);
        notification.error({
          message: 'Something went wrong',
        });
        return false;
      }
    },
  },

  reducers: {
    updateDictionary(state, { payload: { data, pagingParams } }) {
      return {
        ...state,
        dictionary: {
          ...state.dictionary,
          ...data,
        },
        ids: Object.keys(data),
        pagingParams: pagingParams,
      };
    },

    updateDictionaryItem(state, { payload: { id, data } }) {
      if (data) {
        const currentDoc = state.dictionary[id] || {};
        return {
          ...state,
          dictionary: {
            ...state.dictionary,
            [id]: {
              ...currentDoc,
              ...data,
            },
          },
          ids: state.ids.includes(id) ? state.ids : [...state.ids, id],
        };
      }

      return {
        ...state,
        dictionary: {
          ...state.dictionary,
          [id]: undefined,
        },
      };
    },
  },
};

export default ExamModel;
