import { createSlice } from "@reduxjs/toolkit";

const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    return serializedState
      ? JSON.parse(serializedState)
      : { isAuthenticated: false, role: null };
  } catch (e) {
    console.error("Failed to load auth state:", e);
    return { isAuthenticated: false, role: null };
  }
};

const initialState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      localStorage.removeItem("authState");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
