import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Flex,
  FlexProps,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/domain/redux/dispatch';
import {
  editTodoItemAsync,
  getTodoState,
  resetEditTodoRequest,
} from '@/domain/redux/slices/todo';
import { useDebounce } from 'use-debounce';
import { RequestStatus } from '@/domain/model/request';
import { TodoItemModel } from '@/domain/model/todo';

interface Props extends FlexProps {
  item: TodoItemModel;
}

export const EditTodoItem = memo(({ item, ...rest }: Props) => {
  const toast = useToast();

  // Redux
  const dispatch = useAppDispatch();
  const { editTodoItemRequest } = useAppSelector(getTodoState);
  const [editTodoItemRequestDebounced] = useDebounce(editTodoItemRequest, 500);

  // States
  const [title, setTitle] = useState(item.title);
  const [deadline, setDeadline] = useState(item.deadline ?? '');
  const [isDone, setIsDone] = useState<boolean>(item.isDone);

  const editTodo = useCallback(() => {
    dispatch(
      editTodoItemAsync({
        id: item.id.toString(),
        title: title.trim(),
        deadline: deadline,
        isDone: isDone,
      }),
    );
  }, [dispatch, item.id, title, deadline, isDone]);

  useEffect(() => {
    switch (editTodoItemRequest.status) {
      case RequestStatus.IDLE:
        break;
      case RequestStatus.PENDING:
        break;
      case RequestStatus.FULFILLED:
        dispatch(resetEditTodoRequest());
        toast({
          title: 'Success',
          description: 'Todo item is updated.',
          status: 'success',
          position: 'top',
          duration: 2000,
        });
        break;
      case RequestStatus.REJECTED:
        toast({
          title: 'Error',
          description: editTodoItemRequest.error.toString(),
          status: 'error',
          position: 'top',
          duration: 2000,
        });
        break;
    }
  }, [editTodoItemRequest, dispatch, toast]);

  return (
    <Flex
      direction={'column'}
      gap={'2'}
      borderRadius={'md'}
      borderWidth={'1px'}
      borderColor={'gray.500'}
      p={'2'}
      {...rest}
    >
      <Text>Title (required)</Text>
      <Input
        placeholder={'Title'}
        value={title}
        onChange={(event) => {
          event.preventDefault();
          setTitle(event.target.value);
        }}
      />

      <Text>Deadline (optional)</Text>
      <Input
        value={deadline}
        onChange={(event) => {
          event.preventDefault();
          setDeadline(event.target.value);
        }}
      />

      <Flex gap={'4'}>
        <Text>Is done</Text>
        <Checkbox
          isChecked={isDone}
          onChange={(event) => {
            event.preventDefault();
            setIsDone(event.target.checked);
          }}
        />
      </Flex>

      <Button
        onClick={(event) => {
          event.preventDefault();
          editTodo();
        }}
        isLoading={
          editTodoItemRequestDebounced.status === RequestStatus.PENDING
        }
        isDisabled={!title.trim().length}
      >
        Edit todo-item
      </Button>
    </Flex>
  );
});
