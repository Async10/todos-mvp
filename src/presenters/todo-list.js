import { store } from "../store.js";
import { Presenter, presenterRegistry } from "../mvp.js";
import { renderTodo } from "../templates.js";

presenterRegistry.register("todo-list", class extends Presenter {
    setup() {
        return store.subscribe(this.#update);
    }

    /**
     * Update the view
     * @param {import("../store.js").State} state - The state
     * @param {import("../actions.js").Action} action - The action
     */
    #update = ({ todos, filter }, action) => {
        const renderTodoWithFilter = renderTodo.bind(null, filter);
        switch (action.name) {
            case "add-todo":
                const todo = todos[todos.length - 1];
                this.view.insertAdjacentHTML("beforeend", renderTodoWithFilter(todo));
                break;
            case "init":
                this.view.insertAdjacentHTML("beforeend", todos.map(renderTodoWithFilter).join(""));
                break;
            default:
                break;
        }
    }
});
