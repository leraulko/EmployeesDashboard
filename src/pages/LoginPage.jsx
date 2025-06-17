import { useDispatch } from "react-redux";
import { logIn } from "../store/AuthSlice";
import { Button, Form, Input } from 'antd';

export default function LoginPage() {
    const dispatch = useDispatch();
    
    const onFinish = values => {
        dispatch(logIn({username: values.username, password: values.password}));
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, margin: '20px auto' }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Log In
                </Button>
            </Form.Item>
        </Form>
    )
}