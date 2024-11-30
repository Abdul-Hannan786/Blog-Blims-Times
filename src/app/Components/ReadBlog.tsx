"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "@/Firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Comments from "./Comments";

const ReadBlog = ({ slug }: { slug: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState<DocumentData>();
  const route = useRouter();

  useEffect(() => {
    if (!slug) toast.error("Couldn't find the slug");
    if (!auth.currentUser?.uid) {
      toast.error("Please Login First");
      route.push("/signin");
      return;
    }
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    setIsLoading(true);
    try {
      const collectionRef = collection(db, "blogs");
      const condition = where("slug", "==", slug);
      const q = query(collectionRef, condition);
      const blogSnapShot = await getDocs(q);
      blogSnapShot.forEach((doc) => {
        setBlog(doc.data());
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-10 lg:px-16 xl:px-24">
      {blog ? (
        <div className="w-full h-auto rounded-xl shadow-2xl p-3 sm:p-8 lg:p-14 py-4 lg:py-10 border-slate-100 border-2">
          <div className="relative w-full rounded-lg h-[14rem] sm:h-[18rem] md:h-[20rem] lg:h-[23rem] xl:h-[29rem]">
            {blog.videoURL ? (
              <video
                controls
                loop
                autoPlay
                className="w-full h-full rounded-xl object-cover md:object-contain border-slate-100 border-2"
              >
                <source src={blog.videoURL} />
              </video>
            ) : (
              <Image
                src={blog?.imageURL}
                alt="blog-image"
                fill
                className="object-cover rounded-xl"
                quality={100}
              />
            )}
          </div>
          <div className="mt-5 p-2 flex flex-col gap-5">
            <h1 className="text-4xl font-black">{blog.title}</h1>
            <div>
              <span className="inline-flex items-center px-3 py-2 text-sm font-medium bg-primary rounded text-white">
                {blog.tag}
              </span>
            </div>
            <div className="prose prose-lg">
              <ReactMarkdown className="prose">{blog.content}</ReactMarkdown>
            </div>
          </div>

          <Comments firebaseID={blog.firebaseID} />
        </div>
      ) : (
        <></>
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default ReadBlog;


