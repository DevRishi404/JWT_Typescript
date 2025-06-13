import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    TextField, Button, Flex, Box, Heading, Container,
    Theme, Select
} from "@radix-ui/themes";
import { useAuth } from "./AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconEye, IconEyeOff } from '@tabler/icons-react'

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    gender: string;
    confirmPassword: string;
}

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);

    const { register } = useAuth();

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: {errors}
    } = useForm<RegisterForm>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            gender: "",
            confirmPassword: ""
        },
    });

    const onSubmit = async (model: RegisterForm) => {
        try {
            //   const result = await register(email, password);
            //   toast.success(result.message);
            //   reset();
            console.log(model)
        } catch (e) {
            if (e instanceof Error) {
                toast.error(e.message || "Registration failed");
            } else {
                console.error(e);
            }
        }
    };

    return (
        <Theme>
            <Container size="2" mt="6">
                <Box
                    p="5"
                    style={{ borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}
                >
                    <Heading size="6" mb="4" align="center">
                        Register
                    </Heading>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Flex direction="column" gap="3">

                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <TextField.Root
                                        {...field}
                                        placeholder="Name"
                                        type="text"
                                        required
                                    />
                                )}
                            />

                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField.Root
                                        {...field}
                                        placeholder="Email"
                                        type="email"
                                        required
                                    />
                                )}
                            />

                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <TextField.Root
                                        {...field}
                                        placeholder="Password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                    >
                                        <TextField.Slot side="right" onClick={() => setShowPassword(prev => !prev)} style={{cursor: "pointer"}}>
                                            {showPassword ? <IconEyeOff /> : <IconEye />}
                                        </TextField.Slot>
                                    </TextField.Root>
                                )}
                            />

                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field }) => (
                                    <TextField.Root
                                        {...field}
                                        placeholder="Confirm Password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                    />
                                )}
                                rules={{
                                    validate: (value) => {
                                        return value === watch("password") || "Passwords do not match"
                                    }
                                }}
                            />
                            <span style={{color: 'red'}}>{errors && errors.confirmPassword && errors.confirmPassword.message}</span>

                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <Select.Root
                                        {...field}
                                        onValueChange={field.onChange}
                                        required
                                    >
                                        <Select.Trigger placeholder="Select One" />
                                        <Select.Content>
                                            <Select.Group>
                                                <Select.Item value="male">Male</Select.Item>
                                                <Select.Item value="female">Female</Select.Item>
                                            </Select.Group>
                                        </Select.Content>
                                    </Select.Root>
                                )}
                            />

                            <Button type="submit" variant="solid" size="3" mt="2" style={{cursor: "pointer"}}>
                                Register
                            </Button>
                        </Flex>
                    </form>
                </Box>

                <ToastContainer position="top-right" />
            </Container>
        </Theme>
    );
};

export default Register;
