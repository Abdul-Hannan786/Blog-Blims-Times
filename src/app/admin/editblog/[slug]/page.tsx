"use client";

import EditBlogForm from "@/app/Components/EditBlogForm";


type EditBlogType = {
  params: { slug: string };
};

const EditBlog = ({ params: { slug } }: EditBlogType) => {
  
  return (
    <EditBlogForm slug={slug}/>
  );
};

export default EditBlog;
