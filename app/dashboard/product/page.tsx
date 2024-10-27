import ProductCard from "@/components/ProductCard";
import { CreateNewDashboardPage } from "@/components/dashboard/CreateNewDashboardPage";
import { Button } from '@/components/ui/button';
import products from "@/lib/ProduectListExample";

function ProductList() {
    return (
        <div className="relative">
            <CreateNewDashboardPage>
                <div className="container mx-auto px-4">
                    {/* 新增商品按鈕 */}
                    <div className="absolute top-4 right-4">
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                            新增商品
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-12">
                        {products.map(product => (
                            <ProductCard
                                key={product.id} // 為每個 ProductCard 添加唯一的 key
                                imageSrc={product.imageSrc}
                                title={product.title}
                                description={product.description}
                                price={product.price}
                                admin={true}
                            />
                        ))}
                    </div>
                </div>
            </CreateNewDashboardPage>
        </div>
    );
}

export default ProductList;
