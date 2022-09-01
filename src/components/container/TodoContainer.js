import React, { useEffect, useState } from "react";
import { Store } from "react-notifications-component";
import { addTaskHandler, deleteTask, fetchTodo, updateTask } from "../../api";
import AddTask from "../addTask/AddTask";
import Spinner from "../spinner/Spinner";
import ShowTask from "../showTask/ShowTask";
import Classes from "./TodoContainer.module.css";
import "react-notifications-component/dist/theme.css";
const TodoContainer = () => {
  const [isLoading, setisLoading] = useState(true);
  const [Todo, setTodo] = useState([]);
  const [isEdit, setisEdit] = useState({
    edit: false,
    task: {},
  });
  const userId = 10;
  const notifications = {
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  };
  async function completed(task) {
    const index = Todo.findIndex((elm) => {
      return elm.id === task.id;
    });
    setTodo((prev) => {
      prev[index].completed = true;
      return [...prev];
    });
    Store.addNotification({
      title: "Congratulations",
      message: "Task Completed Succesfully",
      type: "success",
      ...notifications,
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
    Store.addNotification({
      title: "In Progress",
      message: "updating data",
      type: "info",
      ...notifications,
    });
    const data = await updateTask(task);
    if (data.success) {
      Store.addNotification({
        title: "Hurry",
        message: "Task updated succesfully",
        type: "success",
        ...notifications,
      });
    } else {
      Store.addNotification({
        title: "Oh God!",
        message: data.message,
        type: "error",
        ...notifications,
      });
    }
    setisEdit({
      edit: false,
      task: {},
    });
  }
  async function deleteHandler(id) {
    Store.addNotification({
      title: "In Progress",
      message: "Deleting Data",
      type: "info",
      ...notifications,
    });
    const result = await deleteTask(id);
    if (result.success) {
      const todo = Todo.filter((data) => {
        return data.id !== id;
      });
      setTodo(todo);
      Store.addNotification({
        title: "Hurry",
        message: "Task deleted succesfully",
        type: "success",
        ...notifications,
      });
    } else {
      Store.addNotification({
        title: "Sorry",
        message: result.message,
        type: "error",
        ...notifications,
      });
    }
  }
  async function addData(title) {
    Store.addNotification({
      title: "In Progress",
      message: "Adding Data",
      type: "info",
      ...notifications,
    });
    const data = await addTaskHandler(title, userId);
    if (data.success) {
      Store.addNotification({
        title: "Hurry",
        message: "Task added succesfully",
        type: "success",
        ...notifications,
      });
      setTodo([data.data, ...Todo]);
    } else {
      Store.addNotification({
        title: "Sorry",
        message: data.message,
        type: "error",
        ...notifications,
      });
    }
  }
  useEffect(() => {
    async function post() {
      Store.addNotification({
        title: "In Progress",
        message: "fetching Data",
        type: "info",
        ...notifications,
      });
      const data = await fetchTodo();
      if (data.success) {
        setisLoading(false);
        setTodo(data.data);
      } else {
        setisLoading(false);
        Store.addNotification({
          title: "Sorry",
          message: data.message,
          type: "error",
          ...notifications,
        });
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
