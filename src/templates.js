/**
 * Get the inline style of the todo
 * @param {import("./store.js").Filter} filter - A filter
 * @param {{ completed: boolean }} todo - A todo
 * @returns {string}
 */
export function getTodoStyle(filter, todo) {
    const displayNone = "display:none;";
    if (filter === "active") {
        if (todo.completed) {
            return displayNone;
        }
    } else if (filter === "completed") {
        if (!todo.completed) {
            return displayNone;
        }
    }

    return "";
}

/**
 * Render a todo
 * @param {import("./store.js").Filter} filter - A filter
 * @param {import("./store.js").Todo} todo - A todo
 * @returns {string}
 */
export function renderTodo(filter, todo) {
    const checked = todo.completed ? 'checked=""' : "";
    return `
        <li style="${getTodoStyle(filter, todo)}" data-presenter="todo-list-item" data-id="${todo.id}">
            <div class="view">
                <input id="${todo.id}" class="toggle" type="checkbox" ${checked}>
                <label for="${todo.id}">${todo.title}</label>
                <div class="actions">
                    <button class="pencil"></button>
                    <button class="wastebasket"></button>
                </div>
            </div>
        </li>
    `;
}

/**
 * Render a toast
 * @param {"error" | "success"} variant - The variant
 * @param {string} msg - The message
 * @returns {string}
 */
export function renderToast(variant, msg) {
    return `<div class="toast ${variant}">${msg}</div>`;
}

/**
 * Render edit todo.
 * @param {string} id - The todo's id
 * @param {string} title - The todo's title
 * @returns {string}
 */
export function renderEditTodo(id, title) {
    return `<input data-id="${id}" data-presenter="edit-todo" value="${title}" type="text" class="edit">`;
}
