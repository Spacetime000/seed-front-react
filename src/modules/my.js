import axios from "axios";
import { setMember } from "./member";
import { Navigate } from "react-router-dom";

export function jwtPayLoad(token) {
  try {
    return JSON.parse(
      decodeURIComponent(
        window.atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
          .split('')
          .map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      )
    );
  } catch (err) {
    return "";
  }
}

export const refreshToken = async (refreshToken) => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/refresh-token`, {
    headers: {
      Authrization: "Bearer " + refreshToken,
    },
  });

  return response.data;
}

export async function checkTokenExpiration() {
  console.log("checkTokenExpiration 동작됨.")
  let localAccessToken = localStorage.getItem('accessToken');
  let localRefreshToken = localStorage.getItem("refreshToken");
  // if (!localAccessToken && !localRefreshToken) {
  //   window.location.replace("/login");
  //   <Navigate to = "/login" />
  //   return;
  // }

  const currentTime = Math.floor(new Date().getTime() / 1000);
  // const resetMember = {
  //   nickname: "",
  //   role: "",
  //   profileImg: "",
  //   sub: "",
  // };

  const accessTokenDecoded = JSON.parse(
    decodeURIComponent(
      window.atob(localAccessToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    )
  );

  const refreshTokenDecoded = JSON.parse(
    decodeURIComponent(
      window.atob(localRefreshToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    )
  );

  // accessToken 만료 확인.
  if (accessTokenDecoded.exp <= currentTime + 60) { // accessToken 만료
    if (refreshTokenDecoded.exp <= currentTime + 60) { // refreshToken 만료
      axios.get(`${process.env.REACT_APP_BASE_URL}/logout`, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('refreshToken') }
      })
        .then(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          //디스패치
          // dispatch(setMember(resetMember));
          //로그인 페이지 강제이동
          window.location.replace("/login");
          return;
          // <Navigate to = "/login" />
        })
    } else { // refresh 토큰 만료되지 않음. - 재발급
      axios.get(`${process.env.REACT_APP_BASE_URL}/refresh-token`, {
        headers: { 'Authorization': "Bearer " + localStorage.getItem('refreshToken') }
      })
        .then((res) => {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
        })
    }
  }

}