import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/Features/authSlice';
import ideasReducer from '../src/Features/GetIdeasSlice';
import ideaDetailsReducer from './Features/IdeaDetailsSlice';
import ideaFormReducer from '../src/Features/ideaFormSlice';
import profileReducer from '../src/Features/profileSlice';

const store = configureStore({
    reducer: {
        ideas: ideasReducer,
        auth: authReducer,
        ideaDetails: ideaDetailsReducer,
        ideaForm: ideaFormReducer,
        profile: profileReducer,
    },
});

export default store;
