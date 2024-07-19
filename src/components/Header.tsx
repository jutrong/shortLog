"use client"

import { LIST } from "@/constant/lists";
import { motion, useAnimation, useCycle } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { throttle } from 'lodash';

const Header = () => {
  const controls = useAnimation();
  const headerRef = useRef(null);
  const listWidth = LIST.length * 200; // 각 아이템의 너비를 200px로 가정

  useEffect(() => {
    const handleMouseMove = throttle((event) => {
      if (headerRef.current) {
        const rect = (headerRef.current as HTMLElement).getBoundingClientRect();
        const xPos = event.clientX - rect.left;

        if (xPos < rect.width / 2) {
          controls.start({
            x: [0, -listWidth],
            transition: { repeat: Infinity, duration: 50, ease: "linear" }
          });
        } else {
          controls.start({
            x: [-listWidth, 0],
            transition: { repeat: Infinity, duration: 50, ease: "linear" }
          });
        }
      }
    }, 10000);

    const element = headerRef.current as unknown as HTMLElement;
    element && element.addEventListener("mousemove", handleMouseMove);

    return () => {
      element && element.removeEventListener("mousemove", handleMouseMove);
    };
  }, [controls, listWidth]);
  return (
    <header className="relative w-full h-20 border border-b-black " ref={headerRef}>
      <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border borde-black z-10 bg-white overflow-hidden" />
      <motion.div className="w-full h-full flex items-center"
        animate={controls}
      >
        {
          [...LIST, ...LIST].map((item) => {
            return (
              <motion.div key={item.id} className="w-48 text-center flex-shrink-0"
              >
                <p className="cursor-pointer">{item.title}</p>
              </motion.div>
            )
          })
        }
      </motion.div>
    </header>
  )
}

export default Header;