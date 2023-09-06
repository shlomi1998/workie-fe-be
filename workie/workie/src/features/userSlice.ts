import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  status: string;
  error: string;
  user: {
    id: string;
    name: string;
    email: string;
    picture: string;
    status: string;
    token: string;
  };
}

const initialState: UserState = {
  status: "",
  error: "",
  user: {
    id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    token: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.status = "";
      state.error = "";
      state.user = {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
      };
    },
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
