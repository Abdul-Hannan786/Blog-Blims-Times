import Link from "next/link";
import React from "react";

const Admin = () => {
  return (
    <div className="p-5">
      <Link href={"/admin/createblog"}>
        <button className="btn btn-primary">Create a blog</button>
      </Link>
    </div>
  );
};

export default Admin;
