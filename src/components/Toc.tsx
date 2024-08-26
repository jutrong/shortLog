'use client'
import CustomLink from '@/components/CustomLink'
import useObservation from '@/hooks/useObserver'
import { useEffect, useState } from 'react'

const TOC = () => {
  const [currentId, setCurrentId] = useState<string>('')
  const [headingEls, setHeadingEls] = useState<HTMLElement[]>([])


  useEffect(() => {
    const headingElements: HTMLElement[] = Array.from(document.querySelectorAll('h1, h2, h3'))
    setHeadingEls(headingElements)
  }, [])

  useObservation(setCurrentId, headingEls);
  console.log(currentId)
  return (
    <>
      {headingEls?.map((heading, index) => {
        const hNumber = heading.nodeName.toUpperCase() as 'H1' | 'H2' | 'H3';
        return (
          <CustomLink
            hNumber={hNumber}
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