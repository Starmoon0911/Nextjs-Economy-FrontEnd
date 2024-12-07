import axios from '@/actions/axios';

export async function deleteProductRequest(productId: string): Promise<string> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return 'no token';  // 如果沒有token，返回錯誤訊息
        }

        const response = await axios.delete(`/api/v1/product/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { productId },
        });

        console.log('商品已刪除:', response.data);
        return 'success'; // 如果刪除成功，返回 success
    } catch (error: any) {
        // 返回錯誤訊息
        return 'unknown error';
    }
}
