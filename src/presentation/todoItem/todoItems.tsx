import { memo } from 'react';
import { Flex } from '@chakra-ui/react';
import { TodoItemModel } from '@/domain/model/todo';
import { TodoItem } from '@/presentation/todoItem/todoItem';

interface Props {
  todoItems: TodoItemModel[];
}

export const TodoItems = memo(({ todoItems }: Props) => {
  return (
    <Flex w={'full'} direction={'column'} gap={'4'} mt={'4'}>
      {todoItems.map((value) => {
        return <TodoItem todoItem={value} key={value.id} />;
      })}
    </Flex>
  );
});
