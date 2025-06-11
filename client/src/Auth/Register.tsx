import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@radix-ui/themes";

interface RegisterForm {
    email: string;
    password: string;
}

const Register = () => {

    const {
        control,
        handleSubmit
    } = useForm<RegisterForm>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (data: RegisterForm) => {
        console.log(data)
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
                </form>
            </div>
        </>
    )
}

export default Register;