'use client'

import CustomLink from '@/components/CustomLink'
import useObservation from '@/hooks/useObserver'
import { useEffect, useState } from 'react'

const TOC = () => {
  // header에 있는 id값을 저장해둠.
  const [currentId, setCurrentId] = useState<string>('')
  const [headingEls, setHeadingEls] = useState<HTMLElement[]>([])

  useEffect(() => {
    const headingElements: HTMLElement[] = Array.from(document.querySelectorAll('h2, h3'))
    setHeadingEls(headingElements)
  }, [])

  useObservation(setCurrentId, headingEls)

  return (
    <>
      {headingEls?.map((heading, index) => {
        return (
          <CustomLink
            hNumber={heading.nodeName}
            isPass={heading.id === currentId}
            href={'#' + heading.id}
            key={`heading-${index}`}
          >
            {heading.innerText}
          </CustomLink>
        )
      })}
    </>
  )
}
export default TOC