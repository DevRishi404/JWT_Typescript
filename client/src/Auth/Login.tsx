import { TextField, Button, Heading, Flex, Text } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "./AuthContext";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import '../stylesheets/Login.css';
import { IconUserFilled, IconKey, IconEye, IconEyeOff } from '@tabler/icons-react'
import { Link } from "wouter";

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
    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
        handleSubmit
    } = useForm<LoginForm>({ defaultValues });

    const { login, user } = useAuth();

    useEffect(() => {
        if (user) {
            setLocation('/dashboard');
        }
    }, [user, setLocation]);

    const handleFormSubmit = ({ email, password }: LoginForm) => {
        login(email, password);
    }

    const handlePasswordVisibility = () => {
        setShowPassword(prev => !prev)
    }

    return (
        <>
            <div className="login-outer-container">
                <div className="login-container">
                    <Heading size="8">Login</Heading>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="form-group">
                            <div className="email">
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField.Root
                                            placeholder="Email"
                                            size="3"
                                            {...field}
                                        >
                                            <TextField.Slot
                                                side="left"
                                            >
                                                <IconUserFilled />
                                            </TextField.Slot>
                                        </TextField.Root>
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
                                            size="3"
                                            {...field}
                                            type={showPassword ? "text" : "password"}
                                            className="wide-textfield"
                                        >
                                            <TextField.Slot
                                                side="left"
                                            >
                                                <IconKey />
                                            </TextField.Slot>
                                            <TextField.Slot side="right" onClick={handlePasswordVisibility} style={{ cursor: "pointer" }}>
                                                {showPassword ? <IconEyeOff /> : <IconEye />}
                                            </TextField.Slot>
                                        </TextField.Root>
                                    }
                                />

                            </div>
                            <div className="button">
                                <Button variant="outline" color="bronze" type="submit" size="3" style={{ cursor: "pointer" }}>
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                    <Flex justify="center" style={{marginTop: "1rem"}}>
                        <Text as="div">
                            New Here? <Link href="/register">Register</Link>
                        </Text>
                    </Flex>
                </div>
            </div>
        </>
    )

}

export default Login;