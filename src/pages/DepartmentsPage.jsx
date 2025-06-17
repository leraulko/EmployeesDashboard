import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartments, addDepartment, deleteDepartment, updateDepartment } from '../store/departmentsSlice';
import { Table, Button, Modal, Space } from 'antd';
import DepartmentEditForm from '../components/DepartmentEditForm';

export default function DepartmentsPage() {
    const dispatch = useDispatch();
    const departments = useSelector(state => state.departments.departments);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState(null);

    useEffect(() => {
        dispatch(getDepartments());
    }, []);

    const handleAdd = () => {
        setEditingDepartment(null);
        setIsModalOpen(true);
    };

    const handleEdit = department => {
        setEditingDepartment(department);
        setIsModalOpen(true);
    };

    const handleDelete = id => {
        dispatch(deleteDepartment(id));
    };

    const handleSubmit = values => {
        if (editingDepartment) {
            dispatch(updateDepartment({ ...editingDepartment, ...values }));
        } else {
            dispatch(addDepartment(values));
        }
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'Department Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Actions',
            key: 'actions',
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
                <h2>Departments</h2>
                <Button type="primary" onClick={handleAdd}>Add Department</Button>
            </div>

            <Table
                dataSource={departments}
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
                <DepartmentEditForm
                    initialValues={editingDepartment}
                    onSubmit={handleSubmit}
                />
            </Modal>
        </div>
    )
}
