'use client'
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { FileUploader } from '@/components/ui/FileUploader'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createProductRequest } from '@/actions/dashboard/createProduct'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const FormSchema = z.object({
    productName: z.string().min(1, { message: "商品名稱不可為空" }),
    productDescription: z.string().min(1, { message: "商品描述不可為空" }),
    productImage: z.any(),
    productPrice: z
        .number()
        .nonnegative({ message: "價格不能是負數" }), // 允許 0 或正數
    productCategory: z.string().min(1, { message: "商品類別不可為空" }),
    productStock: z
        .number()
        .int({ message: "庫存數量必須是整數" })
        .nonnegative({ message: "庫存數量不能是負數" }),
    productTags: z.string().optional(),
    content: z.string().min(1, { message: "商品內容不可為空" }), // 新增 content 驗證
});
    
const categoryOptions = [
    { value: 'electronics', label: '電子產品' },
    { value: 'clothing', label: '服飾' },
    { value: 'home', label: '家居用品' },
    { value: 'beauty', label: '美容' },
    { value: 'books', label: '書籍' },
];

export function NewProductForm({ setIsDialogOpen }: { setIsDialogOpen: (isOpen: boolean) => void }) {
    const [productImages, setProductImages] = useState<File[]>([])
    const [progresses, setProgresses] = useState<Record<string, number>>({})
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            productName: "",
            productDescription: "",
            productPrice: 0,
            productImage: "",
            productCategory: selectedCategory, // 使用 selectedCategory
            productStock: 0,
            productTags: "",
            content: "", // 新增 content 預設值
        },
    })

    function handleUpload(files: File[]): Promise<void> {
        setProductImages(files);
        return new Promise((resolve) => {
            files.forEach((file) => {
                setProgresses((prev) => ({ ...prev, [file.name]: 0 }));
                const interval = setInterval(() => {
                    setProgresses((prev) => {
                        const progress = (prev[file.name] || 0) + 10;
                        if (progress >= 100) {
                            clearInterval(interval);
                            if (Object.values(prev).every((p) => p >= 100)) {
                                resolve(); // Resolve promise once all files are "uploaded"
                            }
                            return { ...prev, [file.name]: 100 };
                        }
                        return { ...prev, [file.name]: progress };
                    });
                }, 200);
            });
        });
    }

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await createProductRequest({
                name: data.productName,
                description: data.productDescription,
                price: data.productPrice,
                category: selectedCategory,
                stock: data.productStock,
                tags: data.productTags,
                content: data.content, // 新增 content
                images: productImages,
            });
            setIsDialogOpen(false); 
            console.log('商品已新增');
            window.location.reload();
        } catch (error) {
            console.error('新增商品時發生錯誤:', error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <h2 className="text-lg font-bold">新增商品</h2>

                <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>商品名稱</FormLabel>
                            <FormControl>
                                <Input placeholder="輸入商品名稱" {...field} />
                            </FormControl>
                            <FormDescription>輸入商品的名稱</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="productImage"
                    render={() => (
                        <FormItem>
                            <FormLabel>商品圖片</FormLabel>
                            <FormControl>
                                <FileUploader
                                    value={productImages}
                                    onValueChange={setProductImages}
                                    onUpload={handleUpload}
                                    progresses={progresses}
                                    accept={{ "image/*": [] }}
                                    maxFileCount={5}
                                    multiple
                                    className={"bg-slate-300 text-gray-900 dark:bg-gray-800 dark:text-white"}
                                />
                            </FormControl>
                            <FormDescription>上傳商品的圖片</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="productDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>商品描述</FormLabel>
                            <FormControl>
                                <Textarea placeholder="輸入商品描述" {...field} />
                            </FormControl>
                            <FormDescription>輸入商品的詳細描述</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="productPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>價格(0表免費)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="輸入價格"
                                    {...field}
                                    onChange={event => {
                                        const value = +event.target.value
                                        field.onChange(value)
                                    }}
                                />
                            </FormControl>
                            <FormDescription>設定商品價格</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="productCategory"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>商品類別</FormLabel>
                            <FormControl>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full">
                                            {selectedCategory ? categoryOptions.find(option => option.value === selectedCategory)?.label : "選擇商品類別"}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        {categoryOptions.map((option) => (
                                            <DropdownMenuItem
                                                key={option.value}
                                                onClick={() => {
                                                    setSelectedCategory(option.value);  // 更新選擇的類別
                                                    field.onChange(option.value);       // 同時更新 form 的值
                                                }}
                                            >
                                                {option.label}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </FormControl>
                            <FormDescription>選擇商品的類別</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="productStock"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>庫存數量</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="輸入商品數量"
                                    {...field}
                                    onChange={event => {
                                        const value = +event.target.value
                                        field.onChange(value)
                                    }}
                                />
                            </FormControl>
                            <FormDescription>設定商品的庫存數量</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="productTags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>商品標籤</FormLabel>
                            <FormControl>
                                <Input placeholder="輸入商品標籤" {...field} />
                            </FormControl>
                            <FormDescription>設定商品的標籤 (可選)</FormDescription>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>商品內容</FormLabel>
                            <FormControl>
                                <Textarea placeholder="輸入商品內容" {...field} />
                            </FormControl>
                            <FormDescription>輸入商品的內容（例如用途、功能、規格等）</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full bg-blue-600 text-white">
                    新增
                </Button>
            </form>
        </Form>
    )
}

export default NewProductForm
