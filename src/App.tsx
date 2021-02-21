import React, { useState } from 'react';
import './App.css';

type Todo = Readonly<{
  id: number
  text: string
  done: boolean
}>

type Todos = readonly Todo[]

const initialTodo: Todos = [
  {
    id: 1,
    text: 'hello',
    done: false,
  },
];

function App() {
  const [todos, setTodos] = useState<Todos>(initialTodo);
  return (
    <div className="App">
      <ul>
        {
          todos.map(todo => (
            <li>
              <input type="checkbox" checked={todo.done} />
              {todo.text}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
