import React, { useState } from 'react';
import './App.css';

type Todo = Readonly<{
  id: number
  text: string
  done: boolean
}>

type Todos = readonly Todo[]

type CompletedTodo = Todo & { readonly done: true }

const initialTodos: Todos = [
  {
    id: 1,
    text: 'hello',
    done: false,
  },
];

function App() {
  const [inputTodo, setInputTodo] = useState('');
  const [todos, setTodos] = useState<Todos>(initialTodos);

  function addTodo(e: React.ChangeEvent<HTMLInputElement>): void {
    setInputTodo(e.target.value)
  }

  function onEnter(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      setTodos(state => {
        return [
          ...state,
          {
            id: todos.length,
            text: inputTodo,
            done: false,
          }
        ]
      });

      setInputTodo('');
    }
  }

  function onCheck(todo: Todo, index: number): void {
    const newTodo = { ...todo, done: !todo.done };
    const newTodos = [...todos];
    
    newTodos.splice(index, 1, newTodo);

    setTodos(newTodos);
  }

  function completeAll() {
    const completedTodos: CompletedTodo[] = todos.map(todo => ({
      ...todo,
      done: true,
    }));

    setTodos(completedTodos);
  }

  return (
    <div className="App">
      <input value={inputTodo} onChange={addTodo} onKeyPress={onEnter} />

      <ul>
        {
          todos.map((todo, index) => (
            <li>
              <input type="checkbox" checked={todo.done} onChange={() => onCheck(todo, index)} />
              {todo.text}
            </li>
          ))
        }
      </ul>

      <button onClick={completeAll}>Complete All</button>
    </div>
  );
}

export default App;
