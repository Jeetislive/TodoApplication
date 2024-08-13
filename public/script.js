const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addBtn = document.getElementById("add-btn");

const loadTodos = async () => {
    const response = await fetch('/todos');
    const todos = await response.json();
    listContainer.innerHTML = '';
    todos.forEach(todo => {
        let li = document.createElement("li");
        li.innerHTML = todo.text;
        if (todo.completed) li.classList.add('checked');
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        listContainer.appendChild(li);
    });
}

addBtn.addEventListener("click", async () => {
    if (inputBox.value === '') {
        alert("You must write something");
    } else {
        const response = await fetch('/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: inputBox.value })
        });
        const newTodo = await response.json();
        let li = document.createElement("li");
        li.innerHTML = newTodo.text;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        listContainer.appendChild(li);
        inputBox.value = '';
    }
});

listContainer.addEventListener("click", async (event) => {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        // Optionally, add code to update the todo as completed/incomplete in the database
    } else if (event.target.tagName === "SPAN") {
        const li = event.target.parentNode;
        const todoId = li.getAttribute('data-id');  // Use a data-id attribute to identify todo
        await fetch(`/todos/${todoId}`, { method: 'DELETE' });
        li.remove();
    }
});

loadTodos();
