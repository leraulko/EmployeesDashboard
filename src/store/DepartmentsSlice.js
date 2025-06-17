import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    departments: [],
}

export const getDepartments = createAsyncThunk('departments/getDepartments', async () => {
        const response = await fetch('/departments.json');
        const result = await response.json();
        return result;
    }
);

const departmentsSlice = createSlice({
    name: 'departments',
    initialState,
    reducers: {
        addDepartment: (state, action) => {
            const newDepartment = {
            id: Date.now(),
            ...action.payload,
            };
            state.departments.push(newDepartment);
        },
        deleteDepartment: (state, action) => {
            state.departments = state.departments.filter(department => department.id !== action.payload);
        },
        updateDepartment: (state, action) => {
            const index = state.departments.findIndex(department => department.id === action.payload.id);
            if (index !== -1) {
            state.departments[index] = action.payload;
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getDepartments.fulfilled, (state, action) => {
            state.departments = action.payload;
            })
    },
});
  
export const { addDepartment, updateDepartment, deleteDepartment } = departmentsSlice.actions;

export default departmentsSlice.reducer;