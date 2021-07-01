import { createModel } from '@rematch/core';

export interface IUserState {
  [propName: string]: any;
}

export const state: IUserState = {};

export default createModel<any>()({
  state,
  reducers: {
    reducerUserInfo(state: IUserState, userinfo: {}) {
      return {
        ...state,
        ...userinfo,
      };
    },
  },
  effects: dispatch => ({}),
});
