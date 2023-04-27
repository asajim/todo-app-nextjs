import { memo } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { useAppSelector } from '@/domain/redux/dispatch';
import { getTodoState } from '@/domain/redux/slices/todo';
import { useRouter } from 'next/router';

export const TodoDetailPage = memo(() => {
  const router = useRouter();
  const todoId = router.query['id'] as string;
  const { todoItems } = useAppSelector(getTodoState);
  const todoItem = todoItems.find((value) => value.id === parseInt(todoId));

  if (!todoItem) {
    return <></>;
  }

  return (
    <Flex direction={'column'} p={'4'} maxW={'container.xl'} marginX={'auto'}>
      <Heading>Title: {todoItem.title}</Heading>
      <Text>Id: {todoItem.id}</Text>
      <Text>{todoItem.isDone ? 'Done' : 'Not yet done'}</Text>
      <Text>Created: {todoItem.created}</Text>
      <Text>Deadline: {todoItem.deadline ?? '-'}</Text>
      <Text>Last modified: {todoItem.modified}</Text>
    </Flex>
  );
});
