import { Presenter, presenterRegistry } from "../mvp.js";
import { store } from "../store.js";

presenterRegistry.register("filters", class extends Presenter {
    setup() {
        return store.subscribe(this.#update);
    }

    #update = ({ filter }) => {
        this.view.querySelectorAll("a").forEach(a => {
            if (a.innerText.toLowerCase() === filter) {
                a.classList.add("selected");
            } else {
                a.classList.remove("selected");
            }
        });
    }
});