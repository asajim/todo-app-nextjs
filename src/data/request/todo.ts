import axiosInstance from '@/data/network';
import { apiEndpoints } from '@/data/apiEndpoints';
import { TodoItemDto } from '@/data/dto/todo';

export async function fetchTodoItems(): Promise<TodoItemDto[]> {
  const result = await axiosInstance.get(apiEndpoints.todoItems);
  return result.data;
}

export async function fetchTodoItem(id: string): Promise<TodoItemDto> {
  const result = await axiosInstance.get(apiEndpoints.todoItem(id));
  return result.data;
}

export async function createNewTodoItem(
  title: string,
  deadline: string | undefined,
): Promise<TodoItemDto> {
  const result = await axiosInstance.post(apiEndpoints.todoItems, {
    title,
    deadline,
  });
  return result.data;
}

export async function updateTodoItem(
  id: string,
  title: string,
  deadline: string | null,
  isDone: boolean,
): Promise<TodoItemDto> {
  const result = await axiosInstance.put(apiEndpoints.todoItem(id), {
    title,
    deadline,
    isDone,
  });
  return result.data;
}

export async function deleteTodoItem(id: string): Promise<TodoItemDto> {
  const result = await axiosInstance.delete(apiEndpoints.todoItem(id));
  return result.data;
}
