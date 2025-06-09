import { TextField, Button } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const defaultValues = {
    email: '',
    password: ''
}

interface LoginForm {
    email: string;
    password: string;
}

const Login = () => {

    const {
        control,
        handleSubmit
    } = useForm<LoginForm>({ defaultValues });

    const handleFormSubmit = (data: LoginForm) => {
        loginMutation.mutate(data);
    }

    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: async (data: LoginForm) => {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const res= await response.json();
                alert(res.message || 'Login failed');
            }
            return response.json();
        },
        onSuccess: (data) => {
            console.log('Login successful:', data);
            queryClient.setQueryData(['user'], data);
        },
        onError: (error) => {
            console.error('Login error:', error);
        }
    })

    return (
        <>
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="form-group">
                        <div className="email">
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField.Root
                                        placeholder="Email"
                                        size="1"
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                        <div className="password">
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) =>
                                    <TextField.Root
                                        placeholder="Password"
                                        size="1"
                                        {...field}
                                        type="password"
                                    />
                                }
                            />

                        </div>
                        <div>
                            <Button type="submit" size="3">Login</Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )

}

export default Login;