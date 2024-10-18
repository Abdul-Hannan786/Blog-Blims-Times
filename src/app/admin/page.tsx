"use client";

import AdminTable from "@/Components/AdminTable";
import Loader from "@/Components/Loader";
import { db } from "@/Firebase/firebaseConfig";
import { DeleteBlog } from "@/Firebase/firebaseFirestore";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { toast } from "react-toastify";

const Admin = () => {
  const [cards, setCards] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      console.log(allblog);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (firebaseID: string) => {
    setIsLoading(true);
    try {
      await DeleteBlog(firebaseID)
      setCards((prevCards) => prevCards.filter((card) => card.firebaseID !== firebaseID))
      toast.success("Blog deleted successfully!")
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="p-5">
        <Link href={"/admin/createblog"}>
          <button className="btn btn-primary">
            <MdAdd className="text-xl" />
            Create a blog
          </button>
        </Link>
        {cards.length > 0 ? (
          <div className="mt-5">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
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
                  {cards.map(
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
            <h3 className="text-2xl font-bold">No Data Found</h3>
          </div>
        )}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Admin;
