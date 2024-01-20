import { Presenter, presenterRegistry } from "../mvp.js";

presenterRegistry.register("mode-toggle", class extends Presenter {
    /** @type {"dark" | "light"} */
    #mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    setup() {
        this.view.addEventListener("click", () => {
            this.#toggleMode();
            this.#update();
        });

        this.#update();
    }

    #toggleMode = () => {
        this.#mode = this.#mode === "dark" ? "light" : "dark";
    }


    #update = () => {
        if (this.#mode === "dark") {
            this.view.innerText = "☼";
            document.body.classList.add("dark");
        } else {
            this.view.innerText = "☽";
            document.body.classList.remove("dark");
        }
    }
})
