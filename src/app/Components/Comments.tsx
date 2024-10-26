"use client";

import { auth, db } from "@/Firebase/firebaseConfig";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";

const Comments = ({ firebaseId }: { firebaseId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<DocumentData>();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchUser = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const docRef = doc(db, "users", uid);
    const user = await getDoc(docRef);
    const userData = user.data();
    setUser(userData);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <button
        className="btn btn-primary text-white font-semibold"
        onClick={openModal}
      >
        See comments
      </button>
      {isModalOpen && (
        <div className="modal modal-open fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="modal-box relative border-slate-100 border-2">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
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
                ></textarea>
                <button className="btn btn-primary w-full text-white font-semibold mt-2">
                  Commment
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <Image
                        src={user?.imageURL ?? "/images/user.png"}
                        width={20}
                        height={20}
                        alt="user [rofile pic"
                      />
                    </div>
                  </div>
                  <h3 className="font-semibold">{user?.userName}</h3>
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
