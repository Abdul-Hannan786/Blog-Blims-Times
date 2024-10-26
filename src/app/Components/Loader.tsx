import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-1000">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
};

export default Loader;
