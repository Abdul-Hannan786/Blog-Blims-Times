import Image from "next/image";
import React from "react";

type AdminTableType = {
  title: string;
  imageURL: string;
  tag: string;
  index: number;
  createdDate: string;
  firebaseID: string;
  deleteFunc: (firebaseID: string) => void;
};

const AdminTable = ({
  title,
  imageURL,
  tag,
  index,
  createdDate,
  firebaseID,
  deleteFunc,
}: AdminTableType) => {
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
                width={50}
                height={50}
                className="object-cover w-12 h-12"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{title}</div>
            <div className="text-sm opacity-50">{createdDate}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="badge badge-primary font-semibold">{tag}</div>
      </td>
      <th>
        <button
          className="btn btn-error"
          onClick={() => {
            deleteFunc(firebaseID);
          }}
        >
          Delete <span className="hidden md:block">Blog</span>
        </button>
      </th>
      <th>
        <button className="btn btn-neutral">
          Edit <span className="hidden md:block">Blog</span>
        </button>
      </th>
    </tr>
  );
};

export default AdminTable;
