import { actions } from "./actions.js";
import { store } from "./store.js";
import * as mvp from "./mvp.js"
import "./presenters/index.js";

const TODOS_KEY = "todos";

/**
 * Get the filter based on the location objects fragment
 * @returns {Filter}
 */
function getFilter() {
    return {
        "#/active": "active",
        "#/completed": "completed",
    }[window.location.hash] ?? "all";
}

document.addEventListener("DOMContentLoaded", () => {
    mvp.init();

    store.dispatch(actions.init({
        todos: JSON.parse(localStorage.getItem(TODOS_KEY)) ?? [],
        filter: getFilter(),
    }));

    store.subscribe(({ todos }, action) => {
        // Log action
        console.info(action);

        // Persist todos
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos));

        if (action.name === "toggle-completed" || action.name === "toggle-completed-all") {
            if (todos.length > 0 && todos.every(todo => todo.completed)) {
                store.dispatch(actions.toast("success", "All todos completed. Well done :)"));
            }
        }
    });

    window.addEventListener("hashchange", () => {
        store.dispatch(actions.setFilter(getFilter()));
    });
});
