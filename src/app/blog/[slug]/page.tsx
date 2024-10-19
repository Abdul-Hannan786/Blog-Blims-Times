"use client";

import { useEffect } from "react";

type ReadBlogType = {
  params: { slug: string };
};

const ReadBlog = ({ params: { slug } }: ReadBlogType) => {
  useEffect(() => {
    console.log(slug)
  }, [])
  return <div>ReadBlog</div>;
};

export default ReadBlog;
