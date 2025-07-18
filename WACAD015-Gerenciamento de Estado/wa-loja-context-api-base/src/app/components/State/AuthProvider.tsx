"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface IAuth {
  emailUsuario: null | string;
  login: (emailUsuario: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<IAuth>({
    emailUsuario: null,
    login: () => {},
    logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [emailUsuario, setEmailUsuario] = useState<null | string>(null);
    const router = useRouter();

    useEffect(() => {
        // recupera o email do localStorage
        const user = localStorage.getItem("user");
        if (user) {
            setEmailUsuario(user);
        }
    }, []);

    const login = (email: string) => {
        setEmailUsuario(email);
        localStorage.setItem("user", email);
        router.push("/");
    };

    const logout = () => {
        setEmailUsuario(null);
        localStorage.removeItem("user");
        router.push("/login");
    };

    const values = {
        emailUsuario,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const authContext = useContext(AuthContext);
    return authContext;
};

export default AuthProvider;