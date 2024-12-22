'use client';
import { useState } from 'react';
import { useAuth } from "@/context/useAuth";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async () => {
        try {
            await register(email, password, username);
        } catch (err) {
            setError('註冊失敗，請再試一次');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
            <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">註冊</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">用戶名</label>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">電子郵件</label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">密碼</label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full"
                    />
                </div>
                <Button
                    onClick={handleRegister}
                    className="w-full py-3 rounded-lg font-semibold transition"
                >
                    註冊
                </Button>
            </div>
        </div>
    );
}