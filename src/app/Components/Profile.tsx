"use client";

import { auth, db } from "@/Firebase/firebaseConfig";
import { UpdateProfile } from "@/Firebase/firebaseFirestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { useAuthContext } from "@/Context/AuthContext";

const Profile = () => {
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [DOB, setDOB] = useState("");
  const [bio, setBio] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [profilePic, setProfilePiic] = useState("");
  const [isLoading, setIsLoadinng] = useState(false);
  const { user } = useAuthContext()!;
  const route = useRouter();

  const updateProfile = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (
      name?.trim() === "" ||
      contactInfo?.trim() === "" ||
      hobbies?.trim() === "" ||
      DOB?.trim() === "" ||
      bio?.trim() === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    const fileSizeLimit = 2 * 1024 * 1024; // 2MB
    if (picture && picture.size > fileSizeLimit) {
      toast.error("File size should be less than 2MB");
      return;
    }
    setIsLoadinng(true);
    try {
      await UpdateProfile({
        userName: name,
        contactInfo,
        hobbies,
        DOB,
        bio,
        file: picture,
      });
      route.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Couldn't update the profile");
    } finally {
      {
        setIsLoadinng(false);
      }
    }
  };

  const fetchUser = async () => {
    const uid = auth.currentUser?.uid;
    setIsLoadinng(true);
    try {
      const collectionRef = collection(db, "users");
      const condition = where("uid", "==", uid);
      const q = query(collectionRef, condition);
      const userSnapShot = await getDocs(q);
      userSnapShot.forEach((doc) => {
        const { userName, contactInfo, hobbies, DOB, bio, imageURL } =
          doc.data();
        setName(userName ?? "");
        setContactInfo(contactInfo ?? "");
        setHobbies(hobbies ?? "");
        setDOB(DOB ?? "");
        setBio(bio ?? "");
        setProfilePiic(imageURL ?? "");
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadinng(false);
    }
  };

  useEffect(() => {
    if (!user) {
      toast.error("authenticate to view your profile !");
      route.push("/signin");
      return;
    }
    fetchUser();
  }, [user, route]);

  return (
    <div className="flex items-center justify-center p-6 md:p-10 flex-col gap-5">
      <h1 className="text-3xl font-bold">Update Profile</h1>
      <div className="max-w-4xl w-full shadow-2xl rounded-xl p-5 lg:p-8 border-slate-100 border-2 mb-10">
        {profilePic && (
          <div className="avatar flex justify-center">
            <div className="w-28 rounded-full">
              <Image
                src={profilePic}
                alt="profile-pic"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        <div className="form-control mt-5">
          <label className="label cursor-pointer" htmlFor="file">
            <span className="label-text font-semibold text-[15px]">
              Upload Image (Optional)
            </span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered file-input-primary w-full"
            id="file"
            onChange={(e) => {
              setPicture(e.target.files?.[0] ?? null);
            }}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3 md:gap-5">
          <div className="form-control mt-5">
            <label className="label cursor-pointer" htmlFor="title">
              <span className="label-text font-semibold text-[15px]">
                Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered input-primary w-full"
              id="title"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="form-control mt-5">
            <label className="label cursor-pointer" htmlFor="title">
              <span className="label-text font-semibold text-[15px]">
                Phone Number
              </span>
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              className="input input-bordered input-primary w-full"
              id="title"
              value={contactInfo}
              onChange={(e) => {
                setContactInfo(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3 md:gap-5">
          <div className="form-control mt-5">
            <label className="label cursor-pointer" htmlFor="title">
              <span className="label-text font-semibold text-[15px]">
                Interest | Hobbies
              </span>
            </label>
            <input
              type="text"
              placeholder="Interest | Hobbies"
              className="input input-bordered input-primary w-full"
              id="title"
              value={hobbies}
              onChange={(e) => {
                setHobbies(e.target.value);
              }}
            />
          </div>
          <div className="form-control mt-5">
            <label className="label cursor-pointer" htmlFor="title">
              <span className="label-text font-semibold text-[15px]">
                Date Of Birth
              </span>
            </label>
            <input
              type="date"
              className="input input-bordered input-primary w-full"
              id="title"
              value={DOB}
              onChange={(e) => {
                setDOB(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-control mt-5">
          <label className="label cursor-pointer" htmlFor="content">
            <span className="label-text font-semibold text-[15px]">Bio</span>
          </label>
          <textarea
            className="textarea textarea-primary input input-primary w-full h-24 md:h-32"
            placeholder="Bio"
            id="content"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="mt-5">
          <button className="btn btn-primary w-full" onClick={updateProfile}>
            update Profile
          </button>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Profile;
