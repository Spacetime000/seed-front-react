import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Navbar = () => {
  const role = useSelector((state) => state.member.role);
  return (
    <div className="hidden sm:flex justify-center items-center w-full min-h-[50px] text-white bg-sky-600">
      <ul className="sm:flex w-full justify-around items-center font-bold">
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/notice">공지사항</Link>
        </li>
        <li>
          <Link to="/login">문제은행</Link>
        </li>
        <li>
          <Link to="/login">단어은행</Link>
        </li>
        {(role === "ROLE_ADMIN") && (
          <li>
            <Link to="/login">관리자 페이지</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
