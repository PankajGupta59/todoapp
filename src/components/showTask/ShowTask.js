import React from "react";
import Class from "./ShowTask.module.css";
const ShowTask = () => {
  return (
    <div className={Class.taskBox}>
      <div className={Class.task}>
        <h2>Homeword</h2>
        <div className={Class.icons}>
          <ion-icon name="create-outline"></ion-icon>
          <ion-icon name="trash-outline"></ion-icon>
          <ion-icon name="checkmark-done-circle-outline"></ion-icon>
        </div>
      </div>
    </div>
  );
};

export default ShowTask;
