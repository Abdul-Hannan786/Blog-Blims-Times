"use client";

import { auth, db } from "@/Firebase/firebaseConfig";
import {
  arrayUnion,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "./Loader";
import Image from "next/image";

const Comments = ({ firebaseID }: { firebaseID: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<DocumentData[]>([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchAllComments();
  }, []);

  const addComment = async () => {
    if (commentText.trim() === "") {
      toast.error("Please write a comment");
      return;
    }
    setIsLoading(true);
    try {
      const uid = auth.currentUser?.uid;
      const newComment = {
        uid,
        commentText,
        timestamp: new Date().toDateString(),
      };

      const docRef = doc(db, "blogs", firebaseID);
      await updateDoc(docRef, {
        comments: arrayUnion(newComment),
      });
      setComments((prevCommments) => [...prevCommments, newComment]);
      setCommentText("");
      toast.success("Comment added successfully!");
    } catch (e) {
      console.log(e);
      toast.error("Failed to add comment");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllComments = () => {
    const docRef = doc(db, "blogs", firebaseID);
    const unsub = onSnapshot(docRef, async (commentSnapShot) => {
      const allComments = commentSnapShot.data()?.comments || [];

      const commentWithUserInfo = await Promise.all(
        allComments.map(async (comment: { uid: string }) => {
          const docRef = doc(db, "users", comment.uid);
          const userDoc = await getDoc(docRef);
          return {
            ...comment,
            username: userDoc.exists() ? userDoc.data().userName : "Anonymous",
            imageURL: userDoc.exists()
              ? userDoc.data().imageURL
              : "/images/user.png",
          };
        })
      );
      setComments(commentWithUserInfo);
    });

    return () => {
      unsub();
    };
  };

  return (
    <>
      <button
        className="btn btn-primary text-white font-semibold"
        onClick={openModal}
      >
        Comments
      </button>
      {isModalOpen && (
        <div className="modal modal-open fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box relative border-slate-100 border-2">
            <button
              className="btn btn-sm btn-square btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg">Comments</h3>
            <div className="flex flex-col mt-5 gap-6">
              <div>
                <textarea
                  className="textarea textarea-primary w-full h-20 md:h-28"
                  placeholder="Enter Your Comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
                <button
                  onClick={addComment}
                  className="btn btn-primary w-full text-white font-semibold mt-2"
                >
                  Comment
                </button>
              </div>

              {isLoading && <Loader />}

              <div className="flex flex-col gap-4">
                {comments.length > 0 &&
                  comments.map(
                    ({ commentText, timestamp, imageURL, username }, index) => (
                      <div key={index + commentText} className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <div className="avatar">
                            <div className="w-11 rounded-full">
                              <Image
                                src={imageURL}
                                width={20}
                                height={20}
                                alt="user profile pic"
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col justify-center">
                            <h3 className="font-semibold">{username}</h3>
                            <h3 className="font-semibold text-[12px] text-[#6E6E6E]">
                              {timestamp}
                            </h3>
                          </div>
                        </div>

                        <div>
                          <p className="text-[16px] text-[#6E6E6E]">
                            {commentText}
                          </p>
                        </div>
                        <hr />
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
