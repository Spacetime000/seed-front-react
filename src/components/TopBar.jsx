import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GiOasis } from "react-icons/gi";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";

const TopBar = () => {
  const [nav, setNav] = useState(false);
  const [menu, setMenu] = useState(false);

  const profileImg = useSelector((state) => state.member.profileImg);
  const role = useSelector((state) => state.member.role);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="flex justify-between px-4 py-2">
      {/* Logo START*/}
      <div className="flex items-center">
        <GiOasis size={40} className="text-[#067EDB] mr-2" />
        <h1 className="hidden sm:inline text-3xl font-bold text-[#067EDB] font-['YClover-Bold']">
          Seed Oasis
        </h1>
      </div>
      {/* Logo END */}

      <div className="flex items-center">
        {localStorage.getItem("accessToken") && (
          <div onClick={handleMenu}>
            <Profile
              className="cursor-pointer mr-2 w-[50px] h-[50px] drop-shadow-[0_2px_2px_rgba(0,0,0)]"
              imgSrc={`${process.env.REACT_APP_BASE_URL}${profileImg}`}
            />
            <AccountMenu menu={menu} />
          </div>
          
        )}
        {/* 햄버거 아이콘 */}
        <div className="sm:hidden" onClick={handleNav}>
          <FaBars size={30} className="cursor-pointer" />
        </div>
      </div>
      

      {/* 모바일 메뉴 */}
      <div
        onClick={handleNav}
        className={
          nav
            ? "z-10 overflow-y-hidden sm:hidden ease-in duration-300 absolute text-gray-300 left-0 top-0 w-full h-screen bg-black/80"
            : "absolute top-0 h-screen left-[-100%] ease-in duration-500"
        }
      >
        <ul className="h-full w-full text-center pt-12 font-bold">
          <li className="text-2xl py-8 hover:bg-white/50">
            <Link to="/">홈</Link>
          </li>
          <li className="text-2xl py-8 hover:bg-white/50">
            <Link to="/notice">공지사항</Link>
          </li>
          <li className="text-2xl py-8 hover:bg-white/50">
            <Link to="/login">문제은행</Link>
          </li>
          <li className="text-2xl py-8 hover:bg-white/50">
            <Link to="/login">단어은행</Link>
          </li>
          {role === "ROLE_ADMIN" && (
            <li className="text-2xl py-8 hover:bg-white/50">
              <Link to="/login">관리자 페이지</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
