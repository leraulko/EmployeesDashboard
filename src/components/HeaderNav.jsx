import { Layout, Menu, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { logOut } from '../store/AuthSlice';

const { Header } = Layout;

const NAVIGATION = [
    {
      key: 'MAIN',
      label: <Link to="/">Main</Link>,
    },
    {
      key: 'DEPARTMENTS',
      label: <Link to="/departments">Departments</Link>,
    },
    {
      key: 'EMPLOYEES',
      label: <Link to="/employees">Employees</Link>,
    },
];

export default function HeaderNav() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logOut());
    };

    return (
        <Header 
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around'
          }}
        >
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['MAIN']}
                style={{ flex: 1 }}
                items={NAVIGATION}
            />
            <Button onClick={handleLogout} danger>Log Out</Button>
        </Header>
    )
}
