import { notification } from 'antd';
import { getAll, getById, importListQuestions } from '@/services/question';
import { mapBuilder } from '@/utils/function';
import type { Effect, Reducer } from 'umi';

const NAMESPACE = 'questions';
export interface IQuestionState {
  dictionary: Record<string, any>;
  ids: string[];
  pagingParams: API.PageParams;
}

interface IQuestionModel {
  namespace: string;
  state: IQuestionState;
  effects: {
    fetch: Effect;
    getDetail: Effect;
    import: Effect;
  };
  reducers: {
    updateDictionary: Reducer;
    updateDictionaryItem: Reducer;
  };
}

const QuestionModel: IQuestionModel = {
  namespace: NAMESPACE,

  state: {
    dictionary: {},
    ids: [],
    pagingParams:{},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const {params} = payload;
        const response = yield call(getAll, params);

        if (Array.isArray(response.data) && response.success) {
          const { mapping: dic } = mapBuilder(response.data, 'id');
          const newPagingParams = {
            current: response.meta.page,
            pageSize: response.meta.take,
            total: response.meta.itemCount,
          }
          yield put({
            type: 'updateDictionary',
            payload: { data: dic, pagingParams: newPagingParams},
          });
          return true;
        }

        notification.error({
          message: response.message || 'Something went wrong'
        })

        return false;
      } catch (err) {
        console.error(`Error when trying to get questions:`, err);
        notification.error({
          message: 'Something went wrong'
        })
        return false;
      }
    },

    *getDetail({ payload }, { call, put }) {
      try {
        const { questionId } = payload;

        const response = yield call(getById, questionId);

        if (response.success) {
          yield put({
            type: 'updateDictionaryItem',
            payload: {
              id: questionId,
              data: response.data,
            },
          });

          return response.data;
        }

        notification.error({
          message: response.message || 'Something went wrong'
        })

        return false;
      } catch (err) {
        console.error(`Error when trying to get the detailed question:`, err);
        notification.error({
          message: 'Something went wrong'
        })
        return false;
      }
    },

    *import({ payload }, { call, put }) {
      try {
        const response = yield call(importListQuestions, payload);
        if (Array.isArray(response.data) && response.success) {
          const { mapping: dic } = mapBuilder(response.data, 'id');

          yield put({
            type: 'updateDictionary',
            payload: { data: dic },
          });
          return response.data;
        }

        notification.error({
          message: response.message || 'Something went wrong'
        })

        return false;
      } catch (err) {
        console.error(`Error when trying to get the detailed question:`, err);

        notification.error({
          message: 'Something went wrong'
        })
        return false;
      }
    },
  },

  reducers: {
    updateDictionary(state, { payload: { data, pagingParams} }) {
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
      };

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

export default QuestionModel;
