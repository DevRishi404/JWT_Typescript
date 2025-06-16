import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type RegisterReqBody } from "../models/RegisterTypes";
import { type LoginResBody, type LoginReqBody, type User } from "../models/LoginTypes";

interface AuthContextType {
    user: User | undefined;
    login: (email: string, password: string) => void;
    logout: () => void;
    loading: boolean;
    setUser: (user: User | undefined) => void;
    setLoading: (loading: boolean) => void;
    register: (registerData: RegisterReqBody) => Promise<{ message: string }>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const loginFn = async ({ email, password }: LoginReqBody): Promise<LoginResBody> => {
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
        return data;
    } catch (e) {
        throw new Error(`Login error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
}

const registerFn = async (registerData: RegisterReqBody): Promise<{ message: string }> => {
    try {
        const response = await fetch('/api/auth/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });

        if (!response.ok) {
            const res = await response.json();
            throw new Error(res.message || 'Registration failed');
        }

        const data = await response.json();
        console.log('Registration successful:', data);
        return data;
    } catch (e) {
        throw new Error(`Registration error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const queryClient = useQueryClient();

    useEffect(() => {
        try {
            const validateUser = async () => {
                setLoading(true);
                let res = await fetch("/api/auth/me", { credentials: "include" });

                if (res.status === 401) {
                    const refreshRes = await fetch("/api/auth/refresh", { 
                        method: "POST",
                        credentials: "include" 
                    });

                    if (refreshRes.status !== 200) {
                        logout();
                        setLoading(false);
                        return;
                    }
                    
                    res = await fetch("/api/auth/me", { credentials: "include" });
                    if (res.status !== 200) {
                        logout();
                        setLoading(false);
                        return;
                    }
                }

                const data = await res.json();
                setUser(data.user);
                setLoading(false);
            }

            validateUser();
        } catch (e) {
            setUser(undefined);
            throw new Error("Error while validating user");
        }
    }, [])

    const { mutateAsync } = useMutation({
        mutationFn: loginFn,
        onSuccess: (user: LoginResBody) => {
            console.log("Login successful", user);
            return user;
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
            const res: LoginResBody = await mutateAsync({ email, password });

            const user: User = {
                name: res.user.name,
                email: res.user.name,
                gender: res.user.gender
            }

            setUser(user);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try{
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include"
            });
            console.log("Logging out");
            setUser(undefined);
            queryClient.clear();

        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    }

    const register = async (registerData: RegisterReqBody): Promise<{ message: string }> => {
        setLoading(true);
        try {
            const data = await mutateRegister(registerData);
            if (!data) {
                return { message: "Registration failed" }
            }

            return data;
        } catch (e) {
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