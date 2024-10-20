"use client";

import { useState } from "react";

const Profile = () => {
    
    const [name, setName] = useState("")
    const [contactInfo, setContactInfo] = useState("")
    const [hobbies, setHobbies] = useState("")
    const [DOB, setDOB] = useState("")
    const [bio, setBio] = useState("")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [picture, setPicture] = useState<File | null>(null)

    const updateProfile = () => {
        
    }

  return (
    <div className="flex items-center justify-center p-6 md:p-10">
      <div className="max-w-4xl w-full shadow-2xl rounded-xl p-5 lg:p-8 border-slate-100 border-2 mb-10">
        <div className="avatar flex justify-center">
          <div className="w-24 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="form-control mt-5">
          <label className="label cursor-pointer" htmlFor="file">
            <span className="label-text font-semibold text-[15px]">
              Upload Image
            </span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered file-input-primary w-full"
            id="file"
            onChange={(e) => {setPicture(e.target.files?.[0] ?? null)}}
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
              onChange={(e) => {setName(e.target.value)}}
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
              onChange={(e) => {setContactInfo(e.target.value)}}
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
              onChange={(e) => {setHobbies(e.target.value)}}
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
              onChange={(e) => {setDOB(e.target.value)}}
            />
          </div>
        </div>
        <div className="form-control mt-5">
          <label className="label cursor-pointer" htmlFor="content">
            <span className="label-text font-semibold text-[15px]">
              Bio
            </span>
          </label>
          <textarea
            className="textarea textarea-primary input input-primary w-full h-24 md:h-32"
            placeholder="Bio"
            id="content"
            value={bio}
            onChange={(e) => {setBio(e.target.value)}}
          ></textarea>
        </div>
        <div className="mt-5">
          <button className="btn btn-primary w-full" onClick={updateProfile}>
            update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
