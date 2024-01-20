export const DATA_PRESENTER = "data-presenter";

/**
 * Base class representing a presenter.
 * @class
 */
export class Presenter {
    /**
     * @type {HTMLElement}
     * @public
     */
    view;

    /**
     * Create a presenter.
     * @param {HTMLElement} view - The root view the presenter manages
     */
    constructor(view) {
        this.view = view;
    }

    /**
     * Attach the controller. Can return a cleanup function.
     * @returns {Function | undefined}
     */
    setup() {
    }
}

export const presenterRegistry = (() => {

    /** @type {Map<string, new (...args: any[]) => Presenter>} */
    const presenters = new Map();

    /**
     * Register a controller by mapping its name to its constructor.
     * @param {string} name - The presenter's name
     * @param {new (...args: any[]) => Presenter} ctor - The contoller's constructor
     */
    function register(name, ctor) {
        presenters.set(name, ctor);
    }

    /**
     * Get a registered presenter's constructor by the presenter's name.
     * @param {string} name - The presenters's name
     * @returns {new (...args: any[]) => Class representing a controller}
     */
    function get(name) {
        const presenter = presenters.get(name);
        if (!presenter) {
            throw new Error(`No presenter with name ${name} found`);
        }

        return presenter;
    }

    return { register, get };
})();

/**
 * Setup the view's presenter
 * @param {HTMLElement} view - The view
 */
function setupPresenterFor(view) {
    if (view.hasAttribute(DATA_PRESENTER)) {
        const Presenter = presenterRegistry.get(view.dataset.presenter);
        view.cleanup = new Presenter(view).setup();
    }

    for (const child of view.children) {
        setupPresenterFor(child);
    }
}

/**
 * Cleanup the view's presenter
 * @param {HTMLElement} view - The view
 */
function cleanupPresenterFor(view) {
    if (view.hasAttribute(DATA_PRESENTER) && typeof view.cleanup === "function") {
        view.cleanup?.();
        delete view.cleanup;
    }

    for (const child of view.children) {
        cleanupPresenterFor(child);
    }
}

/**
 * Initialize the automatic binding of views and presenters
 */
export function init() {
    document.querySelectorAll(`[${DATA_PRESENTER}]`).forEach(setupPresenterFor);

    const observer = new MutationObserver(mutations => {

        // Automatically setup presenters of new views
        mutations.forEach(mutation => {
            if (mutation.type === "childList") {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        setupPresenterFor(node);
                    }
                });

                mutation.removedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        cleanupPresenterFor(node);
                    }
                });
            }
        });
    });

    observer.observe(document.body, { childList: true , subtree: true });
}
