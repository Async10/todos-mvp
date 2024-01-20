import { actions } from "../actions.js";
import { Presenter, presenterRegistry } from "../mvp.js";
import { store } from "../store.js";

presenterRegistry.register("new-todo", class extends Presenter {
    setup() {
        this.view.addEventListener("submit", evt => {
            evt.preventDefault();

            const input = this.view.querySelector("input");
            const title = input.value;
            input.value = "";

            if (!title) {
                store.dispatch(actions.toast("error", "Todos can't be empty."));
            } else if (store.state.todos.some(todo => todo.title === title)) {
                store.dispatch(actions.toast("error", "The specified todo already exists."));
            } else {
                store.dispatch(actions.addTodo(title));
            }
        });
    }
});
