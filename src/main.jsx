import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authReducer from './store/AuthSlice.js';
import employeesReducer from './store/EmployeesSlice.js';
import departmentsReducer from './store/DepartmentsSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeesReducer,
    departments: departmentsReducer,
  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
