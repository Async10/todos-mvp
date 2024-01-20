import { Presenter, presenterRegistry } from "../mvp.js";
import { store } from "../store.js";

presenterRegistry.register("footer", class extends Presenter {
    setup() {
        return store.subscribe(this.#update);
    }

    /**
     * Update thew view
     * @param {import("../store.js").State} state - The applications state
     */
    #update = ({ todos }) => {
        this.view.style = todos.length > 0 ? "" : "display:none;";
    }
})