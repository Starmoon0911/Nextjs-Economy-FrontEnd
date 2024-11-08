'use client'
import React, { useState } from 'react';

const DashboardMainForm: React.FC = () => {
  const [logo, setLogo] = useState<string>('');
  const [bgImage, setBgImage] = useState<string>('');

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogo(e.target.value);
  };

  const handleBgImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setBgImage(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 在這裡處理提交邏輯，例如保存到數據庫或更新狀態
    console.log('Logo:', logo);
    console.log('Background Image:', bgImage);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <h1 className="text-2xl font-bold mb-4">Dashboard Settings</h1>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="logo">
          Website Logo (Text)
        </label>
        <input
          type="text"
          id="logo"
          value={logo}
          onChange={handleLogoChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter logo text"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="bgImage">
          Background Image (Upload or URL)
        </label>
        <input
          type="text"
          id="bgImageUrl"
          value={bgImage}
          onChange={handleBgImageChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Enter image URL"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleBgImageChange}
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Save Settings
      </button>
    </form>
  );
};

export default DashboardMainForm;
