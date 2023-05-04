import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
      const json = localStorage.getItem("todos");
      const loadedTodos = JSON.parse(json);
      if (loadedTodos){
          setTodos(loadedTodos);
      }
  },[])
  
  React.useEffect(() => {
      if([todos].length > 0) {
          const json = JSON.stringify(todos);
          localStorage.setItem("todos",json);
      }
  })
  // Add the handlesubmit code here
  function handleSubmit(e){
      e.preventDefault();

      const newTodo = {
          id: new Date().getTime(),
          text: todo.trim(),
          completed: false,
      }

      if (newTodo.text.length > 0) {
          setTodos([...todos].concat(newTodo));
          setTodo("");
      } else{
          alert("Enter a Valid Task");
          setTodo("");
      }
  }
  
  // Add the deleteToDo code here
  function deleteToDo(todotodelete){
    setTodos([...todos].filter((todo) => {return todo.id !== todotodelete.id}))
  }
  
  // Add the toggleComplete code here
  function toggleComplete(todotocomplete){
    setTodos([...todos].filter((todo) => {
        if (todo.id === todotocomplete.id) {
            todo.completed = !todo.completed
        }
        return todo;
    }))
  }
  
  // Add the submitEdits code here
  function submitEdits(todotoedit) {
    setTodos([...todos].filter((todo) => {
        if (todo.id === todotoedit.id) {
            todo.text = editingText
        }
        return todo;
    }))
    setTodoEditing(null)
    }
  
    return (
        <div id="todo-list">
          <h1>Todo List</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
            />
            <button type="submit">Add Todo</button>
          </form>
          {todos.map((todo) => (
            <div key={todo.id} className="todo">
              <div className="todo-text">
                <input
                  type="checkbox"
                  id="completed"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo)}
                />
                {todo.id === todoEditing ? (
                  <input
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  <div>{todo.text}</div>
                )}
              </div>
              <div className="todo-actions">
                {todo.id === todoEditing ? (
                  <button onClick={() => submitEdits(todo)}>Submit Edits</button>
                ) : (
                  <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
                )}
                <button onClick={() => deleteToDo(todo)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      );
    };

export default App;
