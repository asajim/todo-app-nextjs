export interface TodoItemModel {
  id: number;
  title: string;
  deadline: string | null;
  isDone: boolean;
  modified: string;
  created: string;
  hasPassedDeadline: boolean;
}

export interface AddTodoRequest {
  title: string;
  deadline: string | undefined;
}

export interface EditTodoRequest {
  id: string;
  title: string;
  deadline: string | null;
  isDone: boolean;
}
