import { useState, useRef } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BalanceCell = ({ row }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [tempMoney, setTempMoney] = useState(row.original.balance);
    const originalMoney = useRef(row.original.balance);
    const { toast } = useToast();
    const updateMoney = async (newValue: number) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                '/api/v1/user/updateMoney',
                { userId: row.original.id, balance: newValue },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast({ title: "金錢已更新", description: "金錢已成功更新" });
        } catch (error) {
            console.error('Failed to update money:', error);
            toast({ title: "更新失敗", description: "請檢查網路連線或稍後再試" });
        } finally {
            setIsDialogOpen(false);
        }
    };

    const handleInputChange = (value: string) => {
        if (/^\d*$/.test(value)) {
            setTempMoney(Number(value));
        }
    };

    return (
        <>
            <div
                className="cursor-pointer"
                onClick={() => {
                    originalMoney.current = row.original.balance;
                    setTempMoney(row.original.balance);
                    setIsDialogOpen(true);
                }}
            >
                ${row.original.balance.toLocaleString()}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>編輯金額</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <Input
                            value={tempMoney.toString()}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    updateMoney(tempMoney);
                                }
                            }}
                            autoFocus
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setTempMoney(originalMoney.current);
                                setIsDialogOpen(false);
                            }}
                        >
                            取消
                        </Button>
                        <Button onClick={() => updateMoney(tempMoney)}>
                            確認
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BalanceCell;
