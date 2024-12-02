import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full footer footer-center bg-primary text-base-content p-4 font-semibold">
      <aside>
        <p className="text-white text-[16px]">
          Copyright © {new Date().getFullYear()} - All right reserved by <span className="text-green-200 cursor-pointer">Abdul Hannan</span>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
