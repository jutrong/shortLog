'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

const kyotoImages = [
  "/images/png/kyoto1.jpeg",
  "/images/png/kyoto2.jpeg",
  "/images/png/kyoto3.jpeg",
  "/images/png/kyoto4.jpeg",
  "/images/png/kyoto5.jpeg",
  "/images/png/kyoto6.jpeg",
  "/images/png/kyoto7.jpeg",
  "/images/png/kyoto9.jpeg",
  "/images/png/kyoto10.jpeg",
  "/images/png/kyoto12.jpeg",
  "/images/png/kyoto13.jpeg",
  "/images/png/kyoto11.jpeg",
  "/images/png/kyoto8.jpeg",
  "/images/png/kyoto14.jpeg",
  "/images/png/kyoto15.jpeg",
  "/images/png/kyoto16.jpeg",
]

const Photo = () => {
  return (
    <div className=" w-full h-full py-10 text-black font-Seo mt-40 box-border ">
      <div className="w-full h-full  ">
        <div className=" w-full h-full">
          <div className="flex items-end gap-4 px-20">
            <p className="text-xl font-bold">Kyoto</p>
            <p className="text-xs">2024.07.10 - 07.14</p>
          </div>
          <div className='overflow-hidden w-full h-full flex items-center mt-10'>
            <motion.div
              className="w-full h-full"
              initial={{ x: "0%" }}
              animate={{ x: "-200%" }}
              transition={{
                repeat: Infinity,
                duration: 50,
                ease: "circIn",
              }}
            >
              <div className=" w-full  flex ">
                {kyotoImages.map((src, index) => (
                  <div key={index} className='min-w-[300px] h-[500px] mr-8  rounded-lg overflow-hidden'>
                    <Image src={src} alt={`Photo ${index}`} width={300} height={300} quality={100} className='' />
                  </div>
                ))}
                {/* 두 번째 이미지 세트, 무한 스크롤을 위해 반복 */}
                {kyotoImages.map((src, index) => (
                  <div key={index + kyotoImages.length} className="min-w-[300px] h-[500px] mr-8  rounded-lg overflow-hidden">
                    <Image src={src} alt={`Photo ${index}`} width={300} height={300} quality={100} className="" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Photo;