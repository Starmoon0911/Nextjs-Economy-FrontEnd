'use client';
import { Button } from '@/components/ui/button';
import { MouseEventHandler, useEffect, useState } from 'react';

interface ConfirmButtonProps {
    visible?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}


const ConfirmButton: React.FC<ConfirmButtonProps> = ({ visible = false, onClick }) => {
    const [isVisible, setIsVisible] = useState(visible);

    useEffect(() => {
        // 在組件載入後設置初始可見性
        setIsVisible(visible);
    }, [visible]);

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 mb-12 mx-auto max-w-md flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md shadow-md transition-transform duration-500 ease-out ${isVisible ? 'transform translate-y-0' : 'transform translate-y-[200%]'
                }`}
        >
            <span className="text-gray-700">確認變更?</span>
            <Button onClick={onClick} variant="outline">確認</Button>
        </div>
    );
};

export default ConfirmButton;
