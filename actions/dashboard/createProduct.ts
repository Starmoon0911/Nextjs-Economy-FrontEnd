import axios from '@/actions/axios';

interface CreateProductData {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    tags?: string;
    content: string;
    images: File[];
}

export async function createProductRequest(data: CreateProductData): Promise<void> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('category', data.category);
    formData.append('stock', data.stock.toString());
    formData.append('content', data.content);
    if (data.tags) {
        formData.append('tags', data.tags);
    }

    data.images.forEach((file) => {
        formData.append('images', file);
    });

    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('/api/v1/product/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },

        });
        console.log('商品已新增:', response.data);
    } catch (error) {
        console.error('新增商品時發生錯誤:', error);
        throw error;
    }
}
