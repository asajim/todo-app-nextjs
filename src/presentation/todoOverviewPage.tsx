import { memo } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { TodoItemModel } from '@/domain/model/todo';
import { TodoItems } from '@/presentation/todoItem/todoItems';
import { AddTodoItem } from '@/presentation/todoItem/addTodoItem';

interface Props {
  todoItems: TodoItemModel[];
}

export const TodoOverviewPage = memo(({ todoItems }: Props) => {
  return (
    <Flex
      w={'full'}
      direction={'column'}
      maxW={'container.xl'}
      marginX={'auto'}
    >
      <Heading>Welcome at To-do App</Heading>
      <AddTodoItem mt={'5'} />
      <TodoItems todoItems={todoItems} mt={'8'} />
    </Flex>
  );
});
