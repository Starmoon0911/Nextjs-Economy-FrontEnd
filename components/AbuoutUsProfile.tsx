import React from 'react';

interface AboutUsProps {
  avatarURL: string;
  name: string;
  desc: string;
  right?: boolean;  // 可選的 right 參數
}

const AboutUs: React.FC<AboutUsProps> = ({ avatarURL, name, desc, right }) => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-10">
      <div className="container mx-auto px-4">
        {/* 使用 flex 來控制排列方式 */}
        <div className={`max-w-4xl mx-auto flex items-center ${right ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col`}>
          <img
            className="w-48 h-48 rounded-full mb-6 md:mb-0 md:mr-6 md:ml-6"
            src={avatarURL}
            alt={`${name}'s Avatar`}
          />
          <div className={`text-center md:text-left ${right ? 'md:text-right' : ''}`}>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{name}</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
