"use client";

import { saveBlog } from "@/Firebase/firebaseFirestore";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";

const AddBlogForm = () => {
  const [title, setTitle] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [file, setFile] = useState<File>();
  const [tag, setTag] = useState("Entertainment");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  const makeSlug = (title: string) => {
    return title
      .toLowerCase() // Convert to lowercase
      .trim() // Remove spaces from the start and end
      .replace(/[^a-z0-9\s-]/g, "") // Remove any non-alphanumeric characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-");
  };

  const createBlog = async (event: FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    if (title.trim() === "" || !file || content.trim() === "") {
      toast.error("Please fill all the fields");
      return;
    }
    setIsLoading(true); // Show loader
    try {
      const slug = makeSlug(title);
      await saveBlog({
        title,
        file,
        tag,
        content,
        slug,
        createdDate: new Date().toDateString(),
      });
      route.push("/admin");
    } catch (error) {
      toast.error(`Couldn't add blog! ${error}`);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  return (
    <div className="relative flex flex-col p-7 xl:p-10 gap-5 mb-10">
      <h1 className="text-2xl font-bold text-center">Create a Blog</h1>

      <div className="flex gap-5 justify-center flex-col md:flex-row">
        {/* Blog form */}
        <div className="shadow-2xl xl:w-[550px] w-full rounded-lg border-slate-100 border-2">
          <form className="card-body">
            <div className="form-control">
              <label className="label cursor-pointer" htmlFor="title">
                <span className="label-text font-semibold text-[15px]">
                  Title
                </span>
              </label>
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered input-primary w-full"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label cursor-pointer" htmlFor="file">
                <span className="label-text font-semibold text-[15px]">
                  Upload Image
                </span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full"
                id="file"
                onChange={(e) => setFile(e.target.files?.[0])}
              />
            </div>
            <div className="form-control">
              <label className="label cursor-pointer" htmlFor="tag">
                <span className="label-text font-semibold text-[15px]">
                  Tag
                </span>
              </label>
              <select
                className="w-full input input-bordered input-primary rounded-lg"
                id="tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              >
                <option value={"Entertainment"}>Entertainment</option>
                <option value={"Blogging"}>Blogging</option>
                <option value={"Education"}>Education</option>
                <option value={"Coding"}>Coding</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer" htmlFor="content">
                <span className="label-text font-semibold text-[15px]">
                  Content
                </span>
              </label>
              <textarea
                className="textarea textarea-primary input input-primary w-full h-24"
                placeholder="Type blog content in markdown format"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className="mt-3">
              <button className="btn btn-primary w-full" onClick={createBlog}>
                Create Blog
              </button>
            </div>
          </form>
        </div>

        {/* Content preview */}
        <div className="shadow-2xl overflow-y-scroll rounded-lg xl:w-[550px] w-full max-h-[30rem] border-slate-100 border-2">
          <div className="card-body">
            <label className="label">
              <span className="label-text font-semibold text-[18px] font-sans">
                Content Output
              </span>
            </label>
            <div className="p-2 h-full">
              <ReactMarkdown className="w-full rounded-lg prose">
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      {/* Loader and Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
         <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}
    </div>
  );
};

export default AddBlogForm;
