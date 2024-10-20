import React from 'react';

interface BottomBarProps {
    contactInfo: {
        email: string;
        phone: string;
    };
    links: {
        title: string;
        items: { label: string; url: string }[];
    }[];
    support: {
        title: string;
        items: { label: string; url: string }[];
    };
}

const BottomBar: React.FC<BottomBarProps> = ({ contactInfo, links, support }) => {
    return (
        <footer className="dark:bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
                {/* 使用 flex 來控制排版 */}
                <div className="flex flex-wrap justify-between">
                    <div className="mb-4 w-full sm:w-auto">
                        <h2 className="text-black text-lg font-semibold dark:text-white">聯絡資訊</h2>
                        <p className="text-gray-800 dark:text-gray-400">Email: <a href={`mailto:${contactInfo.email}`} className="text-gray-600 dark:text-gray-200">{contactInfo.email}</a></p>
                        <p className="text-gray-800 dark:text-gray-400">電話: <a href={`tel:${contactInfo.phone}`} className="text-gray-600 dark:text-gray-200">{contactInfo.phone}</a></p>
                    </div>

                    {links.map((linkGroup, index) => (
                        <div key={index} className="mb-4 w-full sm:w-auto">
                            <h2 className="text-black text-lg font-semibold dark:text-white">{linkGroup.title}</h2>
                            <ul className="list-disc list-inside">
                                {linkGroup.items.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a href={link.url} className=" hover:underline text-gray-600 dark:text-gray-300">{link.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="mb-4 w-full sm:w-auto">
                        <h2 className="text-black text-lg font-semibold dark:text-white">{support.title}</h2>
                        <ul className="list-disc list-inside">
                            {support.items.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                    <a href={link.url} className="hover:underline text-gray-600 dark:text-gray-300">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 版權信息 */}
                <div className="text-center text-gray-400 mt-6">
                    <p>© {new Date().getFullYear()} 你的公司名稱. 保留所有權利.</p>
                </div>
            </div>
        </footer>
    );
};

export default BottomBar;
