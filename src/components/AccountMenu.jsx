import React, { useState } from "react";
import { FaHouseUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setMember } from "../modules/member";

const AccountMenu = (props) => {
  const List = styled.li`
    padding: 10px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 10px;
    &:hover {
      color: rgba(0, 200, 255, 1);
      background-color: rgba(0, 0, 0, 0.05);
    }
  `;
  const { menu } = props;
  const sub = useSelector((state) => state.member.sub);
  const nickname = useSelector((state) => state.member.nickname);
  const dispatch = useDispatch();

  const logout = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/logout`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("refreshToken"),
        },
      })
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(
          setMember({
            nickname: "",
            role: "",
            profileImg: "",
            sub: "",
          })
        );
        window.location.replace("/login");
      });
  };
  return (
    <div
      className={`${
        menu ? "animate-menu_in" : "animate-menu_out"
      } shadow-md rounded-2xl absolute right-[10px] z-20 py-3 px-5 bg-white w-[200px]`}
    >
      <h1 className="text-center text-lg font-bold pt-5 text-slate-600">
        {nickname}
      </h1>
      <h2 className="text-gray-400 text-center text-xs pb-5">{sub}</h2>
      <ul>
        <List>
          <FaHouseUser />
          <Link to="/">My Page</Link>
        </List>
        <List>
          <IoIosLogOut />
          <Link onClick={logout}>Logout</Link>
        </List>
      </ul>
    </div>
  );
};

export default AccountMenu;
