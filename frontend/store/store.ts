import { configureStore, EnhancedStore, getDefaultMiddleware, Middleware } from "@reduxjs/toolkit";
import { State } from "../my_types";
import rootReducer from "../reducers/root_reducer";

function configureAppStore(preloadedState: State | {} = {}) {
    const middleware: Array<Middleware> = [...getDefaultMiddleware()];
    if (process.env.NODE_ENV === "development") {
        const { logger } = require("redux-logger");
        middleware.push(logger);
    }
    const store: EnhancedStore = configureStore({
      reducer: rootReducer,
      middleware: middleware,
      preloadedState: preloadedState
    });

    return store;
};

export type ConfiguredAppStore = ReturnType<typeof configureAppStore>;
export default configureAppStore;