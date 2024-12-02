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
    setIsLoading(true);
    try {
      const docRef = doc(db, "blogs", firebaseID);
      const unsub = onSnapshot(docRef, async (commentSnapShot) => {
        const allComments = commentSnapShot.data()?.comments || [];

        const commentPromises = allComments.map(
          async (comment: { uid: string }) => {
            const docRef = doc(db, "users", comment.uid);
            const userDoc = await getDoc(docRef);
            return {
              ...comment,
              username: userDoc.exists() && userDoc.data().userName,
              imageURL: userDoc.exists() && userDoc.data().imageURL,
            };
          }
        );

        const commentWithUserInfo = await Promise.all(commentPromises);
        setComments(commentWithUserInfo);
      });

      return () => {
        unsub();
      };
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
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

              {isLoading && (
                <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
              )}

              <div className="flex flex-col gap-4">
                {comments.length > 0 ? (
                  comments.map(
                    ({ commentText, timestamp, imageURL, username }, index) => (
                      <div
                        key={index + commentText}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center gap-2">
                          <div className="avatar">
                            <div className="w-11 rounded-full">
                              <Image
                                src={imageURL ?? "/images/user.png"}
                                width={44}
                                height={44}
                                alt="user profile pic"
                                className="object-contain w-full"
                                quality={100}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col justify-center">
                            <h3 className="font-semibold text-neutral">
                              {username ?? "Anonymous"}
                            </h3>
                            <h3 className="text-[12px] text-neutral">
                              {timestamp}
                            </h3>
                          </div>
                        </div>

                        <div>
                          <p className="text-[16px] text-neutral">
                            {commentText}
                          </p>
                        </div>
                        <hr />
                      </div>
                    )
                  )
                ) : (
                  <div>
                    <h1 className="text-center">No Comments</h1>
                  </div>
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
