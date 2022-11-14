import { notification } from 'antd';
import { getAll, takeExam, submitExam } from '@/services/userExam';
import type { Effect, Reducer } from 'umi';
import { mapBuilder } from '@/utils/function';

const NAMESPACE = 'userExamsNamespace';
export interface IUserExamState {
  dictionary: Record<string, any>;
  ids: string[];
}

interface IUserExamModel {
  namespace: string;
  state: IUserExamState;
  effects: {
    takeExam: Effect;
    submitExam: Effect;
    fetch: Effect;
  };
  reducers: {
    updateDictionary: Reducer;
    updateDictionaryItem: Reducer;
  };
}

const UserExamModel: IUserExamModel = {
  namespace: NAMESPACE,

  state: {
    dictionary: {},
    ids: [],
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

    *takeExam({ payload }, { call, put }) {
      try {
        const { userExamId } = payload;

        const response = yield call(takeExam, userExamId);

        if (response.success) {
          yield put({
            type: 'updateDictionaryItem',
            payload: {
              id: userExamId,
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

    *submitExam({ payload }, { call }) {
      try {
        const { examSubmit, userExamId } = payload;
        const response = yield call(submitExam, userExamId, examSubmit);
        if (response.success) {
          console.log(response.data);

          notification.success({
            message: 'Submit exam successfully!',
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

export default UserExamModel;
