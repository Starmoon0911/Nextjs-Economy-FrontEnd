'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from '@/actions/axios'
import { useEffect } from 'react'

interface AuthContextType {
    isLogged: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');
            const expTime = localStorage.getItem('expTime');

            if (token) {
                // 如果 expTime 存在，檢查是否超過 1 天
                if (expTime) {
                    const expirationDate = new Date(expTime);
                    const now = new Date();

                    if (now.getTime() - expirationDate.getTime() <= 24 * 60 * 60 * 1000) {
                        setIsLogged(true);
                        return;
                    }
                }
                try {
                    const response = await axios.post('/api/v1/auth/validate', { token: token });
                    if (response.status === 200) {
                        setIsLogged(true);
                        localStorage.setItem('expTime', new Date().toISOString()); // 更新 expTime
                    } else {
                        logout();
                    }
                } catch (error) {
                    logout(); // Token 無效則登出
                }
            }
        };

        validateToken();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('/api/v1/auth/login', {
                email,
                password,
                rememberMe: true,
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expTime', new Date().toISOString()); // 設置 expTime
                window.location.href = '/'; // 登入成功後跳轉
            }
            setIsLogged(true);
            return response.data.token;

        } catch (err: any) {
            throw Error(err.response?.data?.message || '登入失敗，請稍後再試');

        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expTime');
        setIsLogged(false);
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ isLogged, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth 必須在 AuthProvider 中使用");
    }
    return context;
};
