import React from 'react';
import Link from 'next/link';

interface CustomLinkProps {
  href: string;
  hNumber: 'H1' | 'H2' | 'H3';
  isPass: boolean;
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, hNumber, isPass, children }) => {
  const baseStyle = 'block text-gray-800 hover:text-blue-600 transition-colors duration-200';
  const headingStyles = {
    H1: 'text-xl font-bold',
    H2: 'text-lg font-semibold ml-4',
    H3: 'text-md ml-8',
  };

  const activeStyle = 'text-blue-600 font-semibold';
  const headingStyle = `${baseStyle} ${headingStyles[hNumber]} ${isPass ? activeStyle : ''}`;

  return (
    <Link href={href} passHref>
      <p className={headingStyle}>
        {children}
      </p>
    </Link>
  );
};

export default CustomLink;
