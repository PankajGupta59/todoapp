import React from "react";
import Class from "./ShowTask.module.css";
const ShowTask = (props) => {
  return (
    <div className={Class.taskBox}>
      {props.todo.map((post) => {
        return (
          <div key={post.id} className={Class.task}>
            <h2>{post.title}</h2>
            <div className={Class.icons}>
              <ion-icon
                onClick={() => {
                  props.updateHandler(post, true);
                }}
                name="create-outline"
              ></ion-icon>
              <ion-icon
                onClick={() => {
                  props.delete(post.id);
                }}
                name="trash-outline"
              ></ion-icon>
              <ion-icon
                onClick={() => {
                  props.completed(post);
                }}
                name={
                  post.completed
                    ? "checkmark-done-circle"
                    : "checkmark-done-circle-outline"
                }
              ></ion-icon>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowTask;
