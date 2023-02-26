/* eslint-disable no-undef */
window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || []; // global variable
  const date = document.getElementById("date");
  date.innerHTML = new Date().toDateString();
  const newTodoForm = document.querySelector("#new_todo");
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault(); // canceling the submission of the form

    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
    };

    // pushing and update this array
    todos.push(todo);
    // save in local storage, array -> json string
    localStorage.setItem("todos", JSON.stringify(todos));

    e.target.reset(); // clear form
    displayTodoList(); // update displayed list
  });
  displayTodoList();
});

function displayTodoList() {
  const todoList = document.querySelector("#todo_list");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo_item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteBtn = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");
    content.classList.add("todo_content");
    actions.classList.add("todo_actions");
    edit.classList.add("edit");
    deleteBtn.classList.add("delete");
    content.innerHTML = `<input type="text" value="${todo.content}" readonly/>`;
    edit.innerHTML = "&#9998;";
    deleteBtn.innerHTML = "&#9003;";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteBtn);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);
    todoList.appendChild(todoItem);

    if (todo.category == "i-u") span.classList.add("i-u");
    if (todo.category == "i-nu") span.classList.add("i-nu");
    if (todo.category == "ni-u") span.classList.add("ni-u");
    else span.classList.add("ni-nu");

    if (todo.done) todoItem.classList.add("done");

    input.addEventListener("click", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) todoItem.classList.add("done");
      else todoItem.classList.remove("done");
      displayTodoList();
    });

    // Edit item
    edit.addEventListener("click", () => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();

      input.addEventListener("blur", (e) => {
        // if you click outside -> it ends of edit
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        displayTodoList();
      });
    });

    // Delete item
    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      displayTodoList();
    });
  });
}
