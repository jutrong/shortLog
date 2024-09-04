'use client'
import React, { useState } from 'react';

const Switch = () => {
  const [language, setLanguage] = useState('ko');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ko' ? 'jp' : 'ko');
  };

  return (
    <div className="p-5">
      <div className="flex items-center space-x-3">
        <span className={`${language === 'ko' ? 'font-bold' : 'opacity-40'}`}>한국어</span>
        <button
          onClick={toggleLanguage}
          className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-300 transition-colors duration-200 ease-in-out focus:outline-none"
        >
          <span className={`inline-block w-4 h-4 transform transition ease-in-out duration-200 bg-white rounded-full shadow ${language === 'jp' ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
        <span className={`${language === 'jp' ? 'font-bold' : 'opacity-40'}`}>日本語</span>
      </div>
    </div>
  );
};

export default Switch;
