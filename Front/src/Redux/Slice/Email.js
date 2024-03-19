import { createSlice } from "@reduxjs/toolkit";

const SignUpEmail = createSlice({
  name: "SignUpEmail",
  initialState: { SignUpEmail: null },
  reducers: {
    setSignUpEmail: (state, action) => {
      state.SignUpEmail = action.payload;
    },
  },
});
export const { setSignUpEmail } = SignUpEmail.actions;
export default SignUpEmail.reducer;
