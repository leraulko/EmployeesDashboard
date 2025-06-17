import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees, addEmployee, deleteEmployee, updateEmployee } from '../store/employeesSlice';
import { Table, Button, Modal, Space } from 'antd';
import EmployeeEditForm from '../components/EmployeeEditForm';

export default function EmployeesPage() {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees.employees);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const departments = [...new Set(employees.map(employee => employee.department))];

    useEffect(() => {
        dispatch(getEmployees());
    }, []);

    const handleAdd = () => {
        setEditingEmployee(null);
        setIsModalOpen(true);
    };
    
    const handleEdit = employee => {
        setEditingEmployee(employee);
        setIsModalOpen(true);
    };
    
    const handleDelete = id => {
        dispatch(deleteEmployee(id));
    };

    const handleSubmit = values => {
        if (editingEmployee) {
          dispatch(updateEmployee({ ...editingEmployee, ...values }));
        } else {
          dispatch(addEmployee(values));
        }
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            sorter: (a, b) => a.name.localeCompare(b.name), 
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            width: 150,
            filters: departments.map(department => ({ text: department, value: department })),
            onFilter: (value, record) => record.department === value,
            sorter: (a, b) => a.department.localeCompare(b.department),
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
            width: 200,
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            render: (dataIndex, record) => (
                <Space>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>Employees</h2>
                <Button type="primary" onClick={handleAdd}>
                    Add Employee
                </Button>
            </div>

            <Table
                dataSource={employees}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 6 }}
                bordered
                style={{ tableLayout: 'fixed' }}
            />

            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                destroyOnHidden
            >
                <EmployeeEditForm
                    initialValues={editingEmployee}
                    onSubmit={handleSubmit}
                />
            </Modal>
        </div>
    )
}
