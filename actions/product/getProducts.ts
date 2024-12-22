import axios from '@/actions/axios';

interface GetProductProps {
    id?: string;
    limit?: number;
}
export default async function getProducts({ id, limit }: GetProductProps) {
    try {
        const params = new URLSearchParams();
        if (id) params.append('id', id);
        if (limit) params.append('limit', limit.toString());
        const response = await axios.get(`/api/v1/product/get?${params.toString()}`);
        if (response.status === 404) {
            return 404;
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}