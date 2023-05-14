import { memo } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';
import { TodoItemModel } from '@/domain/model/todo';
import { TodoItem } from '@/presentation/todoItem/todoItem';

interface Props extends FlexProps {
  todoItems: TodoItemModel[];
}

export const TodoItems = memo(({ todoItems, ...rest }: Props) => {
  return (
    <Flex
      w={'full'}
      gap={'4'}
      flexWrap={'wrap'}
      justify={'space-between'}
      {...rest}
    >
      {todoItems.map((value) => {
        return <TodoItem todoItem={value} key={value.id} />;
      })}
    </Flex>
  );
});
