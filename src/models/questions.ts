import { getAll } from '@/services/question';
import { mapBuilder } from '@/utils/function';
import type { Effect, Reducer } from 'umi';

const NAMESPACE = 'questions';

export interface IQuestionState {
  dictionary: Record<string, any>;
  ids: string[];
}

interface IQuestionModel {
  namespace: string;
  state: IQuestionState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    updateDictionary: Reducer;
  };
}

const QuestionModel: IQuestionModel = {
  namespace: NAMESPACE,

  state: {
    dictionary: {},
    ids: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      try {
        const response = yield call(getAll);
        if (Array.isArray(response.data) && response.success) {
          const { mapping: dic } = mapBuilder(response.data, 'id');

          yield put({
            type: 'updateDictionary',
            payload: { data: dic },
          });
          return response.data;
        }

        yield put({
          type: 'ui/showSnackbar',
          payload: {
            type: 'error',
            content: 'Something went wrong',
          },
        });
        return false;
      } catch (err) {
        console.error(`Error when trying to get questions:`, err);
        yield put({
          type: 'ui/showSnackbar',
          payload: {
            type: 'error',
            content: '',
          },
        });
        return false;
      }
    },
  },

  reducers: {
    updateDictionary(state, { payload: { data } }) {
      return {
        ...state,
        dictionary: {
          ...state.dictionary,
          ...data,
        },
        ids: Object.keys(data),
      };
    },
  },
};

export default QuestionModel;
