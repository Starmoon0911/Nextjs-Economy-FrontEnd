'use client'
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { FileUploader } from '@/components/ui/FileUploader'
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
    const [productImages, setProductImages] = useState<File[]>([])
    const [progresses, setProgresses] = useState<Record<string, number>>({})

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            productName: "",
            productDescription: "",
            productPrice: 0,
            productImage: "",
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


    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(productImages)
        console.log(data)
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

                <Button type="submit" className="w-full bg-blue-600 text-white">
                    新增
                </Button>
            </form>
        </Form>
    )
}

export default NewProductForm
