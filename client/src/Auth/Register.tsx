import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    TextField, Button, Flex, Box, Heading, Container,
    Theme, Select, Text
} from "@radix-ui/themes";
import { useAuth } from "./AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { type RegisterReqBody } from "../models/RegisterTypes";
import { Link } from "wouter";

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);

    const { register } = useAuth();

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm<RegisterReqBody>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            gender: "",
            confirmPassword: ""
        },
    });

    const onSubmit = async (model: RegisterReqBody) => {
        try {
            const data: RegisterReqBody = {
                name: model.name,
                email: model.email,
                password: model.password,
                confirmPassword: model.confirmPassword,
                gender: model.gender
            }
              const result = await register(data);
              toast.success(result.message);
              reset();
            // console.log(model)
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
                                        <TextField.Slot side="right" onClick={() => setShowPassword(prev => !prev)} style={{ cursor: "pointer" }}>
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
                            {errors && errors.confirmPassword && (
                                <span style={{ color: 'red' }}>
                                    {errors.confirmPassword.message}
                                </span>)
                            }

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

                            <Button type="submit" variant="solid" size="3" mt="2" style={{ cursor: "pointer" }}>
                                Register
                            </Button>
                        </Flex>
                    </form>
                </Box>

                <Flex justify="center">
                    <Text as="div" size="3">
                        Already Registered? <Link href="/login">Login</Link>
                    </Text>
                </Flex>

                <ToastContainer position="top-right" />
            </Container>
        </Theme>
    );
};

export default Register;
