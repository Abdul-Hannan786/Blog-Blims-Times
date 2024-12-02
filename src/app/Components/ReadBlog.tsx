"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
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
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
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
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("Blog not found!");
        setIsLoading(false);
        return;
      }

      querySnapshot.docs.map((snapShot) => {
        const blogId = snapShot.id;
        const blogData = snapShot.data();
        const blog = { ...blogData, blogId };
        setBlog(blog);

        const blogRef = doc(db, "blogs", blogId);
        onSnapshot(blogRef, (snapShot) => {
          const updatedBlog = snapShot.data();
          setIsLiked(
            updatedBlog?.likes?.includes(auth.currentUser?.uid) || false
          );
          setLikeCount(updatedBlog?.likes?.length || 0);
        });
      });
    } catch (err) {
      console.error("Error fetching blog:", err);
      toast.error("An error occurred while fetching the blog.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (!auth.currentUser?.uid) {
      toast.error("You need to log in to like the blog!");
      return;
    }

    try{
      const blogRef = doc(db, "blogs", blog?.blogId)
      if(isLiked){
        await updateDoc(blogRef, {
          likes: arrayRemove(auth.currentUser.uid)
        })
      }
      else{
        await updateDoc(blogRef, {
          likes: arrayUnion(auth.currentUser.uid)
        })
      }
    }
    catch(err){
      console.error("Error updating likes:", err);
      toast.error("An error occurred while updating likes.");
    }
  };

  return (
    <div className="py-12 px-4 sm:px-10 lg:px-16 xl:px-24">
      {blog ? (
        <div className="w-full h-auto rounded-xl shadow-2xl p-3 sm:p-8 lg:p-12 py-4 lg:py-10 border-slate-100 border-2">
          <div className="relative flex justify-center w-full rounded-lg h-[14rem] sm:h-[18rem] md:h-[20rem] lg:h-[22rem] xl:h-[28rem]">
            {blog.videoURL ? (
              <video
                controls
                loop
                autoPlay
                className="h-full w-full md:w-auto rounded-xl object-cover border-slate-100 border-2"
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
            <h1 className="text-4xl text-neutral font-black">{blog.title}</h1>
            <div> 
              <span className="inline-flex items-center px-3 py-2 text-sm font-medium bg-primary rounded text-white">
                {blog.tag}
              </span>
            </div>
            <div className="prose prose-lg">
              <ReactMarkdown className="prose text-neutral leading-relaxed">{blog.content}</ReactMarkdown>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <Comments firebaseID={blog.firebaseID} />
            <div
              className={`flex items-center gap-2 ${
                isLiked ? "text-[#ff0101]" : "text-black"
              }`}
              onClick={handleLike}
            >
              {isLiked ? (
                <svg
                  aria-label="Unlike"
                  className="x1lliihq x1n2onr6 xxk16z8"
                  fill="currentColor"
                  height="26"
                  role="img"
                  viewBox="0 0 48 48"
                  width="26"
                >
                  <title>Unlike</title>
                  <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                </svg>
              ) : (
                <svg
                  aria-label="Like"
                  className="text-neutral"
                  fill="currentColor"
                  height="26"
                  role="img"
                  viewBox="0 0 24 24"
                  width="26"
                >
                  <title>Like</title>
                  <path
                    className=""
                    d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"
                  ></path>
                </svg>
              )}

              <p className="text-xl text-neutral">{likeCount} {likeCount > 1 ? " likes": " like"}</p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default ReadBlog;
