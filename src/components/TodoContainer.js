import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import Summary from "./Summary";
import { fetchTodos, addTodo, deleteTodo, updateTodo } from "../api";

function TodoContainer() {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);

  //FETCH THE TODOS WHEN THE APP GETS MOUNTED FOR THE FIRST TIME USING USEEFFECT HOOK
  useEffect(() => {
    async function post() {
      const data = await fetchTodos();
      if (data.success) {
        setLoading(false);
        setTodoList(data.data);
      } else {
        setLoading(false);

        toast.error("Some error occured");
        console.log("error in fetching todos");
      }
    }
    post();
  }, []);

  useEffect(() => {}, [todoList]);

  //get input from input box to input variable in react
  function handleInput(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  //add a new todo in todolist on click on add todo button in form
  async function handleAddTodo(e, title) {
    e.preventDefault();
    let newid = Date.now();
    const data = await addTodo(title, newid);

    if (data.success) {
      const newTodo = { ...data.data, id: newid };
      // console.log(newTodo);
      setTodoList([newTodo, ...todoList]);
      toast.success("Todo added successfully");

      setInput("");
    } else {
      toast.error("Some error occured");
    }
  }

  //delete a todo from todo list
  async function handleDeleteTodo(id) {
    const result = await deleteTodo(id);
    if (result.success) {
      const updatedTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(updatedTodoList);

      toast.success("Todo deleted successfully");
    } else {
      toast.error("Some error occured");
    }
  }

  //Toggle Completing a todo

  function toggleCompleted(e, id) {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;

        if (todo.completed) {
          e.target.classList.add("completed");
        } else {
          e.target.classList.remove("completed");
        }
        return todo;
      }

      return todo;
    });
    setTodoList(updatedTodoList);
  }

  //edit is clicked
  function handleEdit(id) {
    setEditTodo(id);
  }

  async function updateHandler(task) {
    const data = await updateTodo(task, editText);

    if (data.success) {
      const updatedTodoList = todoList.map((todo) => {
        if (todo.id === task.id) {
          todo = data.data;
        }
        return todo;
      });
      setTodoList(updatedTodoList);
      toast.success("Todo updated successfully");
      setEditText("");
      setEditTodo(null);
    } else {
      toast.error("Some error occured");
    }
  }

  return (
    <div>
      <header>
        <h1>TODO</h1>
      </header>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div>
          <Summary todoList={todoList} />
          <main>
            <div className="container">
              <form>
                <input
                  type="text"
                  value={input}
                  id="todo-input"
                  onChange={handleInput}
                  placeholder="Enter a new todo"
                  autoFocus
                />
                <button type="submit" onClick={(e) => handleAddTodo(e, input)}>
                  Add Todo
                </button>
              </form>

              <div id="list">
                {todoList.map((todo) => {
                  return (
                    <div className="list-item" key={todo.id}>
                      {editTodo === todo.id ? (
                        <div className="text-edit">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            autoFocus
                          />
                          <button
                            className="actions"
                            onClick={() => updateHandler(todo)}
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="text-edit">
                          <div onClick={(e) => toggleCompleted(e, todo.id)}>
                            {todo.completed ? (
                              <div style={{ textDecoration: "line-through" }}>
                                {todo.title}
                              </div>
                            ) : (
                              <div>{todo.title}</div>
                            )}
                          </div>
                          <button
                            className="actions"
                            onClick={() => handleEdit(todo.id)}
                          >
                            Edit
                          </button>
                        </div>
                      )}

                      <button
                        className="actions"
                        onClick={() => handleDeleteTodo(todo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default TodoContainer;
