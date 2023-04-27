import {
  createAsyncThunk,
  createSlice,
  Draft,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { createNewTodoItem } from '@/data/request/todo';
import { convertTodo } from '@/domain/converter/todo';
import { Request, RequestStatus } from '@/domain/model/request';
import { AddTodoRequest, TodoItemModel } from '@/domain/model/todo';

export interface TodoState {
  todoItems: TodoItemModel[];
  addTodoItemRequest: Request;
}

const initialState: TodoState = {
  todoItems: [],
  addTodoItemRequest: { status: RequestStatus.IDLE },
};

export const addTodoItemAsync = createAsyncThunk(
  'todoItem/addTodoItem',
  async ({ title, deadline }: AddTodoRequest) => {
    const dto = await createNewTodoItem(title, deadline);
    return convertTodo(dto);
  },
);

export const todoItemSlice = createSlice({
  name: 'todoItem',
  initialState,
  reducers: {
    setTodoItems: (
      state: Draft<TodoState>,
      action: PayloadAction<TodoItemModel[]>,
    ) => {
      state.todoItems = action.payload;
    },
    addTodoItem: (
      state: Draft<TodoState>,
      action: PayloadAction<TodoItemModel>,
    ) => {
      const newItem = action.payload;
      const index = state.todoItems.findIndex(
        (value) => value.id === newItem.id,
      );
      if (index === -1) {
        state.todoItems = [...state.todoItems, newItem];
      } else {
        state.todoItems[index] = newItem;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodoItemAsync.fulfilled, (state, action) => {
        state.addTodoItemRequest = {
          status: RequestStatus.FULFILLED,
        };
        state.todoItems = [...state.todoItems, action.payload];
      })
      .addCase(addTodoItemAsync.pending, (state) => {
        state.addTodoItemRequest = { status: RequestStatus.PENDING };
      })
      .addCase(addTodoItemAsync.rejected, (state, action) => {
        state.addTodoItemRequest = {
          status: RequestStatus.REJECTED,
          error: action.error.message ?? 'Error fetching articles ',
        };
      });
  },
});

export const { setTodoItems, addTodoItem } = todoItemSlice.actions;
export const getTodoState = (state: RootState) => state.todo;

export default todoItemSlice.reducer;
