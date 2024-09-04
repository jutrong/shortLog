import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import rehypePrettyCode from "rehype-pretty-code";
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeToc from 'rehype-toc';
import '../styles/toc.css'

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(language: 'ko' | 'jp') {
  const languageDirectory = path.join(postsDirectory, language);
  const fileNames = fs.readdirSync(languageDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(languageDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    
    const matterResult = matter(fileContents);

    const blogPost = {
      id,
      title: matterResult.data.title,
      subTitle: matterResult.data.subTitle,
      tabMenu: matterResult.data.tabMenu,
      date: matterResult.data.date,
      tags: matterResult.data.tags,
      content: matterResult.content,
    };

    return blogPost;
  });


  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1)); // 내림차순
}

export async function getPostData(id:string,language: 'ko' | 'jp') {
  const fullPath = path.join(postsDirectory, language,`${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  
  const processedContent = await remark()
    .use(html)
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeToc, { headings: ['h2', 'h3'], cssClasses: { toc: 'toc' } }) 
    .use(rehypeStringify)
    .process(matterResult.content)
   
  const contentHtml = processedContent.toString();
  const file = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypePrettyCode, {
    // See Options section below.
  })
  .use(rehypeStringify)
  .process("`const numbers = [1, 2, 3]{:js}`");
  
  const blogPost = {
    id,
    title: matterResult.data.title,
    subTitle: matterResult.data.subTitle,
    tabMenu: matterResult.data.tabMenu,
    date: matterResult.data.date,
    tags: matterResult.data.tags,
    content: matterResult.content,
  };

  return {
    blogPost,
    contentHtml,
  };
}