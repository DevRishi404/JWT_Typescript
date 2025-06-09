import { TextField, Button } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";

const defaultValues = {
    username: '',
    password: ''
}

interface LoginForm {
    username: string;
    password: string;
}

const Login = () => {

    const {
        control,
        handleSubmit
    } = useForm<LoginForm>({ defaultValues });

    const handleFormSubmit = (data: LoginForm) => {
        console.log(data);
    }

    return (
        <>
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="form-group">
                        <div className="username">
                            <Controller
                                name="username"
                                control={control}
                                render={({ field }) => (
                                    <TextField.Root
                                        placeholder="Username"
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