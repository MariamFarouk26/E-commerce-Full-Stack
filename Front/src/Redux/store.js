import { configureStore } from '@reduxjs/toolkit';
import SignUpEmailReducer from "./Slice/Email";
import userReducer from "./Slice/User";
import Language from './Slice/Language';
import prodetailsReducer from "./Slice/prodetails";

const store = configureStore({
  reducer: {
    SignUpEmail:SignUpEmailReducer,
    user: userReducer,
    language: Language,
    prodetails: prodetailsReducer,
  },
});
export default store;


