import { TextField, Button } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "./AuthContext";
import { useLocation } from "wouter";
import { useEffect } from "react";

const defaultValues = {
    email: '',
    password: ''
}

interface LoginForm {
    email: string;
    password: string;
}

const Login = () => {

    const [, setLocation] = useLocation();

    const {
        control,
        handleSubmit
    } = useForm<LoginForm>({ defaultValues });

    const { login, user } = useAuth();

    useEffect(() => {   
        if(user) {
            setLocation('/dashboard');
        }
    }, [user, setLocation]);

    const handleFormSubmit = ({email, password}: LoginForm) => {
        login(email, password);
    }

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