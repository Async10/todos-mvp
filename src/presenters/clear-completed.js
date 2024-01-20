import { Presenter, presenterRegistry } from "../mvp.js";
import { actions } from "../actions.js";
import { store } from "../store.js";

presenterRegistry.register("clear-completed", class extends Presenter {
    setup() {
        this.view.addEventListener("click", () => store.dispatch(actions.clearCompleted()));
        return store.subscribe(this.#update);
    }

    /**
     * Update the view
     * @param {import("../store.js").State} state - The application's state 
     */
    #update = ({ todos }) => {
        this.view.style = todos.every(todo => !todo.completed) ? "display:none;" : "";
    }
});
