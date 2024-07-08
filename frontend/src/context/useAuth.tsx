import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorAlert, successAlert } from '../alerts';
import { LoginResponse, ValidRoles } from '../interfaces/user';
import { login, register } from "../services/auth.service";

type UserContextType = {
    user: Partial<LoginResponse> | null;
    token: string | null;
    registerUser: (email: string, username: string, password: string, rol: ValidRoles, fullName?: string) => void;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<Partial<LoginResponse> | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
        }
        setIsReady(true);
    }, []);

    const saveUserAndToken = (user: Partial<LoginResponse>, token: string,) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setToken(token);
        setUser(user);
    }

    const registerUser = async (
        email: string,
        username: string,
        password: string,
        rol: ValidRoles,
        fullName?: string,
    ) => {
        const response = await register(email, username, password, rol, fullName)

        if (response?.status === 201) {
            const { username, rol, token } = response?.data
            const user = { username, rol }
            saveUserAndToken(user, token)
            successAlert('Exitoso', 'Sesión iniciada')
            navigate("/");
        } else {
            errorAlert('Error', response)
        }

    };

    const loginUser = async (email: string, password: string) => {

        const response = await login(email, password)

        if (response?.status === 200) {
            const { username, rol, token } = response?.data
            const user = { username, rol }
            saveUserAndToken(user, token)
            successAlert('Exitoso', 'Sesión iniciada')
            navigate("/");
        } else {
            errorAlert('Error', response)
        }

    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
    };

    return (
        <UserContext.Provider
            value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);