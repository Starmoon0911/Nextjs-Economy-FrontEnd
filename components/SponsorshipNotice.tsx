'use client';
import React, { useState } from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog"; // 根據你的 Shadcn 專案路徑來引入

const SponsorshipNotice = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className='flex justify-center text-center'>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <p className="text-gray-500 italic cursor-pointer hover:text-gray-300 transition">
                        贊助須知
                    </p>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-h-[80vh] overflow-y-auto">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-bold">贊助須知</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm">
                            <ul className="list-disc list-inside">
                                <li>您的贊助款項將用於維持伺服器運作、更新遊戲內容、提升服務品質等。</li>
                                <li>長期開發與架設伺服器需要耗費大量時間、金錢與軟硬體設備，如果您願意提供贊助，本人不勝感激。</li>
                                <li>贊助時，您同意按照中華民國法律保障之個人財產贈與的名目贊助給本人，為您自願支持本人開發伺服器之行為。</li>
                                <li>若您因違反伺服器規定帳號遭停權，贊助款項恕不退還。</li>
                                <li>本遊戲伺服器雖不受定型化契約之限制，但將於即將關閉之前7日告知關閉且暫停收取任何之贊助伺服器金額。</li>
                                <li>任何非找我之贊助付款行為，本伺服器與本人一概不承認之。</li>
                                <li>贊助付款時，等同已審視且同意以上條約，若不同意，請勿付款。</li>
                            </ul>
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogTitle className="text-lg font-bold mt-4">風險提示</AlertDialogTitle>
                    <AlertDialogDescription className="text-sm">
                        <ul className="list-disc list-inside">
                            <li>伺服器運營時間不確定，可能因故提前關閉。</li>
                            <li>贊助款項一經支付，恕不退還。</li>
                            <li>伺服器可能因不可抗力因素而暫停服務。</li>
                        </ul>
                    </AlertDialogDescription>

                    <AlertDialogTitle className="text-lg font-bold mt-4">注意事項</AlertDialogTitle>
                    <AlertDialogDescription className="text-sm">
                        <ul className="list-disc list-inside">
                            <li>本團隊保留修改本條款的權利，修改後的條款將於公告後生效。</li>
                            <li>本條款若有與中華民國法律牴觸之處，以法律規定為準。</li>
                            <li>請您務必確認您的贊助意願，並仔細閱讀本條款。</li>
                            <li>贊助即表示您同意本條款的所有內容。</li>
                        </ul>
                    </AlertDialogDescription>

                    <div className="mt-6 flex flex-col space-y-2">
                        <AlertDialogCancel asChild>
                            <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition">
                                取消
                            </button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                                同意
                            </button>
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>

    );
};

export default SponsorshipNotice;
