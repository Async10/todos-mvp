import { actions } from "../actions.js";
import { Presenter, presenterRegistry } from "../mvp.js";
import { store } from "../store.js";
import { getTodoStyle, renderEditTodo } from "../templates.js";

presenterRegistry.register("todo-list-item", class extends Presenter {
    setup() {
        this.view.querySelector("button.delete").addEventListener("click", this.#deleteTodo);
        this.view.querySelector("button.editing").addEventListener("click", this.#editTodo);
        this.view.querySelector('input[type="checkbox"]').addEventListener("input", this.#toggleComplete);
        return store.subscribe(this.#update);
    }

    #deleteTodo = () => {
        store.dispatch(actions.deleteTodo(this.view.dataset.id));
    }

    #toggleComplete = () => {
        store.dispatch(actions.toggleCompleted(this.view.dataset.id));
    }

    #editTodo = () => {
        const title = this.view.querySelector("label").innerText;
        this.view.insertAdjacentHTML("afterbegin", renderEditTodo(this.view.dataset.id, title));
    }

    /**
     * Update the view
     * @param {import("../store.js").State} state - The application's state
     * @param {import("../actions.js").Action} action - The action
     */
    #update = ({ todos, filter }) => {
        const todo = todos.find(todo => todo.id === this.view.dataset.id);
        if (!todo) {
            this.view.remove();
            return;
        }

        this.view.querySelector('input[type="checkbox"]').checked = todo.completed;
        this.view.querySelector('label').innerText = todo.title;
        this.view.style = getTodoStyle(filter, todo);
        if (todo.completed) this.view.classList.add("completed");
        else this.view.classList.remove("completed");
    }
});
