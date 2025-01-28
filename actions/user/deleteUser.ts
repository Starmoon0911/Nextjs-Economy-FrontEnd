import axios from '@/actions/axios';
export default async function DeleteUser(userId: string) {
    try {
        // 從 localStorage 獲取 token
        const token = localStorage.getItem('token');
        
        // 添加 Authorization 標頭
        await axios.delete(`/api/v1/user/delete?id=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return 'success';
    } catch (error) {
        console.error('Failed to delete user:', error);
        return 'fail';
    }
}
