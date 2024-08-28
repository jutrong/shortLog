"use client"
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from "remark-gfm";
import { PluggableList } from 'unified'
import slug from 'rehype-slug'
import Toc from '@/components/Toc';
import raw from 'rehype-raw'


const MarkdownRenderer = ({ content }: { content: string }) => {

  return (
    <div className='w-full text-[15px] sm:text[13px]'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[raw, slug] as PluggableList}
        components={{
          // 코드 블록을 커스텀 처리
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className='w-full flex justify-center my-10 '>
                <SyntaxHighlighter
                  className="border-2 border-gray-200 rounded-md w-full  "
                  style={coy} // 원하는 하이라이트 테마를 선택
                  language={match[1]}
                  PreTag="div"
                  showLineNumbers
                  customStyle={{ paddingTop: '30px', paddingBottom: '30px', fontSize: '13px' }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // 다른 마크다운 요소는 기본 렌더링 처리
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
