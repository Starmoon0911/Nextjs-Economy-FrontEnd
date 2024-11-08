'use client';
import ProductCard from "@/components/ProductCard";
import { CreateNewDashboardPage } from "@/components/dashboard/CreateNewDashboardPage";
import { Button } from '@/components/ui/button';
import products from "@/lib/ProduectListExample";
import { useEffect, useState } from 'react';
import ConfirmButton from "@/components/dashboard/confirmButton";
import NewProductForm from '@/components/dashboard/_forms/newProduct';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
} from '@/components/ui/dialog';

function ProductList() {
    const [confirmButtonVisibility, setConfirmButtonVisibility] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
                            <DialogContent>
                                <NewProductForm />
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-12">
                        {products.map(product => (
                            <ProductCard
                                key={product.id}
                                imageSrc={product.imageSrc}
                                title={product.title}
                                description={product.description}
                                price={product.price}
                                admin={true}
                            />
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
