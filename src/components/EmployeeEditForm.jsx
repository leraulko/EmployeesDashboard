import { Form, Input, Button } from 'antd';

export default function EmployeeEditForm({ initialValues = {}, onSubmit }) {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onSubmit(values);
        form.resetFields();
    };
    
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={initialValues}
            >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter employee name' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Department"
                name="department"
                rules={[{ required: true, message: 'Please enter department' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Position"
                name="position"
                rules={[{ required: true, message: 'Please enter position' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                {initialValues?.id ? 'Update' : 'Add'}
                </Button>
            </Form.Item>
        </Form>
    )
}
