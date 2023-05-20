import { memo, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../store/store.ts";
import { toggle, remove } from "../store/todos-slice.ts";
import { TodoItem } from "./TodoItem.tsx";
import { selectTodos } from "../store/todos-slice.ts";

export const TodoList = memo(() => {
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  const handleToggle = useCallback(
    (id: string) => () => {
      dispatch(toggle(id));
    },
    [dispatch]
  );

  const handleRemove = useCallback(
    (id: string) => () => {
      dispatch(remove(id));
    },
    [dispatch]
  );

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
          onToggle={handleToggle(todo.id)}
          onRemove={handleRemove(todo.id)}
        />
      ))}
    </div>
  );
});
