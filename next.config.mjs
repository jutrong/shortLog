import createMDX from "@next/mdx";

const nextConfig = {
  // 마크다운 및 MDX 파일을 포함시키기 위해 페이지 확장자 설정
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  xtension: /\.mdx?$/,
  options: {
    providerImportSource: "@mdx-js/react",
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
