import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Background from "../components/Background";
import { useDispatch, useSelector } from "react-redux";
import { setMember } from "../modules/member";

const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const member = useSelector(state => state.member);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const executeLogin = async (e) => {
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/login`, {
        username: id,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        alert("로그인 완료");
        const at = localStorage.getItem("accessToken");
        console.log(at);
        //디스패치 코드 위치
        const accessTokenDecoded = JSON.parse(
          decodeURIComponent(
            window
              .atob(at.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
              .split("")
              .map((c) => {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          )
        );

        
        window.location.replace("/");
        // navigate("/", {replace: true});
      })
      .catch((error) => {
        alert(error.response.data.errorMessage);
      });
  };

  return (
    <div>
      <Background />

      <div className="flex flex-col justify-center px-[40px] rounded-xl shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 backdrop-invert backdrop-opacity-10 w-[400px] h-[500px]">
        <h1 className="drop-shadow-[0_2px_2px_rgba(0,0,0)] mb-10 text-3xl text-white font-['SejonghospitalBold'] text-center">
          새로운 경험! 즐거운 경험!
        </h1>
        <input
          className="border-neutral-300 rounded-t-md p-2 border-x border-t border-b"
          type="text"
          placeholder="ID"
          onChange={handleInputChange(setId)}
        />
        <input
          className="border-neutral-300 rounded-b-md p-2 border-x border-b"
          type="password"
          placeholder="PASSWORD"
          onChange={handleInputChange(setPassword)}
        />
        <button
          onClick={executeLogin}
          className="tracking-widest mt-5 rounded-md bg-sky-500 hover:bg-sky-600"
        >
          로그인
        </button>
        <Link
          className="hover:underline underline-offset-4 text-center mt-1 font-bold text-xs"
          to="/register"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
