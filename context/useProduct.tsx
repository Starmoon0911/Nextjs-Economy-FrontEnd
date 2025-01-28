"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import getProducts from "@/actions/product/getProducts";
import axios from "@/actions/axios";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./useAuth";

interface ProductContextType {
    products: string[];
    buyProduct: (productId: string, quantity: number) => Promise<string>;
    deleteProduct: (product: string) => void;
    editProduct: (product: string) => void;
    createComment: (comment: string) => void;
    deleteComment: (comment: string) => void;
    replyComment: (comment: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<string[]>([]);
    const { toast } = useToast();
    const { user, isLogged } = useAuth(); // 獲取用戶資訊和登入狀態

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts({});
                if (response === 404) return;
                setProducts(response.data);
            } catch (error) {
                toast({
                    title: "載入產品失敗",
                    description: "請稍後再試或聯繫管理員。",
                    variant: "destructive",
                });
            }
        };

        fetchProducts();
    }, []);
    const buyProduct = async (productId: string, quantity: number): Promise<string> => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast({ title: "購買失敗", description: "用戶未授權，請先登入。" });
                return 'failed';  // 确保返回一个值
            }
    
            const product = await axios.get(`/api/v1/product/get?id=${productId}`);
            if (!product) {
                toast({ title: "購買失敗", description: "找不到此商品，請稍後再試。" });
                return 'failed';
            }
    
            if (product.data.data.stock < quantity || product.data.data.stock <= 0) {
                toast({ title: "購買失敗", description: "庫存不足，請減少購買數量。" });
                return 'failed';
            }
    
            const response = await axios.post(`/api/v1/order/create`, {
                productId,
                userId: user.id,
                quantity,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (response.status === 200 || response.status === 201) {
                toast({ title: "購買成功", description: "等待管理員確認您的訂單<3" });
                return 'success';
            } else {
                toast({ title: "購買失敗", description: "購買失敗，請稍後再試。" });
                return 'failed';
            }
        } catch (error) {
            toast({ title: "購買失敗", description: "伺服器錯誤，請稍後再試。" });
            return 'failed';
        }
    };
    

    const deleteProduct = (product: string) => {
        // 處理產品刪除邏輯
    };

    const editProduct = (product: string) => {
        // 處理產品編輯邏輯
    };

    const createComment = (comment: string) => {
        // 處理新增評論邏輯
    };

    const deleteComment = (comment: string) => {
        // 處理刪除評論邏輯
    };

    const replyComment = (comment: string) => {
        // 處理回覆評論邏輯
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                buyProduct,
                deleteProduct,
                editProduct,
                createComment,
                deleteComment,
                replyComment,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProduct 必須在 ProductProvider 中使用");
    }
    return context;
};
