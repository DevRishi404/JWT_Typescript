import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@radix-ui/themes";
import { useAuth } from "./AuthContext";
import { ToastContainer, toast } from "react-toastify";

interface RegisterForm {
    email: string;
    password: string;
}

const Register = () => {

    const {register} = useAuth();

    const {
        control,
        handleSubmit,
        reset
    } = useForm<RegisterForm>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async ({email, password}: RegisterForm) => {
        try {
            const result = await register(email, password);
            toast.success(result.message);
            reset();
        } catch(e) {
            if (e instanceof Error) {
                toast.error(e.message || "Registration failed");
            } else {
                console.log(e);
            }
        }
    }

    return (
        <>
            <div className="register-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <div className="email">
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField.Root
                                        {...field}
                                        placeholder="Enter your email"
                                        size="1"
                                        required
                                    />
                                )}
                            />
                        </div>
                        <div className="password">
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <TextField.Root
                                        {...field}
                                        type="password"
                                        placeholder="Enter your password"
                                        size="1"
                                        required
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <Button type="submit">Register</Button>
                    <ToastContainer />
                </form>
            </div>
        </>
    )
}

export default Register;