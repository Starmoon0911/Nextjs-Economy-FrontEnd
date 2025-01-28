'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "@/actions/axios";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie"; // 引入 js-cookie

interface AuthContextType {
    isLogged: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
    user: any;
    register: (email: string, password: string, username: string) => void;
    fetchUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<any>(null);
    const { toast } = useToast();

    useEffect(() => {
        const validateTokenAndFetchUser = async () => {
            const token = Cookies.get("token"); // 從 cookie 讀取 token
            const expTime = localStorage.getItem("expTime");

            if (token) {
                if (expTime) {
                    const expirationDate = new Date(expTime);
                    const now = new Date();
                    if (now.getTime() - expirationDate.getTime() <= 24 * 60 * 60 * 1000) {
                        setIsLogged(true);
                        await validateAndFetchUser(token); // 驗證 Token 並獲取 User
                        return;
                    }
                }
                await validateAndFetchUser(token); // 驗證 Token 並獲取 User
            }
        };

        validateTokenAndFetchUser();
    }, []);

    const validateAndFetchUser = async (token: string) => {
        try {
            // 驗證 token 並獲取 userId
            const validateResponse = await axios.post("/api/v1/auth/validate", { token });
            const userId = validateResponse.data.data?.userId;

            if (userId) {
                localStorage.setItem("expTime", new Date().toISOString());
                await fetchUser(userId); // 根據 userId 獲取詳細資料
                setIsLogged(true);
            } else {
                throw new Error("無法取得 userId");
            }
        } catch (error) {
            console.error("Token 驗證失敗或過期:", error);
            logout();
        }
    };

    const fetchUser = async (userId: string) => {
        try {
            const response = await axios.get(`/api/v1/user?id=${userId}`);
            if (response.data.data) {
                const userData = response.data.data;
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
            }
        } catch (error) {
            console.error("取得用戶資料失敗:", error);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post("/api/v1/auth/login", {
                email,
                password,
                rememberMe: true,
            });

            if (response.data.token) {
                const token = response.data.token;
                const expTime = new Date().toISOString();
                
                Cookies.set("token", token, { expires: 7 }); // 將 token 儲存到 cookie，並設定 7 天過期時間
                localStorage.setItem("expTime", expTime);
                await validateAndFetchUser(token); // 驗證 Token 並獲取用戶資料
                window.location.href = "/";
            }
        } catch (err: any) {
            toast({
                title: "登入失敗",
                description: err.response?.data?.message || "登入失敗，請稍後再試",
                variant: "default",
            });
            console.error(err);
        }
    };

    const register = async (email: string, password: string, username: string) => {
        try {
            const response = await axios.post("/api/v1/auth/register", {
                email,
                password,
                username,
            });
            if (response.status === 201) {
                toast({
                    title: "註冊成功",
                    description: "註冊成功，請登入",
                });
                setTimeout(() => {
                    window.location.href = "/auth/login";
                }, 3000);
            }
        } catch (err: any) {
            toast({
                title: "註冊失敗",
                description: err.response?.data?.message || "註冊失敗，請稍後再試",
                variant: "default",
            });
            console.error(err);
        }
    };

    const logout = () => {
        Cookies.remove("token"); // 從 cookie 移除 token
        localStorage.removeItem("expTime");
        localStorage.removeItem("user");
        setIsLogged(false);
        setUser(null);
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ user, isLogged, login, logout, register, fetchUser }}>
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
