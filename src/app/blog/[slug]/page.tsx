import ReadBlog from "@/app/Components/ReadBlog";

type ReadBlogType = {
  params: { slug: string };
};

const Blog = ({ params: { slug } }: ReadBlogType) => {
  return <ReadBlog slug={slug} />;
};

export default Blog;
