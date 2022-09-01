import React, { useEffect, useState } from "react";
import { addTaskHandler, deleteTask, fetchTodo, updateTask } from "../../api";
import AddTask from "../addTask/AddTask";
import Spinner from "../spinner/Spinner";
import ShowTask from "../showTask/ShowTask";
import Classes from "./TodoContainer.module.css";
const TodoContainer = () => {
  const [isLoading, setisLoading] = useState(true);
  const [Todo, setTodo] = useState([]);
  const [isEdit, setisEdit] = useState({
    edit: false,
    task: {},
  });
  const userId = 10;
  async function completed(task) {
    const index = Todo.findIndex((elm) => {
      return elm.id === task.id;
    });
    setTodo((prev) => {
      prev[index].completed = true;
      return [...prev];
    });
  }
  async function updateHandler(task, requested) {
    if (requested) {
      setisEdit({
        edit: true,
        task,
      });
      return;
    }
    const data = await updateTask(task);
    setisEdit({
      edit: false,
      task: {},
    });
  }
  async function deleteHandler(id) {
    const result = await deleteTask(id);
    if (result.success) {
      const todo = Todo.filter((data) => {
        return data.id != id;
      });
      setTodo(todo);
    }
  }
  async function addData(title) {
    const data = await addTaskHandler(title, userId);
    if (data.success) {
      setTodo([data.data, ...Todo]);
    }
  }
  useEffect(() => {
    async function post() {
      const data = await fetchTodo();
      if (data.success) {
        setisLoading(false);
        setTodo(data.data);
      }
    }
    post();
  }, []);

  return (
    <div className={Classes.container}>
      <h1>TODO APP</h1>
      <AddTask
        addtask={addData}
        isEdit={isEdit}
        updateHandler={updateHandler}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <ShowTask
          todo={Todo}
          delete={deleteHandler}
          completed={completed}
          updateHandler={updateHandler}
        />
      )}
    </div>
  );
};

export default TodoContainer;
