'use client';
import { CreateNewDashboardPage } from "@/components/dashboard/CreateNewDashboardPage";
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import ConfirmButton from "@/components/dashboard/confirmButton";
import NewProductForm from '@/components/dashboard/_forms/newProduct';
import { useToast } from "@/hooks/use-toast";
import getProducts from "@/actions/product/getProducts";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { truncateText } from "@/lib/utils";
import { deleteProductRequest } from "@/actions/dashboard/deleteProduct";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react'; // 使用適當的圖標庫
interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
}
function ProductList() {
    const [confirmButtonVisibility, setConfirmButtonVisibility] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const { toast } = useToast();
    useEffect(() => {
        const fetchProducts = async () => {
            const prodcuts = await getProducts({});
            console.log(prodcuts);
            setProducts(prodcuts.data);
        };
        fetchProducts();
    }, []);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setConfirmButtonVisibility(true);
    //     }, 3000);
    // }, []);

    const handleDelete = async (productId: string) => {
        const result = await deleteProductRequest(productId);

        // 根據返回的結果顯示對應的 Toast
        if (result === 'no token') {
            toast({
                title: '未登入',
                description: '請登入後再執行此操作。',
                variant: 'default',
            });
        } else if (result === 'success') {
            toast({
                title: '商品已刪除',
                description: '商品已成功刪除。',
                variant: 'default',
            });
            window.location.reload();
        } else {
            toast({
                title: '錯誤',
                description: result, // 顯示錯誤訊息
                variant: 'default',
            });
        }
    };

    return (
        <div className="relative">
            <CreateNewDashboardPage>
                <div className="container mx-auto px-4">
                    {/* 新增商品按鈕 */}
                    <div className="absolute top-4 right-4">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    className="bg-blue-600 hover:bg-blue-500 text-white"
                                    onClick={() => setIsDialogOpen(true)}
                                >
                                    新增商品
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[80vh] overflow-y-auto">
                                <DialogTitle>新增商品</DialogTitle>
                                <DialogDescription>請填寫商品資訊並提交。</DialogDescription>
                                <NewProductForm setIsDialogOpen={setIsDialogOpen} />
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-12">
                        {products.map((product) => (
                            <Card
                                onClick={() => {
                                    window.location.href = `/products/${product._id}`;
                                }}
                                key={product._id} className="bg-card shadow-lg min-h-[270px]">
                                <CardHeader className="-m-6">
                                    {/* 移除內部 padding */}
                                    <AspectRatio ratio={16 / 9}>
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_BackEndURL}${product.images?.[0]?.replace(/\\/g, '/')}`}
                                            alt={product.name}
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </AspectRatio>
                                </CardHeader>
                                <CardContent>
                                    <CardTitle className="mt-2 text-2xl font-semibold">{product.name}</CardTitle>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        {truncateText(product.description, 30)}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="relative h-16 flex items-center justify-between">
                                    {/* 左側顯示價格 */}
                                    <div className="text-lg font-medium">
                                        {product.price === 0 ? 'FREE' : `$${product.price}`}
                                    </div>

                                    {/* 右下角新增 DropdownMenu */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                                <EllipsisVertical className="w-5 h-5" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleDelete(product._id)}>
                                                刪除
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
                <ConfirmButton
                    onClick={() => {
                        setConfirmButtonVisibility(false);
                    }}
                    visible={confirmButtonVisibility}
                />
            </CreateNewDashboardPage>
        </div>
    );
}

export default ProductList;
