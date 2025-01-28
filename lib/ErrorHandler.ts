import { useToast } from "@/hooks/use-toast";
export function ErrorHandler(statusCode: number) {
    const { toast } = useToast();
    switch (statusCode) {
        case 200:
            toast({
                title: "200: 成功",
                description: "請求成功。",
                variant: "default",
            });
            break;
        case 201:
            toast({
                title: "201: 已建立",
                description: "資源已成功建立。",
                variant: "default",
            });
            break;
        case 204:
            toast({
                title: "204: 無內容",
                description: "請求成功，但沒有內容。",
                variant: "default",
            });
            break;
        case 400:
            toast({
                title: "400: 請求錯誤",
                description: "請確認輸入資料是否正確。",
                variant: "destructive",
            });
            break;

        case 401:
            toast({
                title: "401: 未授權",
                description: "請先登入，然後再試一次。",
                variant: "destructive",
            });
            break;

        case 403:
            toast({
                title: "403: 禁止存取",
                description: "你沒有權限執行此操作。",
                variant: "destructive",
            });
            break;

        case 404:
            toast({
                title: "404: 找不到資源",
                description: "請求的資源不存在，請檢查網址。",
                variant: "destructive",
            });
            break;

        case 500:
            toast({
                title: "500: 伺服器錯誤",
                description: "伺服器發生錯誤，請稍後再試。",
                variant: "destructive",
            });
            break;

        case 503:
            toast({
                title: "503: 服務不可用",
                description: "伺服器暫時無法使用，請稍後再試。",
                variant: "destructive",
            });
            break;

        default:
            toast({
                title: `${statusCode}: 發生未知錯誤`,
                description: "請稍後再試，或聯絡客服。",
                variant: "destructive",
            });
    }
}
