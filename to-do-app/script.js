// 1. implement application state
// 2. Input field and button to add new Todos
// 3. Todo have two properties: description and ID
// 4. Use local storage to save current state of t he app
// 5. checkboxes for the different todos (status of a todo done or not done)
// 6. Duplicate check (no duplicates are allowed)
// 7. Filtering todos (all todos; open todos; done todos)
// 8. Remove done todos (implement a button for this)

let todos = loadTodosFromLocalStorage() || [];

const todoList = document.getElementById("todo-list");
const newTodoInput = document.getElementById("new-todo");
const addTodoButton = document.getElementById("add-todo");
const removeDoneButton = document.getElementById("remove-done");
const filterAllCheckbox = document.getElementById("filter-all");
const filterOpenCheckbox = document.getElementById("filter-open");
const filterDoneCheckbox = document.getElementById("filter-done");

addTodoButton.addEventListener("click", addTodo);
removeDoneButton.addEventListener("click", removeDoneTodos);
filterAllCheckbox.addEventListener("change", updateFilter);
filterOpenCheckbox.addEventListener("change", updateFilter);
filterDoneCheckbox.addEventListener("change", updateFilter);

/* ADD TODOS */
function addTodo() {
  const newTodoText = newTodoInput.value.toLowerCase();

  //Check Duplicates//
  if (
    newTodoText &&
    !todos.some((todo) => todo.description.toLowerCase() === newTodoText)
  ) {
    const newTodo = {
      id: Date.now(),
      description: newTodoText,
      done: false,
    };

    todos.push(newTodo);
    saveTodosToLocalStorage(todos);
    newTodoInput.value = "";
    renderTodos();
  } else {
    alert("Input-field is empty or todo is already in the list!");
  }
}

/* REMOVE TODO */
function removeDoneTodos() {
  todos = todos.filter((todo) => !todo.done);
  saveTodosToLocalStorage(todos);
  renderTodos();
}

/* UPDATE LOCAL STORAGE */
function saveTodosToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

/* LOAD TODOS FROM LOCALSTORAGE */
function loadTodosFromLocalStorage() {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : null;
}

function renderTodos() {
  todoList.innerHTML = "";

  const showAll = filterAllCheckbox.checked;
  const showOpen = filterOpenCheckbox.checked;
  const showDone = filterDoneCheckbox.checked;

  todos.forEach((todo) => {
    if (showAll || (showOpen && !todo.done) || (showDone && todo.done)) {
      const li = document.createElement("li");
      li.innerHTML = `
              <input type="checkbox" ${todo.done ? "checked" : ""}>
              <span>${todo.description}</span>
          `;
      li.querySelector("input[type=checkbox]").addEventListener(
        "change",
        () => {
          todo.done = !todo.done;
          saveTodosToLocalStorage(todos);
          renderTodos();
        }
      );
      todoList.appendChild(li);
    }
  });
}

/* FILTER */
function updateFilter() {
  filterAllCheckbox.checked = false;
  filterOpenCheckbox.checked = false;
  filterDoneCheckbox.checked = false;

  this.checked = true; // Make the clicked checkbox true

  renderTodos();
}

renderTodos();
