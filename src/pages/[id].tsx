import { TodoDetailPage } from '@/presentation/todoDetailPage';
import { GetServerSidePropsContext } from 'next';
import { fetchTodoItem } from '@/data/request/todo';
import { convertTodo } from '@/domain/converter/todo';
import { wrapper } from '@/domain/redux/store';
import { addTodoItem } from '@/domain/redux/slices/todo';

export default function TodoDetailWrapper() {
  return <TodoDetailPage />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) =>
    async ({ query }: GetServerSidePropsContext) => {
      try {
        const dto = await fetchTodoItem(query['id'] as string);
        const item = convertTodo(dto);
        dispatch(addTodoItem(item));
        return {
          props: {},
        };
      } catch (e) {
        console.error(e);
        return {
          notFound: true,
        };
      }
    },
);
