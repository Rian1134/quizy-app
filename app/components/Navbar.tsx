"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="navbar">
      <Link href="#">
        <h3 className="text-2xl font-bold hover:scale-110 transition-all">
          Quizy
        </h3>
      </Link>

      <ul className="hidden sm:flex items-center font-bold text-lg gap-5">
        <li>
          <Link href="#" className="nav-link">
            <i className="bi bi-house-fill me-2"></i>
            Home
          </Link>
        </li>
        <li>
          <Link href="#" className="nav-link">
            <i className="bi bi-question-circle-fill me-2"></i>
            Quiz
          </Link>
        </li>
        <li>
          <Link href="#" className="nav-link">
            <i className="bi bi-plus-circle-fill me-2"></i>
            Create
          </Link>
        </li>
      </ul>
      <i
        className="bi bi-list text-3xl font-extrabold sm:hidden block hover:bg-white hover:text-indigo-600 rounded-md px-2 cursor-pointer z-50 relative"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      ></i>
      <div
        className={`nav-menu ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
        style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
      >
        <li className="nav-list">
          <Link href="/">Home</Link>
        </li>
        <li className="nav-list">
          <Link href="#">Quiz</Link>
        </li>
        <li className="nav-list">
          <Link href="#">Create</Link>
        </li>
      </div>
    </header>
  );
};

export default Navbar;
