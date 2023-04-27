import {
  createAsyncThunk,
  createSlice,
  Draft,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  createNewTodoItem,
  deleteTodoItem,
  updateTodoItem,
} from '@/data/request/todo';
import { convertTodo } from '@/domain/converter/todo';
import { Request, RequestStatus } from '@/domain/model/request';
import {
  AddTodoRequest,
  EditTodoRequest,
  TodoItemModel,
} from '@/domain/model/todo';

export interface TodoState {
  todoItems: TodoItemModel[];
  addTodoItemRequest: Request;
  editTodoItemRequest: Request;
  deleteTodoItemRequest: Request;
}

const initialState: TodoState = {
  todoItems: [],
  addTodoItemRequest: { status: RequestStatus.IDLE },
  editTodoItemRequest: { status: RequestStatus.IDLE },
  deleteTodoItemRequest: { status: RequestStatus.IDLE },
};

export const addTodoItemAsync = createAsyncThunk(
  'todoItem/addTodoItem',
  async ({ title, deadline }: AddTodoRequest) => {
    const dto = await createNewTodoItem(title, deadline);
    return convertTodo(dto);
  },
);

export const editTodoItemAsync = createAsyncThunk(
  'todoItem/editTodoItem',
  async ({ id, title, deadline, isDone }: EditTodoRequest) => {
    const dto = await updateTodoItem(id, title, deadline, isDone);
    return convertTodo(dto);
  },
);

export const deleteTodoItemAsync = createAsyncThunk(
  'todoItem/deleteTodoItem',
  async (id: string) => {
    const dto = await deleteTodoItem(id);
    return convertTodo(dto);
  },
);

export const todoItemSlice = createSlice({
  name: 'todoItem',
  initialState,
  reducers: {
    resetAddTodoRequest: (state) => {
      state.addTodoItemRequest = { status: RequestStatus.IDLE };
    },
    resetEditTodoRequest: (state) => {
      state.editTodoItemRequest = { status: RequestStatus.IDLE };
    },
    resetDeleteTodoRequest: (state) => {
      state.deleteTodoItemRequest = { status: RequestStatus.IDLE };
    },
    setTodoItems: (
      state: Draft<TodoState>,
      action: PayloadAction<TodoItemModel[]>,
    ) => {
      state.todoItems = action.payload.sort((a, b) =>
        b.modified.localeCompare(a.modified),
      );
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
        state.todoItems = [...state.todoItems, newItem].sort((a, b) =>
          b.modified.localeCompare(a.modified),
        );
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
        state.todoItems = [...state.todoItems, action.payload].sort((a, b) =>
          b.modified.localeCompare(a.modified),
        );
      })
      .addCase(addTodoItemAsync.pending, (state) => {
        state.addTodoItemRequest = { status: RequestStatus.PENDING };
      })
      .addCase(addTodoItemAsync.rejected, (state, action) => {
        state.addTodoItemRequest = {
          status: RequestStatus.REJECTED,
          error: action.error.message ?? 'Error fetching todo items',
        };
      })
      .addCase(editTodoItemAsync.fulfilled, (state, action) => {
        state.editTodoItemRequest = {
          status: RequestStatus.FULFILLED,
        };
        state.todoItems = [...state.todoItems, action.payload].sort((a, b) =>
          b.modified.localeCompare(a.modified),
        );
      })
      .addCase(editTodoItemAsync.pending, (state) => {
        state.editTodoItemRequest = { status: RequestStatus.PENDING };
      })
      .addCase(editTodoItemAsync.rejected, (state, action) => {
        state.editTodoItemRequest = {
          status: RequestStatus.REJECTED,
          error: action.error.message ?? 'Error editing todo item ',
        };
      })
      .addCase(deleteTodoItemAsync.fulfilled, (state, action) => {
        state.deleteTodoItemRequest = {
          status: RequestStatus.FULFILLED,
        };
        state.todoItems = [...state.todoItems, action.payload].sort((a, b) =>
          b.modified.localeCompare(a.modified),
        );
      })
      .addCase(deleteTodoItemAsync.pending, (state) => {
        state.deleteTodoItemRequest = { status: RequestStatus.PENDING };
      })
      .addCase(deleteTodoItemAsync.rejected, (state, action) => {
        state.deleteTodoItemRequest = {
          status: RequestStatus.REJECTED,
          error: action.error.message ?? 'Error deleting todo item ',
        };
      });
  },
});

export const {
  resetAddTodoRequest,
  resetEditTodoRequest,
  resetDeleteTodoRequest,
  setTodoItems,
  addTodoItem,
} = todoItemSlice.actions;
export const getTodoState = (state: RootState) => state.todo;

export default todoItemSlice.reducer;
