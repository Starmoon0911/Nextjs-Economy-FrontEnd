'use client'
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { FileUploadArea } from '@/components/ui/FileUploadArea'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Define form validation schema
const FormSchema = z.object({
    productName: z.string().min(1, { message: "商品名稱不可為空" }),
    productDescription: z.string().min(1, { message: "商品描述不可為空" }),
    productImage: z.any(),
    productPrice: z
        .number()
        .positive({ message: "價格必須為正數" })
        .nonnegative({ message: "價格不能是負數" }),
})

export function NewProductForm() {
    const [productImage, setProductImage] = useState<File | null>(null); // State for the product image

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            productName: "",
            productDescription: "",
            productPrice: 0,
            productImage: "",
        },
    });

    // Function to handle the file upload
    function handleFileUpload(files: File[]) {
      
        if (files.length > 0) {
            setProductImage(files[0]); // Store the first uploaded file
        }
        console.log(productImage)
    }

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <h2 className="text-lg font-bold">新增商品</h2>

                {/* Product Name */}
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

                {/* Product Image */}
                <FormField
                    control={form.control}
                    name="productImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>商品圖片</FormLabel>
                            <FormControl>
                                <FileUploadArea 
                                className={"bg-slate-300 text-gray-900 dark:bg-gray-800 dark:text-white"} 
                                onFileUpload={handleFileUpload} />
                            </FormControl>
                            <FormDescription>上傳商品的圖片</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Product Description */}
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

                {/* Product Price */}
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
                                        const value = +event.target.value;  // Convert value to a number
                                        field.onChange(value);
                                    }}
                                />
                            </FormControl>
                            <FormDescription>設定商品價格</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full bg-blue-600 text-white">
                    新增
                </Button>
            </form>
        </Form>
    );
}

export default NewProductForm;