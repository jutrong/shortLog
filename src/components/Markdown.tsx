import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { dracula, oneDark, atomDark, nord, solarizedlight, tomorrow, coy } from 'react-syntax-highlighter/dist/esm/styles/prism'; // 테마 선택
import remarkGfm from "remark-gfm";

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // 코드 블록을 커스텀 처리
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <div className=' flex justify-center my-10'>
              <SyntaxHighlighter
                className="border-2 border-gray-200 rounded-md w-[90%]"
                style={coy} // 원하는 하이라이트 테마를 선택
                language={match[1]}
                PreTag="div"
                showLineNumbers
                customStyle={{ paddingTop: '30px', paddingBottom: '30px' }}
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
  );
};

export default MarkdownRenderer;
