import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: JSON.parse(localStorage.getItem('isAuth')) || false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, action) => {
            const { username, password } = action.payload;
            if (username === 'admin' && password === 'admin') {
                state.isAuth = true;
                localStorage.setItem('isAuth', true);
            }
        },
        logOut(state) {
            state.isAuth = false;
            localStorage.removeItem("isAuth");
        }
    }
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;