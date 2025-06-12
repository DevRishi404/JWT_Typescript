import { createContext, useContext, useState } from "react";
import { type User } from '../models/User';
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
    user: User | undefined;
    login: (email: string, password: string) => void;
    logout: () => void;
    loading: boolean;
    setUser: (user: User | undefined) => void;
    setLoading: (loading: boolean) => void;
    register: (email: string, password: string) => Promise<{message: string}>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const loginFn = async ({ email, password }: User): Promise<User> => {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const res = await response.json();
            throw new Error(res.message || 'Login failed');
        }

        const data = await response.json();
        console.log('Login successful:', data);
        return data as User;
    } catch (e) {
        throw new Error(`Login error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
}

const registerFn = async ({ email, password }: User): Promise<{message: string}> => {
    try {
        const response = await fetch('/api/auth/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if(!response.ok) {
            const res = await response.json();
            throw new Error(res.message || 'Registration failed');
        }

        const data = await response.json();
        console.log('Registration successful:', data);
        return data;
    } catch(e) {
        throw new Error(`Registration error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: loginFn,
        onSuccess: (user: User) => {
            setUser(user);
            console.log("Login successful", user);
        },
        onError: (error) => {
            console.error("Login failed", error);
        }
    });

    const { mutateAsync: mutateRegister } = useMutation({
        mutationFn: registerFn,
        onSuccess: (data) => {
            console.log("Registration successful", data);
            return data;
        },
        onError: (error) => {
            console.error("Registration failed", error);
        }
    })

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const user = await mutateAsync({ email, password });
            setUser(user);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        console.log("Logging out");
        setUser(undefined);
        queryClient.clear();
    }

    const register = async (email: string, password: string): Promise<{message: string}> => {
        setLoading(true);
        try {
            const data = await mutateRegister({ email, password });
            if(!data) {
                return { message: "Registration failed" }
            }  

            return data;
        } catch(e) {
            console.error("Registration failed", e);
            return { message: "Registration failed" };
        }
    }   

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, setUser, setLoading, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}