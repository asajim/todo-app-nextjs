import { memo } from 'react';
import { TodoItemModel } from '@/domain/model/todo';
import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Routes } from '@/presentation/routes';

interface Props {
  todoItem: TodoItemModel;
}

export const TodoItem = memo(({ todoItem }: Props) => {
  const router = useRouter();

  return (
    <Flex
      direction={'column'}
      borderRadius={'md'}
      borderWidth={'1px'}
      borderColor={'gray.100'}
      shadow={'md'}
      p={'4'}
      cursor={'pointer'}
      onClick={(event) => {
        event.preventDefault();
        router.push(Routes.todoDetail(todoItem.id));
      }}
    >
      <Text>Id: {todoItem.id}</Text>
      <Text>Title: {todoItem.title}</Text>
      <Text>{todoItem.isDone ? 'Done' : 'Not yet done'}</Text>
      <Text>Created: {todoItem.created}</Text>
      <Text>Deadline: {todoItem.deadline ?? '-'}</Text>
      <Text>Last modified: {todoItem.modified}</Text>
    </Flex>
  );
});
