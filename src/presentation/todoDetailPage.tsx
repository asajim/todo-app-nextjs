import { memo } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { useAppSelector } from '@/domain/redux/dispatch';
import { getTodoState } from '@/domain/redux/slices/todo';
import { useRouter } from 'next/router';
import { EditTodoItem } from '@/presentation/todoItem/editTodoItem';
import { RemoveTodoItem } from '@/presentation/todoItem/removeTodoItem';

export const TodoDetailPage = memo(() => {
  const router = useRouter();
  const todoId = router.query['id'] as string;
  const { todoItems } = useAppSelector(getTodoState);
  const todoItem = todoItems.find((value) => value.id === parseInt(todoId));

  if (!todoItem) {
    return <></>;
  }

  return (
    <Flex
      minH={'100vh'}
      h={'full'}
      direction={'column'}
      p={'4'}
      maxW={'container.xl'}
      marginX={'auto'}
      bg={
        todoItem.isDone
          ? 'green.50'
          : todoItem.hasPassedDeadline
          ? 'red.50'
          : 'white'
      }
    >
      <Heading>Title: {todoItem.title}</Heading>
      <Text>Id: {todoItem.id}</Text>
      <Text>{todoItem.isDone ? 'Done' : 'Not yet done'}</Text>
      <Text>Created: {todoItem.created}</Text>
      <Text>Deadline: {todoItem.deadline ?? '-'}</Text>
      <Text>Last modified: {todoItem.modified}</Text>

      <EditTodoItem item={todoItem} mt={'2'} />
      <RemoveTodoItem item={todoItem} mt={'2'} />
    </Flex>
  );
});
