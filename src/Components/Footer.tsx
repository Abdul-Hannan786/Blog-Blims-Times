import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full footer footer-center bg-primary text-base-content p-4 font-semibold">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by <span className="text-white cursor-pointer">Abdul Hannan</span>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
