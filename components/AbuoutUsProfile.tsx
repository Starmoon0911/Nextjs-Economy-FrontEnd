import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AboutUsProps {
  avatarURL: string;
  name: string;
  desc: string;
  right?: boolean;  // 可選的 right 參數
}

const AboutUs: React.FC<AboutUsProps> = ({ avatarURL, name, desc, right }) => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // 設定初始狀態
    gsap.set([nameRef.current, avatarRef.current, descRef.current], { opacity: 0, y: 20 });

    // 動畫效果
    gsap.to([avatarRef.current, nameRef.current], {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,  // 讓名字和 avatar 有間隔出現
    });

    // 介紹文字稍後出現
    gsap.to(descRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 1,  // 延遲 1 秒後出現
    });
  }, []);

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-10">
      <div className="container mx-auto px-4">
        {/* 使用 flex 來控制排列方式 */}
        <div className={`max-w-4xl mx-auto flex items-center ${right ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col`}>
          <img
            ref={avatarRef}
            className="w-48 h-48 rounded-full mb-6 md:mb-0 md:mr-6 md:ml-6"
            src={avatarURL}
            alt={`${name}'s Avatar`}
          />
          <div className={`text-center md:text-left ${right ? 'md:text-right' : ''}`}>
            <h3 ref={nameRef} className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{name}</h3>
            <p ref={descRef} className="text-lg text-gray-700 dark:text-gray-300 opacity-0 transform translate-y-5">
              {desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
