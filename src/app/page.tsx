"use client";

import { db } from "@/Firebase/firebaseConfig";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Loader from "./Components/Loader";
import Footer from "./Components/Footer";
import BlogCard from "./Components/BlogCard";

export default function Home() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [allBlogs, setAllBlogs] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    const collectionRef = collection(db, "blogs");
    setIsLoading(true);
    try {
      const allBlogsSnapShot = await getDocs(collectionRef);
      const blogs = allBlogsSnapShot.docs.map((blog) => {
        const obj = blog.data();
        return obj;
      });
      setAllBlogs(blogs);
      console.log(allBlogs);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBlogs =
    selectedTag === "All"
      ? allBlogs
      : allBlogs.filter((blog) => blog.tag === selectedTag);

  return (
    <div className="p-4 mb-7">
      <label className="form-control w-full max-w-xs flex justify-start items-start">
        <div className="label">
          <span className="label-text font-semibold text-[15px]">
            Filter by tag:
          </span>
        </div>
        <select
          className="select select-bordered select-sm select-primary"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Coding">Coding</option>
          <option value="Education">Education</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Blogging">Blogging</option>
        </select>
      </label>

      {filteredBlogs.length > 0 ? (
        <div className="flex items-center justify-center">
          <div className="mt-5 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-3 2xl:grid-cols-5 gap-4 h-auto">
            {filteredBlogs.map(
              ({ title, content, imageURL, firebaseID, slug, tag }) => (
                <BlogCard
                  key={firebaseID}
                  title={title}
                  content={content}
                  slug={slug}
                  tag={tag}
                  imageURL={imageURL}
                />
              )
            )}
          </div>
        </div>
      ) : (
        <div className="h-[75vh] flex items-center justify-center">
          <h3 className="text-2xl font-bold mb-16">No Blog Found</h3>
        </div>
      )}
      <Footer />
      {isLoading && <Loader />}
    </div>
  );
}
