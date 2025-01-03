import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/Features/authSlice';
import ideasReducer from '../src/Features/GetIdeasSlice';
import ideaDetailsReducer from '../src/Features/IdeaDetailsSlice';
const store = configureStore({
    reducer: {
        ideas: ideasReducer,
        auth: authReducer,
        ideaDetails: ideaDetailsReducer,
    },
});

export default store;
