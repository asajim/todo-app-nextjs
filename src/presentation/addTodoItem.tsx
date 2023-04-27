import React, { memo, useCallback, useState } from 'react';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { useAppDispatch } from '@/domain/redux/dispatch';
import { addTodoItemAsync } from '@/domain/redux/slices/todo';

export const AddTodoItem = memo(() => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState<Date | undefined>();
  const dispatch = useAppDispatch();

  const addTodo = useCallback(() => {
    dispatch(addTodoItemAsync({ title, deadline: deadline?.toISOString() }));
  }, [dispatch, title, deadline]);

  return (
    <Flex
      direction={'column'}
      gap={'2'}
      borderRadius={'md'}
      borderWidth={'1px'}
      borderColor={'gray.500'}
      p={'2'}
    >
      <Text>Title</Text>
      <Input
        placeholder={'Title'}
        value={title}
        onChange={(event) => {
          event.preventDefault();
          setTitle(event.target.value);
        }}
      />

      <Text flex={1}>Deadline</Text>
      <SingleDatepicker date={deadline} onDateChange={setDeadline} />

      <Button
        onClick={(event) => {
          event.preventDefault();
          addTodo();
        }}
      >
        Add new todo-item
      </Button>
    </Flex>
  );
});
