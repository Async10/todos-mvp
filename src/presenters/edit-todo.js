
import { Presenter, presenterRegistry } from "../mvp.js";
import { store } from "../store.js";
import { actions } from "../actions.js";

presenterRegistry.register("edit-todo", class extends Presenter {
    setup() {
        this.view.addEventListener("blur", () => {
            store.dispatch(actions.editTodo(this.view.dataset.id, this.view.value));
            this.view.remove();
        });

        this.view.addEventListener("keydown", evt => {
            if (evt.key === "Enter") {
                this.view.blur();
            }
        });

        this.view.focus();
        this.view.setSelectionRange(this.view.value.length, this.view.value.length);
    }
})