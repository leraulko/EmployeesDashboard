import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    employees: [],
}

export const getEmployees = createAsyncThunk('employees/getEmployees', async () => {
    const response = await fetch('/employees.json');
    const result = await response.json();
    return result;
});

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            state.employees.push({ ...action.payload, id: Date.now() });
        },
        deleteEmployee: (state, action) => {
            state.employees = state.employees.filter(employee => employee.id !== action.payload);
        },
        updateEmployee: (state, action) => {
            const index = state.employees.findIndex(emp => emp.id === action.payload.id);
            if (index !== -1) {
              state.employees[index] = action.payload;
            }
        },
    },
    extraReducers: builder => {
        builder
          .addCase(getEmployees.fulfilled, (state, action) => {
            state.employees = action.payload;
          })
        }
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeesSlice.actions;
  
export default employeesSlice.reducer;