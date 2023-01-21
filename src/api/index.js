//API URL
const url = "https://jsonplaceholder.typicode.com/todos";

//FETCH ALL TODOS
export const fetchTodos = async function () {
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
      message: error.message,
    };
  }
};

//ADD A NEW TODO
export const addTodo = async function (title, id) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title,
        id,
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
  } catch (error) {
    // catching an error
    return {
      success: false,
      message: error.message,
    };
  }
};

//DELETE A TODO
export const deleteTodo = async function (id) {
  try {
    const response = await fetch(url + `/${id}`, {
      method: "DELETE",
    });
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

//UPDATE A TODO
export const updateTodo = async function (task, newTitle) {
  try {
    const response = await fetch(url + `/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: newTitle,
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
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
