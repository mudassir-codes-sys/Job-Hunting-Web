import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface loading {
  loading: boolean;
}
const initialState: loading = {
  loading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<loading>) => {
      state.loading = action.payload.loading;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
