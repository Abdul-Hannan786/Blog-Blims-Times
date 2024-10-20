"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

type BlogCardType = {
  title: string;
  content: string;
  imageURL: string;
  slug: string;
  tag: string;
};

const BlogCard = ({ title, content, imageURL, slug, tag }: BlogCardType) => {
  const route = useRouter();

  const seeMore = () => {
    route.push(`blog/${slug}`);
  };
 
  return (
    <div className="shadow-2xl bg-base-100 rounded-lg h-auto p-2.5 border-slate-100 border-2 max-w-xs">
      <div className="w-full h-40 rounded-xl">
        <Image
          src={imageURL}
          alt="blog image"
          width={800}
          height={800}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      <div className="flex flex-col mt-3 gap-3 p-2">
        <h2 className="font-bold text-[21px] line-clamp-1">{title}</h2>
        <ReactMarkdown className="line-clamp-4 text-slate-700 text-[15px] font-medium">
          {content}
        </ReactMarkdown>
        <div className="flex items-center justify-between mt-3">
          <button
            className="btn btn-sm btn-primary font-semibold"
            onClick={seeMore}
          >
            See More
          </button>
          <div className="badge badge-primary font-semibold p-3 text-white">
            {tag}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
