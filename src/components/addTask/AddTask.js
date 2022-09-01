import React from "react";
import Classes from "./AddTask.module.css";
const AddTask = () => {
  return (
    <div className={Classes.taskContainer}>
      <form>
        <div>
          <label>Title: </label>
          <br />
          <input type="text" required />
        </div>
        <div>
          <button type="submit">ADD TASK</button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
