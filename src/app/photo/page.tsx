'use client'

import { kyotoImages, ulsanImages } from '@/constant/lists';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const Photo = () => {
  const route = useRouter()

  return (
    <div className=" w-full h-full py-10 text-black font-Seo mt-40 box-border ">
      <div className="w-full h-full  ">
        <div className=" w-full h-full">
          <div className="flex items-end gap-4 px-20">
            <p className="text-xl font-bold">Taehwa-dong. Ulsan</p>
            <p className="text-xs">2024.08.02</p>
          </div>
          <div className='overflow-hidden w-full h-full flex items-center mt-10 cursor-pointer' >
            <motion.div
              className="w-full h-full"
              initial={{ x: "-5%" }}
              animate={{ x: "-200%" }}
              transition={{
                repeat: Infinity,
                duration: 40,
                ease: "linear",
                delay: 2,
                reverse: true,
                repeatType: "reverse",
              }}
            >
              <div className=" w-full  flex  " onClick={() => route.push('/photo/ulsan')}>
                {ulsanImages.map((src, index) => (
                  <div key={index} className='min-w-[300px] h-[500px] mr-8  rounded-lg overflow-hidden'>
                    <Image src={src.imageSrc} alt={`Photo ${index}`} width={300} height={300} quality={100} className='' />
                  </div>
                ))}
                {ulsanImages.map((src, index) => (
                  <div key={index + kyotoImages.length} className="min-w-[300px] h-[500px] mr-8  rounded-lg overflow-hidden">
                    <Image src={src.imageSrc} alt={`Photo ${index}`} width={300} height={300} quality={100} className="" />
                  </div>
                ))}
                {ulsanImages.map((src, index) => (
                  <div key={index + kyotoImages.length} className="min-w-[300px] h-[500px] mr-8  rounded-lg overflow-hidden">
                    <Image src={src.imageSrc} alt={`Photo ${index}`} width={300} height={300} quality={100} className="" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="flex items-end gap-4 px-20">
            <p className="text-xl font-bold">Kyoto</p>
            <p className="text-xs">2024.07.10 - 07.14</p>
          </div>
          <div className='overflow-hidden w-full h-full flex items-center mt-10 cursor-pointer'>
            <motion.div
              className="w-full h-full"
              initial={{ x: "-5%" }}
              animate={{ x: "-200%" }}
              transition={{
                repeat: Infinity,
                duration: 30,
                ease: "linear",
                delay: 2,

              }}
            >
              <div className=" w-full  flex " onClick={() => route.push('/photo/kyoto')}>
                {kyotoImages.map((src, index) => (
                  <div key={index} className='min-w-[300px] h-[500px] mr-8  rounded-lg overflow-hidden'>
                    <Image src={src.imageSrc} alt={`Photo ${index}`} width={300} height={300} quality={100} className='' />
                  </div>
                ))}
                {/* 두 번째 이미지 세트, 무한 스크롤을 위해 반복 */}
                {kyotoImages.map((src, index) => (
                  <div key={index + kyotoImages.length} className="min-w-[300px] h-[500px] mr-8  rounded-lg overflow-hidden">
                    <Image src={src.imageSrc} alt={`Photo ${index}`} width={300} height={300} quality={100} className="" />
                  </div>
                ))}
                {kyotoImages.map((src, index) => (
                  <div key={index + kyotoImages.length} className="min-w-[300px] h-[500px] mr-8  rounded-lg overflow-hidden">
                    <Image src={src.imageSrc} alt={`Photo ${index}`} width={300} height={300} quality={100} className="" />
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