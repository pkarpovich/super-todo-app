import { globalStyles } from "../global-styles.ts";
import { Header } from "./Header.tsx";
import { TodoList } from "./TodoList.tsx";

function App() {
  return (
    <div className={globalStyles}>
      <Header>
        <h2>Super Todo App</h2>
      </Header>
      <TodoList />
    </div>
  );
}

export default App;
