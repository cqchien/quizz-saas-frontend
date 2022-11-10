import { notification } from 'antd';
import { getAll, getById, deleteById, createGroup, updateGroup } from '@/services/group';
import { mapBuilder } from '@/utils/function';
import type { Effect, Reducer } from 'umi';

const NAMESPACE = 'groups';
export interface IGroupState {
  dictionary: Record<string, any>;
  ids: string[];
}

interface IGroupModel {
  namespace: string;
  state: IGroupState;
  effects: {
    fetch: Effect;
    getDetail: Effect;
    delete: Effect;
    create: Effect;
    update: Effect;
  };
  reducers: {
    updateDictionary: Reducer;
    updateDictionaryItem: Reducer;
  };
}

const GroupModel: IGroupModel = {
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
          yield put({
            type: 'updateDictionary',
            payload: { data: dic },
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
        const { groupId } = payload;

        const response = yield call(getById, groupId);

        if (response.success) {
          yield put({
            type: 'updateDictionaryItem',
            payload: {
              id: groupId,
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
        console.error(`Error when trying to get the detailed group:`, err);
        notification.error({
          message: 'Something went wrong',
        });
        return false;
      }
    },

    *delete({ payload }, { call }) {
      try {
        const { groupId } = payload;

        const response = yield call(deleteById, groupId);
        if (response.success) {
          return true;
        }

        notification.error({
          message: response.message || 'Something went wrong',
        });

        return false;
      } catch (err) {
        console.error(`Error when trying to delete a group:`, err);
        notification.error({
          message: 'Something went wrong',
        });
        return false;
      }
    },

    *create({ payload }, { call, put }) {
      try {
        const { group } = payload;
        const response = yield call(createGroup, group);
        if (response.success) {
          const { mapping: dic } = mapBuilder(response.data, 'id');

          yield put({
            type: 'updateDictionary',
            payload: { data: dic },
          });

          notification.success({
            message: 'Create new group successfully!',
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

    *update({ payload }, { call, put }) {
      try {
        const { group, groupId } = payload;
        const response = yield call(updateGroup, group, groupId);
        if (response.success) {
          const { mapping: dic } = mapBuilder(response.data, 'id');

          yield put({
            type: 'updateDictionary',
            payload: { data: dic },
          });

          notification.success({
            message: 'Update group successfully!',
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

export default GroupModel;
