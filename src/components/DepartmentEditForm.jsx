import { Form, Input, Button } from 'antd';

export default function DepartmentEditForm({ initialValues, onSubmit }) {
    const [form] = Form.useForm();

    const handleFinish = values => {
        onSubmit(values);
        form.resetFields();
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={handleFinish}
        >
            <Form.Item
                label="Department Name"
                name="name"
                rules={[{ required: true, message: 'Please enter department name' }]}
            >
                <Input placeholder="Enter department name" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {initialValues ? 'Update' : 'Add'}
                </Button>
            </Form.Item>
        </Form>
    );
}
