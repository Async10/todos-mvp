import { Presenter, presenterRegistry } from "../mvp.js";
import { actions } from "../actions.js";
import { store } from "../store.js";

presenterRegistry.register("toggle-all", class extends Presenter {
    setup() {
        this.view.addEventListener("input", () => store.dispatch(actions.toggleCompletedAll()));
        store.subscribe(this.#update);
    }

    /**
     * Update the view
     * @param {import("../store.js").State} state - The application's state 
     */
    #update = ({ todos }) => {
        this.view.checked = todos.length > 0 && todos.every(todo => todo.completed);
    }
});
