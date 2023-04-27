export interface TodoItemDto {
  id: number;
  title: string;
  deadline: string | undefined;
  isDone: boolean;
  created: string;
  modified: string;
}
