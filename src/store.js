/** @typedef {import("./actions.js").Action} Action */
/** @typedef {{ id: string, title: string, completed: boolean, order: number }} Todo */
/** @typedef {"all" | "active" | "completed"} Filter */
/** @typedef {{ todos: Todo[], filter: Filter }} State */
/** @typedef {(state: State, action: Action) => State} Subscriber */

/**
 * Create a new id.
 * @returns {string}
 */
function newId() {
    // return Date.now().toString();
    return Math.random().toString(16).slice(2)
}

/**
 * This function updates the application state by applying the action.
 * @param {State} state - The state
 * @param {Action} action - The action
 */
function update(state, action) {
    switch (action.name) {
        case "add-todo":
            state.todos.push({
                id: newId(),
                title: action.title,
                completed: false,
                order: (state.todos[state.todos.length - 1]?.order ?? 0) + 1
            });

            break;
        case "delete-todo":
            const idx = state.todos.findIndex(todo => todo.id === action.id);
            if (idx !== -1) {
                state.todos.splice(idx, 1);
            }

            break;
        case "toggle-completed": {
            const todo = state.todos.find(todo => todo.id === action.id);
            if (todo) {
                todo.completed = !todo.completed;
            }

            break;
        }
        case "toggle-completed-all":
            const completed = !state.todos.every(todo => todo.completed);
            state.todos.forEach(todo => {
                todo.completed = completed;
            });

            break;
        case "init":
            state.todos = action.todos;
            state.filter = action.filter;
            break;
        case "set-filter":
            state.filter = action.filter;
            break;
        case "clear-completed":
            state.todos = state.todos.filter(todo => !todo.completed);
            break;
        case "edit-todo": {
            const todo = state.todos.find(todo => todo.id === action.id);
            if (todo) {
                todo.title = action.title;
                if (!todo.title) {
                    update(state, { name: "delete-todo", id: todo.id });
                }
            }

            break;
        }
        default:
            break;
    }
}

export const store = Object.freeze((() => {
    /** @type {State} */
    const state = { todos: [], filter: "all" };

    /** @type {Subscriber[]} */
    const subscribers = [];

    /**
     * Unsubscribe from the store.
     * @param {Subscriber} subscriber - The subscriber
     */
    function unsubscribe(subscriber) {
        const idx = subscribers.indexOf(subscriber);
        if (idx !== -1) {
            subscribers.splice(idx, 1);
        }
    }

    /**
     * Subscribe to the store. Returns a function to unsubscribe
     * @param {Subscriber} subscriber - The subscriber
     * @returns {Function}
     */
    function subscribe(subscriber) {
        subscribers.push(subscriber);
        return unsubscribe.bind(null, subscriber);
    }

    /**
     * Notify subscribers.
     * @param {State} - The latest state
     * @param {Action} - The latest action
     */
    function notifySubscribers(state, action) {
        subscribers.forEach(cb => cb(state, action));
    }

    /**
     * Dispatch an action.
     * @param {Action} action - The action
     */
    function dispatch(action) {
        update(state, action);
        notifySubscribers(state, action);
    }

    return { subscribe, unsubscribe, state, dispatch };
})());