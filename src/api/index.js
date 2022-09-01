const url = "https://jsonplaceholder.typicode.com/todos";
module.exports.fetchTodo = async function () {
  let data = [];
  try {
    const response = await fetch(url + "?userId=1");
    data = await response.json();
    return {
      data,
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

module.exports.addTaskHandler = async function (title, userId) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      title,
      userId,
      completed: false,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  return {
    success: true,
    data,
  };
};

module.exports.deleteTask = async function (id) {
  const response = await fetch(url + `/${id}`, {
    method: "DELETE",
  });
  return {
    success: true,
  };
};

module.exports.updateTask = async function (task) {
  const response = await fetch(url + `/${task.id}`, {
    method: "PATCH",
    body: JSON.stringify(task),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  return {
    success: true,
    data,
  };
};
