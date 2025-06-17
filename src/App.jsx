import { BrowserRouter, Route, Routes } from 'react-router';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import DepartmentsPage from './pages/DepartmentsPage';
import EmployeesPage from './pages/EmployeesPage';
import HeaderNav from './components/HeaderNav';
import { Layout } from 'antd';

function App() {
  const { isAuth } = useSelector(state => state.auth);

  return (
    <BrowserRouter>
      <Layout>
        <HeaderNav />
        <Routes>
          {!isAuth && (
            <Route path='*' element={<LoginPage />} />
          )}
          {isAuth && (
            <>
              <Route path='/' element={<MainPage />} />
              <Route path='/departments' element={<DepartmentsPage />} />
              <Route path='/employees' element={<EmployeesPage />} />
            </>
          )}
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
