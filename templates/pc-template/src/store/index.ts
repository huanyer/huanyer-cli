import { init, RematchDispatch, RematchRootState, Models } from '@rematch/core';
import user from './user';

export const models: RootModel = { user };
export interface RootModel extends Models<RootModel> {
  user: typeof user;
}

export const store = init({
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

export default store;
