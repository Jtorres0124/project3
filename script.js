document.addEventListener("DOMContentLoaded", function () {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    // Array to store todo items
    const todos = [];

    // Function to render todos
    function renderTodos() {
        todoList.innerHTML = ""; // Clear the current list

        todos.forEach((todo, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span class="${todo.complete ? 'complete' : ''}">${todo.text}</span>
                <button class="check-btn" data-index="${index}">Check</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            todoList.appendChild(listItem);
        });
    }

    // Function to handle form submission
    function addTodo(event) {
        event.preventDefault();

        const text = todoInput.value.trim();

        if (text !== "") {
            // Add new todo to the array
            todos.push({ text, complete: false });

            // Clear the input field
            todoInput.value = "";

            // Render updated todo list
            renderTodos();
        }
    }

    // Function to handle checking a todo
    function checkTodo(index) {
        todos[index].complete = !todos[index].complete;
        renderTodos();
    }

    // Function to handle deleting a todo
    function deleteTodo(index) {
        todos.splice(index, 1);
        renderTodos();
    }

    // Event listener for form submission
    todoForm.addEventListener("submit", addTodo);

    // Event delegation for check and delete buttons
    todoList.addEventListener("click", function (event) {
        const target = event.target;

        if (target.classList.contains("check-btn")) {
            const index = target.getAttribute("data-index");
            checkTodo(index);
        } else if (target.classList.contains("delete-btn")) {
            const index = target.getAttribute("data-index");
            deleteTodo(index);
        }
    });
});
