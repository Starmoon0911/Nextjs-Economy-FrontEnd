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
import axios from '@/actions/axios'
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
        .positive({ message: "價格必須為正數" })
        .nonnegative({ message: "價格不能是負數" }),
    productCategory: z.string().min(1, { message: "商品類別不可為空" }),
    productStock: z
        .number()
        .int({ message: "庫存數量必須是整數" })
        .nonnegative({ message: "庫存數量不能是負數" }),
    productTags: z.string().optional(),
})

const categoryOptions = [
    { value: 'electronics', label: '電子產品' },
    { value: 'clothing', label: '服飾' },
    { value: 'home', label: '家居用品' },
    { value: 'beauty', label: '美容' },
    { value: 'books', label: '書籍' },
];

export function NewProductForm() {
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

        const formData = new FormData();
        formData.append('name', data.productName);
        formData.append('description', data.productDescription);
        formData.append('price', data.productPrice.toString()); // 將 number 轉為 string
        formData.append('category', data.productCategory.toString()); // 使用 selectedCategory
        formData.append('stock', data.productStock.toString()); // 將 number 轉為 string
        if (data.productTags) {
            formData.append('tags', data.productTags);
        }

        // 將圖片加入 FormData
        productImages.forEach((file) => {
            formData.append('images', file); // 'images' 是後端期望接收的欄位名稱
        });

        formData.forEach((value, key) => {
            console.log(key, value);
        });
        try {
            const response = await axios.post('/api/v1/product/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('商品已新增:', response.data);
        } catch (error) {
            console.error('新增商品時發生錯誤:', error || error);
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
                            <FormLabel>價格</FormLabel>
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

                <Button type="submit" className="w-full bg-blue-600 text-white">
                    新增
                </Button>
            </form>
        </Form>
    )
}

export default NewProductForm
