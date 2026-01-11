import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userInitialState {
  userEmail: string | null;
  isPaid: boolean;
}

const initialState: userInitialState = {
  userEmail: null,
  isPaid: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userInitialState>) => {
      state.userEmail = action.payload.userEmail;
      state.isPaid = action.payload.isPaid;
    },

    clearUser: (state) => {
      state.userEmail = null;
      state.isPaid = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
