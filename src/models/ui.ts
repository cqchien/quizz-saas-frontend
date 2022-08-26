import type { Reducer } from 'umi';
import type { EffectWithType } from 'dva';
import { delay } from 'redux-saga';

const SNACKBAR_ICON: any = {
  success: 'check',
  error: 'warning',
};

export interface IUIState {
  snackBarPayload?: any;
  removeImg?: any;
}

interface IUIModel {
  namespace: 'ui';
  state: IUIState;
  effects: {
    showSnackbar: EffectWithType;
  };
  reducers: {
    updateSnackbarPayload: Reducer;
  };
}

const UIModel: IUIModel = {
  namespace: 'ui',

  state: {
    snackBarPayload: null,
  },

  effects: {
    showSnackbar: [
      function* ({ payload }, { put }) {
        const { type, icon, delay: delaySec, title, dateTime, content } = payload;
        yield put({
          type: 'updateSnackbarPayload',
          payload: {
            type: type || 'success',
            icon: icon || SNACKBAR_ICON[type] || SNACKBAR_ICON.success,
            title: title || 'OP3N - Admin Portal',
            dateTime: dateTime || 'now',
            open: true,
            content,
            close: () => {},
          },
        });
        yield delay(delaySec || 3000);
        yield put({
          type: 'updateSnackbarPayload',
          payload: null,
        });
      },
      {
        type: 'takeLatest',
      },
    ],
  },

  reducers: {
    updateSnackbarPayload(state, action) {
      return {
        ...state,
        snackBarPayload: action.payload,
      };
    },
  },
};

export default UIModel;
