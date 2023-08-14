const time = document.getElementById("time");

const currentDate = new Date();
const format =
  currentDate.getDate() +
  "-" +
  currentDate.getMonth() +
  "-" +
  currentDate.getFullYear();
time.innerHTML = format;

const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

if (todos.length > 0) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText.trim()) {
        const todoEl = document.createElement("li");
        if (todo && todo.completed) {
            todoEl.classList.add("completed");
        }

        todoEl.innerText = todoText;

        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");

            updateLS();
        });

        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            todoEl.remove();

            updateLS();
        });

        todosUL.appendChild(todoEl);

        input.value = "";

        updateLS();
    }
}

function updateLS() {
    const todosEl = document.querySelectorAll("li");

    const updatedTodos = [];

    todosEl.forEach((todoEl) => {
        updatedTodos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    todos = updatedTodos;
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
}
