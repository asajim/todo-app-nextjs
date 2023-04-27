import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Button,
  Flex,
  FlexProps,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/domain/redux/dispatch';
import {
  addTodoItemAsync,
  getTodoState,
  resetAddTodoRequest,
} from '@/domain/redux/slices/todo';
import { useDebounce } from 'use-debounce';
import { RequestStatus } from '@/domain/model/request';

export const AddTodoItem = memo((props: FlexProps) => {
  const toast = useToast();

  // States
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  // Redux
  const dispatch = useAppDispatch();
  const { addTodoItemRequest } = useAppSelector(getTodoState);
  const [addTodoItemRequestDebounced] = useDebounce(addTodoItemRequest, 500);

  const addTodo = useCallback(() => {
    dispatch(
      addTodoItemAsync({
        title: title.trim(),
        deadline: deadline || undefined,
      }),
    );
  }, [dispatch, title, deadline]);

  useEffect(() => {
    switch (addTodoItemRequest.status) {
      case RequestStatus.IDLE:
        break;
      case RequestStatus.PENDING:
        break;
      case RequestStatus.FULFILLED:
        dispatch(resetAddTodoRequest());
        setTitle('');
        setDeadline('');
        toast({
          title: 'Success',
          description: 'Todo item is created.',
          status: 'success',
          position: 'top',
          duration: 2000,
        });
        break;
      case RequestStatus.REJECTED:
        toast({
          title: 'Error',
          description: addTodoItemRequest.error.toString(),
          status: 'error',
          position: 'top',
          duration: 2000,
        });
        break;
    }
  }, [addTodoItemRequest, dispatch, toast]);

  return (
    <Flex
      direction={'column'}
      gap={'2'}
      borderRadius={'md'}
      borderWidth={'1px'}
      borderColor={'gray.500'}
      p={'2'}
      {...props}
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

      <Button
        onClick={(event) => {
          event.preventDefault();
          addTodo();
        }}
        isLoading={addTodoItemRequestDebounced.status === RequestStatus.PENDING}
        isDisabled={!title.trim().length}
      >
        Add new to-do-item
      </Button>
    </Flex>
  );
});
