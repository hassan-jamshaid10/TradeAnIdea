import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/Features/authSlice';
import ideasReducer from '../src/Features/GetIdeasSlice';
import ideaDetailsReducer from './Features/IdeaDetailsSlice';
import ideaFormReducer from '../src/Features/ideaFormSlice';
import profileReducer from '../src/Features/profileSlice';
import llmReducer from '../src/Features/LLMSlice';
const store = configureStore({
    reducer: {
        ideas: ideasReducer,
        auth: authReducer,
        ideaDetails: ideaDetailsReducer,
        ideaForm: ideaFormReducer,
        profile: profileReducer,
        llm: llmReducer,
    },
});

export default store;
