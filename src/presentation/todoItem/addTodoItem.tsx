import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Box,
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
import DatePicker from 'react-datepicker';
import moment from 'moment';

export const AddTodoItem = memo((props: FlexProps) => {
  const toast = useToast();

  // States
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState<Date | null>();

  // Redux
  const dispatch = useAppDispatch();
  const { addTodoItemRequest } = useAppSelector(getTodoState);
  const [addTodoItemRequestDebounced] = useDebounce(addTodoItemRequest, 500);

  const addTodo = useCallback(() => {
    dispatch(
      addTodoItemAsync({
        title: title.trim(),
        deadline: deadline ? moment(deadline).format('YYYY-MM-DD') : undefined,
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
        setDeadline(null);
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
      <Box
        css={{
          '.react-datepicker__input-container': {
            border: '1px black solid',
            height: '40px',
            borderRadius: '8px',
          },
          input: {
            width: '100%',
            height: '38px',
            backgroundColor: 'transparent',
            borderRadius: '8px',
            paddingLeft: '16px',
          },
        }}
        w={'full'}
      >
        <DatePicker
          selected={deadline}
          onChange={(date) => setDeadline(date)}
        />
      </Box>

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
