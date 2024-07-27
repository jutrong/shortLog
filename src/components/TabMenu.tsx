"use client"

import { useState } from 'react';

const TabMenu = () => {
  const [activeTab, setActiveTab] = useState('전체');

  const selectTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="w-full flex items-center gap-10 text-xl  pb-2 mt-14 mb-10 h-10 border-b border-gray-300 relative">
      <div
        className={`w-20 text-center cursor-pointer ${activeTab === '전체' ? 'text-black border-b-2 border-black' : 'text-gray-400'} pb-2`}
        onClick={() => selectTab('전체')}
        style={{ position: 'relative', bottom: '-6px' }}
      >
        <p>전체</p>
      </div>
      <div
        className={`w-20 text-center cursor-pointer ${activeTab === '개발' ? 'text-black border-b-2 border-black' : 'text-gray-400'} pb-2`}
        onClick={() => selectTab('개발')}
        style={{ position: 'relative', bottom: '-6px' }}
      >
        <p>개발</p>
      </div>
      <div
        className={`w-20 text-center cursor-pointer ${activeTab === '책' ? 'text-black border-b-2 border-black' : 'text-gray-400'} pb-2`}
        onClick={() => selectTab('책')}
        style={{ position: 'relative', bottom: '-6px' }}
      >
        <p>책</p>
      </div>
    </div>
  );
}

export default TabMenu;
