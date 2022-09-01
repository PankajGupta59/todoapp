import React from "react";
import AddTask from "../addTask/AddTask";
import ShowTask from "../showTask/ShowTask";
import Classes from "./TodoContainer.module.css";
const TodoContainer = () => {
  return (
    <div className={Classes.container}>
      <h1>TODO APP</h1>
      <AddTask />
      <ShowTask />
    </div>
  );
};

export default TodoContainer;
