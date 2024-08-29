import { Dispatch, SetStateAction, useState } from 'react';

interface TabMenuProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const TabMenu = ({ activeTab, setActiveTab }: TabMenuProps) => {
  return (
    <div className="w-full flex items-center gap-10 text-xl  pb-2 mt-14 mb-10 h-10 border-b border-gray-300 relative sm:text-[17px]">
      <div
        className={`w-20 text-center cursor-pointer ${activeTab === '전체' ? 'text-black border-b-2 border-black' : 'text-gray-400'} pb-2 `}
        onClick={() => setActiveTab('전체')}
        style={{ position: 'relative', bottom: '-6px' }}
      >
        <p>전체</p>
      </div>
      <div
        className={`w-20 text-center cursor-pointer ${activeTab === '개발' ? 'text-black border-b-2 border-black' : 'text-gray-400'} pb-2`}
        onClick={() => setActiveTab('개발')}
        style={{ position: 'relative', bottom: '-6px' }}
      >
        <p>개발</p>
      </div>
      <div
        className={`w-20 text-center cursor-pointer ${activeTab === '책' ? 'text-black border-b-2 border-black' : 'text-gray-400'} pb-2`}
        onClick={() => setActiveTab('책')}
        style={{ position: 'relative', bottom: '-6px' }}
      >
        <p>책</p>
      </div>
    </div>
  );
}

export default TabMenu;
