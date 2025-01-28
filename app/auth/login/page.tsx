'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/useAuth';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await login(email, password); // 不需要檢查返回值
            setLoading(false);
        } catch (err: unknown) {  // 將 err 設為 unknown
            if (err instanceof Error) {  // 檢查 err 是否為 Error 類型
                setError(err.message || '登入失敗，請稍後再試');
            } else {
                setError('登入失敗，請稍後再試');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-300 dark:bg-gray-900">
            <div
                className="w-1/3 bg-cover bg-center opacity-60"
                style={{ backgroundImage: 'url("/static/login_bg.jpg")' }}
            ></div>

            <div className="flex shadow-sm flex-col justify-center items-center w-1/2 p-8">
                <div className="max-w-sm w-full space-y-6 p-8 bg-white bg-opacity-70 rounded-xl dark:bg-black">
                    <h2 className="text-3xl text-black font-bold text-center dark:text-white">登入</h2>
                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-black mb-2 dark:text-white" htmlFor="email">電子郵件</label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="請輸入電子郵件"
                                required
                                className="w-full p-3 bg-white text-black rounded-md border border-gray-700 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white dark:border-gray-700"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-black mb-2 dark:text-white" htmlFor="password">密碼</label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="請輸入密碼"
                                required
                                className="w-full p-3 bg-white text-black rounded-md border border-gray-700 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white dark:border-gray-700"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full dark:text-white dark:bg-gray-700"
                        >
                            {loading ? '登入中...' : '登入'}
                        </Button>
                    </form>

                    <p className="text-sm text-black mt-4 text-center dark:text-white">
                        還沒有帳號? <a href="/auth/signup" className="text-primary dark:text-primary">註冊</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
