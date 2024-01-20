import { Presenter, presenterRegistry } from "../mvp.js";
import { store } from "../store.js";

presenterRegistry.register("todo-count", class extends Presenter {
    setup() {
        return store.subscribe(this.#update);
    }

    #update = ({ todos }) => {
        const count = todos.filter(todo => !todo.completed).length;
        const items = ["items", "item"][Number(count === 1)];
        this.view.innerText = `${count} ${items} left`;
    }
});