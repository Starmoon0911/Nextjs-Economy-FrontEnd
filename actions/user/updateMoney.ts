import axios from '@/actions/axios';
export default async function updateMoney(userId: string, balance: number) {
    try {
        // 從 localStorage 獲取 token
        const token = localStorage.getItem('token');

        // 添加 Authorization 標頭
        await axios.post(`/api/v1/user/updateMoney`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            userId: userId,
            balance: balance,
        });
        return 'success';
    } catch (error) {
        console.error('Failed to delete user:', error);
        return 'fail';
    }
}
