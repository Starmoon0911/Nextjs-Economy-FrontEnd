import React, { useState, useEffect } from "react"
import Image from "next/image"

interface DeveloperProfileProps {
    url: string
    name: string
    description: string
    isRightAligned?: boolean // 判斷是否需要右對齊
}

const DeveloperProfile: React.FC<DeveloperProfileProps> = ({
    url,
    name,
    description,
    isRightAligned = false,
}) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

    // 更新窗口大小的函數
    const handleResize = () => {
        setWindowWidth(window.innerWidth)
    }

    // 添加窗口調整事件的監聽器
    useEffect(() => {
        window.addEventListener("resize", handleResize)

        // 清理事件監聽器
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    // 計算圖像的寬度和高度，根據當前螢幕寬度的 60%
    const imageWidth = windowWidth * 0.6
    const imageHeight = windowWidth * 0.6

    const toggleDescription = () => {
        setIsExpanded(!isExpanded)
    }



    return (
        <div className={`flex flex-col sm:flex-row items-center mb-8 ${isRightAligned ? "sm:flex-row-reverse" : ""}`}>
            <Image
                src={url}
                alt={name}
                width={imageWidth}
                height={imageHeight}
                className="rounded-full"
                style={{ maxWidth: "300px", maxHeight: "300px" }} // 限制最大寬高
            />
            <div className={`mt-2 sm:mt-0 sm:${isRightAligned ? "mr-12" : "ml-12"}`} style={{ maxWidth: "80%" }}>
                <h3 className="text-4xl font-semibold text-gray-800 dark:text-white">{name}</h3>
                <p className={`text-gray-600 dark:text-gray-300 ${isExpanded ? "block" : "line-clamp-1 overflow-hidden whitespace-nowrap truncate"}`} 
                   style={{ whiteSpace: isExpanded ? "normal" : "nowrap" }} // 根據展開狀態調整換行
                >
                    {description}
                </p>

                    <button onClick={toggleDescription} className="text-gray-500 mt-2">
                        {isExpanded ? "Show Less" : "Show More"}
                    </button>
                
            </div>
        </div>
    )
}

export default DeveloperProfile
