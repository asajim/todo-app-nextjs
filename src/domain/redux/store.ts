import todoReducer, { TodoState } from './slices/todo';
import {
  Action,
  AnyAction,
  CombinedState,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

export interface InitialState {
  todo: TodoState;
}

const combinedReducer = combineReducers({
  todo: todoReducer,
});

const masterReducer = (
  state: CombinedState<InitialState> | undefined,
  action: AnyAction,
) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  } else {
    return combinedReducer(state, action);
  }
};

const store = configureStore({
  reducer: masterReducer,
});

export const wrapper = createWrapper(() => store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
