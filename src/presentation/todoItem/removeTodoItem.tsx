import { memo, useCallback, useEffect } from 'react';
import { TodoItemModel } from '@/domain/model/todo';
import { Button, ButtonProps, useToast } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/domain/redux/dispatch';
import {
  deleteTodoItemAsync,
  getTodoState,
  resetEditTodoRequest,
} from '@/domain/redux/slices/todo';
import { useDebounce } from 'use-debounce';
import { RequestStatus } from '@/domain/model/request';
import { useRouter } from 'next/router';
import { Routes } from '@/presentation/routes';

interface Props extends ButtonProps {
  item: TodoItemModel;
}

export const RemoveTodoItem = memo(({ item, ...rest }: Props) => {
  const toast = useToast();
  const router = useRouter();

  // Redux
  const dispatch = useAppDispatch();
  const { deleteTodoItemRequest } = useAppSelector(getTodoState);
  const [deleteTodoItemRequestDebounced] = useDebounce(
    deleteTodoItemRequest,
    500,
  );

  const deleteTodo = useCallback(() => {
    dispatch(deleteTodoItemAsync(item.id.toString()));
  }, [dispatch, item.id]);

  useEffect(() => {
    switch (deleteTodoItemRequest.status) {
      case RequestStatus.IDLE:
        break;
      case RequestStatus.PENDING:
        break;
      case RequestStatus.FULFILLED:
        dispatch(resetEditTodoRequest());
        toast({
          title: 'Success',
          description: 'Todo item is deleted.',
          status: 'success',
          position: 'top',
          duration: 2000,
        });
        router.push(Routes.todoOverview);
        break;
      case RequestStatus.REJECTED:
        toast({
          title: 'Error',
          description: deleteTodoItemRequest.error.toString(),
          status: 'error',
          position: 'top',
          duration: 2000,
        });
        break;
    }
  }, [deleteTodoItemRequest, dispatch, router, toast]);

  return (
    <Button
      onClick={(event) => {
        event.preventDefault();
        deleteTodo();
      }}
      isLoading={
        deleteTodoItemRequestDebounced.status === RequestStatus.PENDING
      }
      variant={'outline'}
      {...rest}
    >
      Remove todo-item
    </Button>
  );
});
