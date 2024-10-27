import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type AdminTableType = {
  title: string;
  imageURL: string;
  tag: string;
  index: number;
  createdDate: string;
  firebaseID: string;
  deleteFunc: (firebaseID: string) => void;
  slug: string;
};

const AdminTable = ({
  title,
  imageURL,
  tag,
  index,
  createdDate,
  firebaseID,
  deleteFunc,
  slug,
}: AdminTableType) => {
  const route = useRouter();

  const handleEdit = () => {
    route.push(`/admin/editblog/${slug}`);
  };
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <Image
                src={imageURL}
                alt="blog image"
                fill
                sizes="(max-width: 600px) 50px, 100px"
                className="object-cover w-full h-full"
                priority
                quality={100}
              />
            </div>
          </div>
          <div>
            <div className="font-bold line-clamp-2 w-28 sm:w-auto">{title}</div>
            <div className="text-sm opacity-50">{createdDate}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="badge badge-primary font-semibold p-3 text-white">
          {tag}
        </div>
      </td>
      <th>
        <button
          className="btn btn-error text-white"
          onClick={() => {
            deleteFunc(firebaseID);
          }}
        >
          Delete <span className="hidden md:block">Blog</span>
        </button>
      </th>
      <th>
        <button className="btn btn-neutral" onClick={handleEdit}>
          Edit <span className="hidden md:block">Blog</span>
        </button>
      </th>
    </tr>
  );
};

export default AdminTable;
