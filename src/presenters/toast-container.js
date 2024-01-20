import { Presenter, presenterRegistry } from "../mvp.js";
import { store } from "../store.js";
import { renderToast } from "../templates.js";

const FADEOUT_AFTER_MILLIS = 1500;

presenterRegistry.register("toast-container", class extends Presenter {
    setup() {
        return store.subscribe(this.#update)
    }

    /**
     * Update the view
     * @param {import("../store.js").State} state - The state
     * @param {import("../actions.js").Action} action - The action
     */
    #update = (_, action) => {
        if (action.name === "toast") {
            this.view.insertAdjacentHTML("beforeend", renderToast(action.variant, action.msg))
            const toast = this.view.lastElementChild;
            setTimeout(() => toast.classList.add("fadeout"), FADEOUT_AFTER_MILLIS);
            toast.addEventListener("transitionend", toast.remove);
        }
    }
})
