import * as React from "react";
import { useDispatch } from "react-redux";
import { setMember } from "./member";
import axios from "axios";

export const useUtil = async () => {
  const dispatch = useDispatch();
  const resetMember = {
    nickname: "",
    role: "",
    profileImg: "",
    sub: "",
  };

  const checkTokenExpiration = React.useCallback(() => {
    console.log("checkTokenExpiration 동작");
    let localAccessToken = localStorage.getItem("accessToken");
    let localRefreshToken = localStorage.getItem("refreshToken");
    const currentTime = Math.floor(new Date().getTime() / 1000);

    const accessTokenDecoded = JSON.parse(
      decodeURIComponent(
        window
          .atob(
            localAccessToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
          )
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      )
    );

    const refreshTokenDecoded = JSON.parse(
      decodeURIComponent(
        window
          .atob(
            localRefreshToken
              .split(".")[1]
              .replace(/-/g, "+")
              .replace(/_/g, "/")
          )
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      )
    );

    // accessToken 만료 확인.
    if (accessTokenDecoded.exp <= currentTime + 60) {
      // accessToken 만료
      if (refreshTokenDecoded.exp <= currentTime + 60) {
        // refreshToken 만료
        console.log("만료");
        
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/logout`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("refreshToken"),
            },
          })
          .then(() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch(setMember(resetMember));
            // window.location.replace("/login");
          });
      } else {
        // refresh 토큰 만료되지 않음. - 재발급
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/refresh-token`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("refreshToken"),
            },
          })
          .then((res) => {
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
          });
      }
    }
  });
  return {
    // useCheckTokenExpiration,
    checkTokenExpiration,
  }
};
