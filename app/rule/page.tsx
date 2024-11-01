import React from 'react';
import { FaExclamationTriangle, FaRegEye, FaLock } from 'react-icons/fa';

const RulesPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-500 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
                    伺服器規章
                </h1>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
                        <FaExclamationTriangle className="inline-block mr-2 text-yellow-500" />
                        規章
                    </h2>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                        <li>嚴禁一切偷竊、破壞、辱罵、詐騙等影響他人遊玩體驗之行為。違者將依照罰則進行處分(詳見罰則)</li>
                        <li>嚴禁任何於公開頻道之爭吵、政治、色情、歧視或具強烈負面情緒之言論或刷頻之行為，同時禁止關於其他伺服器之討論。違者將依照罰則進行處分(詳見罰則)</li>
                        <li>嚴禁任何以具法律效力之現實貨幣交易遊戲內之物品之行為。違者將依照罰則進行處分(詳見罰則)</li>
                    </ul>

                    <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
                        <FaRegEye className="inline-block mr-2 text-blue-500" />
                        特設規章 (僅活動區域生效)
                    </h2>
                    <blockquote className="bg-gray-100 dark:bg-gray-700 border-l-4 border-blue-500 text-gray-600 dark:text-gray-300 p-4 mb-4">
                        活動場地內嚴禁任何外掛、卡BUG之惡劣影響平衡行為。違者將依照罰則進行處分(詳見罰則)
                    </blockquote>

                    <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
                        <FaLock className="inline-block mr-2 text-red-500" />
                        規章實施判定辦法
                    </h2>
                    <blockquote className="bg-gray-100 dark:bg-gray-700 border-l-4 border-blue-500 text-gray-600 dark:text-gray-300 p-4 mb-4">
                        偷竊、破壞等行為，將以遊戲內/co i紀錄作為證據進行判定，無論該區是否設置有領地，破壞或偷竊行為皆不被允許。
                    </blockquote>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        但設置有領地者，可協助回朔該區塊至遭受偷竊、破壞前，彌補損失；反之則否。
                    </p>

                    <blockquote className="bg-gray-100 dark:bg-gray-700 border-l-4 border-blue-500 text-gray-600 dark:text-gray-300 p-4 mb-4">
                        有關言論之相關規章判定，若言論違規明顯且嚴重，將以管理團隊主觀判定；若言論無法主觀判定處分，則將以討論方式進行公審程序。
                    </blockquote>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        我方保有最終決定權。
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        任何被查獲以具法律效力之現實貨幣交易遊戲內之物品之違規行為，伺服器將介入調查。
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        任何於活動利用外掛之行為，伺服器管理團隊將進行隱形蒐證，當蒐集足夠證據後會當面詢問當事人，若當事人坦承犯行，則從輕處分。
                    </p>
                    <blockquote className="bg-gray-100 dark:bg-gray-700 border-l-4 border-blue-500 text-gray-600 dark:text-gray-300 p-4 mb-4">
                        任何利用BUG之行為，若玩家發現該BUG(不該出現卻出現之事務)後並未及時通報，並且利用該BUG刷取大量資源或其他不良行為，則判定為惡意利用該BUG。
                    </blockquote>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        若該BUG已經被管理團隊所確認，且允許可繼續使用，伺服器將不進行任何處分，但不代表該BUG不會被修正。
                    </p>

                    <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
                        補充
                    </h2>
                    <blockquote className="bg-gray-100 dark:bg-gray-700 border-l-4 border-blue-500 text-gray-600 dark:text-gray-300 p-4 mb-4">
                        希望所有玩家和平、歡樂遊玩本伺服器。
                    </blockquote>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        回報、檢舉時請提供你所知的所有證據。
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        所有事務皆須至多5~7工作日，請勿著急而煩擾管理團隊，敬請見諒。
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        以上我方保有最終解釋與修改權。
                    </p>
                    
                    <p className="text-lg text-center text-gray-600 dark:text-gray-300">
                        點擊領取身分組即代表你同意以上規章
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RulesPage;
