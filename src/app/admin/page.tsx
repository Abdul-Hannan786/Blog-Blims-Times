"use client";

import { db } from "@/Firebase/firebaseConfig";
import { DeleteBlog } from "@/Firebase/firebaseFirestore";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { toast } from "react-toastify";
import AdminTable from "../Components/AdminTable";
import Loader from "../Components/Loader";

const Admin = () => {
  const [cards, setCards] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState("All")

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const blogRef = collection(db, "blogs");
    setIsLoading(true);
    try {
      const allBlogsSnapShot = await getDocs(blogRef);
      const allblog = allBlogsSnapShot.docs.map((blog) => {
        const obj = blog.data();
        obj.id = blog.id;
        return obj;
      });
      setCards(allblog);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (firebaseID: string) => {
    setIsLoading(true);
    try {
      await DeleteBlog(firebaseID);
      setCards((prevCards) =>
        prevCards.filter((card) => card.firebaseID !== firebaseID)
      );
      toast.success("Blog deleted successfully!");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBlogs =
  selectedTag === "All"
    ? cards
    : cards.filter((blog) => blog.tag === selectedTag);

  return (
    <div className="h-auto flex flex-col mb-12">
      <div className="flex items-center">
        <div className="p-4 flex-shrink-0">
          <Link href={"/admin/createblog"}>
            <button className="btn btn-primary">
              <MdAdd className="text-xl" />
              Create a blog
            </button>
          </Link>
        </div>
        <label className="form-control w-full max-w-xs flex justify-start items-start">
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
      </div>

      <div className="flex-grow overflow-y-auto p-3 mb-5">
        {filteredBlogs.length > 0 ? (
          <div className="mt-5">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th className="text-[15px] text-neutral">Blog Title</th>
                    <th className="text-[15px] text-neutral">Tag</th>
                    <th className="text-[15px] text-neutral">Delete</th>
                    <th className="text-[15px] text-neutral">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBlogs.map(
                    (
                      { title, tag, imageURL, createdDate, firebaseID, slug },
                      index
                    ) => (
                      <AdminTable
                        key={index + title}
                        title={title}
                        tag={tag}
                        imageURL={imageURL}
                        index={index}
                        createdDate={createdDate}
                        firebaseID={firebaseID}
                        deleteFunc={handleDelete}
                        slug={slug}
                      />
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="h-[75vh] flex items-center justify-center">
            <h3 className="text-2xl font-bold mb-16">No Blog Found</h3>
          </div>
        )}
      </div>

      {isLoading && <Loader />}
    </div>
  );
};

export default Admin;
