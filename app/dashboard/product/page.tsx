'use client';
import { CreateNewDashboardPage } from "@/components/dashboard/CreateNewDashboardPage";
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import ConfirmButton from "@/components/dashboard/confirmButton";
import NewProductForm from '@/components/dashboard/_forms/newProduct';
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

function ProductList() {
    const [confirmButtonVisibility, setConfirmButtonVisibility] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const prodcuts = await getProducts({})
            console.log(prodcuts)
            setProducts(prodcuts.data)
        }
        fetchProducts();
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setConfirmButtonVisibility(true);
        }, 3000);
    }, []);

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
                                <NewProductForm />
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-12">
                        {products.map((product) => (
                            <Card key={product._id} className="bg-card shadow-lg">
                                <CardHeader>
                                    <AspectRatio ratio={16 / 9}>
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_BackEndURL}${product.images?.[0]?.replace(/\\/g, '/')}`}
                                            alt={product.name}  // 使用更正確的變數名稱
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </AspectRatio>
                                </CardHeader>
                                <CardContent>
                                    <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
                                    <CardDescription className="text-sm text-muted-foreground">{truncateText(product.description, 30)}</CardDescription>
                                </CardContent>
                                <CardFooter className="relative">  {/* 設置為relative，讓子元素可以使用absolute定位 */}
                                    <div className="absolute left-0 bottom-0 text-lg font-medium">${product.price}</div>  {/* 使用absolute定位價格 */}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
                <ConfirmButton
                    onClick={() => {
                        setConfirmButtonVisibility(false)
                    }}
                    visible={confirmButtonVisibility}
                />
            </CreateNewDashboardPage>
        </div>
    );
}

export default ProductList;
