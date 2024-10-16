import React from "react";
import ReactMarkdown from "react-markdown";
const AddBlogForm = () => {
  return (
    <div className="flex flex-col p-7 xl:p-10 gap-5 mb-10">
      <h1 className="text-2xl font-bold text-center">Create a Blog</h1>
      <div className="flex gap-5 justify-center flex-col md:flex-row">
        <div className="shadow-2xl xl:w-[550px] w-full rounded-lg border-slate-100 border-2">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-[15px]">
                  Email
                </span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered input-primary w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-[15px]">
                  Upload Image
                </span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-[15px]">
                  Tag
                </span>
              </label>
              <select className="w-full input input-bordered input-primary rounded-lg">
                <option>Entertainment</option>
                <option>Blogging</option>
                <option>Education</option>
                <option>Coding</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-[15px]">
                  Content
                </span>
              </label>
              <textarea
                className="textarea textarea-primary w-full h-24 overflow-y-scroll"
                placeholder="Type blog content in markdown format"
              ></textarea>
            </div>
            <div className="mt-3">
              <button className="btn btn-primary w-full">Create Blog</button>
            </div>
          </form>
        </div>
        <div className="shadow-2xl rounded-lg xl:w-[550px] w-full max-h-96 border-slate-100 border-2">
          <div className="card-body">
            <label className="label">
              <span className="label-text font-semibold text-[15px]">
                Content Output
              </span>
            </label>
            <ReactMarkdown></ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlogForm;
