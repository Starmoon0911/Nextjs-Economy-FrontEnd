'use client'
import React from 'react';
import SponsorshipNotice from '@/components/SponsorshipNotice';
import supportInfo from '@/lib/supportInfo';
import { Button } from '@/components/ui/button';
import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
const SponsorshipPage = () => {
    const OpenDC = () => {
        window.open('https://discord.com/users/576666559439699981', '_blank');
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 flex flex-col">
            <div className="container mx-auto px-4 flex-grow">
                <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">贊助資訊</h1>
                <SponsorshipNotice />
                <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">
                    我們非常感謝您考慮贊助我們🛐，您的支持將幫助我們達成更多的目標，並使我們更加成功！
                </p>

                {/* 贊助方案 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {Object.entries(supportInfo).map(([key, plan]) => (
                        <div key={key} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{plan.displayName}</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">每月贊助 ${plan.price}</p>
                            <p className="mb-4">包括：</p>
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                                <li>最大家點數量: {plan.maxHomePoint}</li>
                                <li>最大保區數量: {plan.maxResCount}</li>
                                {plan.canUseBack && <li>可使用後台功能</li>}
                                {plan.useEC && <li>可使用遠端終界箱</li>}
                                {plan.nick && <li>可設定昵稱</li>}
                                {plan.more && <li className='text-gray-400'><Link target='_blank' href='https://cdn.discordapp.com/attachments/1296348513134706739/1301156994379419690/image.png?ex=67261761&is=6724c5e1&hm=4fe46d8347b255566a9230168d1a0bfd98014e0d264da9ba8ecea81e37124eb8&'>還有更多...</Link></li>}
                            </ul>
                        </div>
                    ))}


                    <div className="container mx-auto px-4">

                        <Button
                            variant="default"
                            onClick={OpenDC}
                            className="flex items-center space-x-2"
                        >
                            <ExternalLinkIcon className="h-4 w-4" />
                            <span>立即贊助</span>
                        </Button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default SponsorshipPage;
