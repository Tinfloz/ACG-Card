import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducers/auth.slice";
import tagReducer from "./reducers/tag.reducers/tag.slice";
import contentReducer from "./reducers/content.reducer/content.slice";
import cardReducer from "./reducers/card.reducer/card.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tag: tagReducer,
        content: contentReducer,
        card: cardReducer,
    }
})