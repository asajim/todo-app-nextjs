import { TodoItemDto } from '@/data/dto/todo';
import { TodoItemModel } from '@/domain/model/todo';

export function convertTodo(dto: TodoItemDto): TodoItemModel {
  return {
    ...dto,
    deadline: dto.deadline ?? null,
  };
}
