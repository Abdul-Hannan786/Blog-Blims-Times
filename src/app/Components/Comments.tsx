"use client";

import { auth, db } from "@/Firebase/firebaseConfig";
import { arrayUnion, doc, DocumentData, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "./Loader";

const Comments = ({ firebaseID }: { firebaseID: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const fetchAllComments = () => {};

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

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    <h3 className="font-semibold">Username</h3>
                  </div>
                  <div>
                    <h3 className="font-semibold">Date of comment</h3>
                  </div>
                </div>
                <div>
                  <p className="text-[16px] text-[#6E6E6E]">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Voluptate architecto, commodi dolores unde magni, provident,
                    autem culpa sequi repellat aliquid modi incidunt aspernatur?
                    Reprehenderit pariatur aliquam doloremque aperiam
                  </p>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
