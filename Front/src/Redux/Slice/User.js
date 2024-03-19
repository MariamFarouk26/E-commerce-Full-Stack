import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const getUserAction = createAsyncThunk(
  "user/getUserAction",
  async () => {
    const cookies = new Cookies();
    let JWT = cookies.get("x-auth-token");

    const { data } = await axios.get(
      `http://localhost:3001/user/${jwtDecode(JWT).user.userID}`
    );
    return data[0];
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getUserAction.rejected, (state) => {
      state.user = null;
    });
  },
});

export const { resetUser } = userSlice.actions; // Export the resetUser action
export default userSlice.reducer;
