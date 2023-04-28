import { TodoOverviewPage } from '@/presentation/todoOverviewPage';
import { fetchTodoItems } from '@/data/request/todo';
import { convertTodo } from '@/domain/converter/todo';
import { wrapper } from '@/domain/redux/store';
import { getTodoState, setTodoItems } from '@/domain/redux/slices/todo';
import { useAppSelector } from '@/domain/redux/dispatch';

export default function HomePageWrapper() {
  const { todoItems } = useAppSelector(getTodoState);
  return <TodoOverviewPage todoItems={todoItems} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) =>
    async () => {
      try {
        const dtos = await fetchTodoItems();
        const items = dtos.map(convertTodo);
        dispatch(setTodoItems(items));
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
