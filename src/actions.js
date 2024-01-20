/** @typedef {{ name: "add-todo", title: string }} AddTodo */
/** @typedef {{ name: "delete-todo", id: string }} DeleteTodo */
/** @typedef {{ name: "toggle-completed", id: string }} ToggleCompleted */
/** @typedef {{ name: "toggle-completed-all" }} ToggleCompletedAll */
/** @typedef {{ name: "init", todos: Todo[], filter: Filter }} Init */
/** @typedef {{ name: "set-filter", filter: Filter }} SetFilter */
/** @typedef {{ name: "clear-completed" }} ClearCompleted */
/** @typedef {{ name: "edit-todo", title: string, id: string }} EditTodo */
/** @typedef {{ name: "toast", variant: "error" | "success", msg: string }} Toast */
/** @typedef {AddTodo | DeleteTodo | ToggleCompleted | ToggleCompletedAll | Init | SetFilter | ClearCompleted | EditTodo | Toast} Action */

/**
 * Create AddTodo.
 * @param {string} title - Todo title
 * @returns {AddTodo}
 */
const addTodo = (title) => ({ name: "add-todo", title });

/**
 * Create DeleteTodo.
 * @param {string} id - Id of todo
 * @returns {DeleteTodo}
 */
const deleteTodo = (id) => ({ name: "delete-todo", id });

/**
 * Create ToggleCompleted.
 * @param {string} id - Id of todo
 * @returns {ToggleCompleted}
 */
const toggleCompleted = (id) => ({ name: "toggle-completed", id });

/**
 * Create ToggleCompletedAll.
 * @returns {ToggleCompletedAll}
 */
const toggleCompletedAll = () => ({ name: "toggle-completed-all" });

/**
 * Create Init.
 * @param {{ todos: Todo[], filter: Fitler }} state - The initial state.
 * @returns {Init}
 */
const init = ({ todos, filter }) => ({ name: "init", todos, filter });

/**
 * Create SetFilter.
 * @param {Filter} filter - The filter.
 * @returns {Init}
 */
const setFilter = (filter) => ({ name: "set-filter", filter });

/**
 * Create ClearCompleted.
 * @returns {ClearCompleted}
 */
const clearCompleted = () => ({ name: "clear-completed" });

/**
 * Create EditTodo.
 * @param {string} id - The todo's id
 * @param {string} title - The todo's title
 * @returns {EditTodo}
 */
const editTodo = (id, title) => ({ name: "edit-todo", id, title });

/**
 * Create Toast.
 * @param {"error" | "success"} variant - The variant
 * @param {string} msg - The message
 * @returns {Toast}
 */
const toast = (variant, msg) => ({ name: "toast", variant, msg });

export const actions = Object.freeze({
    addTodo,
    deleteTodo,
    toggleCompleted,
    toggleCompletedAll,
    init,
    setFilter,
    clearCompleted,
    editTodo,
    toast
});