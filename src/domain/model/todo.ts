export interface TodoItemModel {
  id: number;
  title: string;
  deadline: string | null;
  isDone: boolean;
  modified: string;
  created: string;
}

export interface AddTodoRequest {
  title: string;
  deadline: string | undefined;
}