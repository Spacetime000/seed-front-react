import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import { Navigate, Route, Routes } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import MainPage from "./pages/MainPage";
import NoticePage from "./pages/NoticePage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setMember } from "./modules/member";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Link from "@mui/joy/Link";
import Typography from '@mui/joy/Typography';
import {checkTokenExpiration} from "./modules/my";
import Notice from "./components/Notice";
import NoticeEdit from "./components/NoticeEdit";
import Quiz from "./components/quiz/Quiz";
import QuizWrite from "./components/quiz/QuizWrite";
import QuizMain from "./components/quiz/QuizMain";
import Admin from "./components/admin/Admin";
import QuizCategory from "./components/quiz/QuizCategory";
import QuizMyPage from "./components/quiz/QuizMyPage";
import VocaCreate from "./components/voca/VocaCreate";
import Voca from "./components/voca/Voca";
import VocaList from "./components/voca/VocaList";
import VocaMeaning from "./components/voca/VocaMeaning";
import VocaSpelling from "./components/voca/VocaSpelling";
import VocaTest from "./components/voca/VocaTest";
import VocaEdit from "./components/voca/VocaEdit";
import VocaMyPage from "./components/voca/VocaMyPage";
import VocaReview from "./components/voca/VocaReview";
import Meaning from "./components/voca/Meaning";
import Spelling from "./components/voca/Spelling";
import Test from "./components/voca/Test";
import AdminMember from "./components/admin/AdminMember";

function App() {
  const [name, setName] = useState("");
  const resetMember = {
    nickname: "",
    role: "",
    profileImg: "",
    sub: ""
  }
  const dispatch = useDispatch();

  useEffect(() => {
    //정리해서 다시 작성 할 것. (제거해서 다른 방식 커스텀 훅 작성할 것.)
    //완료-> 회원정보 생성 -> 자식 -> 아래 컴포넌트 , 구조 정리
    //처음 접속시 체크
    let localAccessToken = localStorage.getItem('accessToken');
    // checkTokenExpiration(dispatch);
    if (localAccessToken) { //로그인 상태( 만료 체크 X)
      let accessToken = localAccessToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');

      let accessTokenDecoded = JSON.parse(
        decodeURIComponent(
          window.atob(accessToken)
            .split('')
            .map((c) => {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        )
      );

      const currentTime = Math.floor(new Date().getTime() / 1000);

      if (accessTokenDecoded.exp <= currentTime + 60) { //1. accessToken 만료 시 재발급 요청 전 refreshToken의 만료 여부 체크
        const refreshToken = localStorage.getItem('refreshToken').split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        const refreshTokenDecoded = JSON.parse(
          decodeURIComponent(
            window.atob(refreshToken)
              .split('')
              .map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join('')
          )
        );

        if (refreshTokenDecoded.exp >= currentTime + 60) {//2.refresh 토큰 만료 X, accessToken 재발급
          axios.get(`${process.env.REACT_APP_BASE_URL}/refresh-token`, {
            headers: { 'Authorization': "Bearer " + localStorage.getItem('refreshToken') }
          })
            .then((res) => {
              localStorage.setItem("accessToken", res.data.accessToken);
              localStorage.setItem("refreshToken", res.data.refreshToken);
              // window.location.replace("/");
            })
        } else { //3. refreshToken이 만료됨. 로그아웃 처리(localStorege 제거)
          axios.get(`${process.env.REACT_APP_BASE_URL}/logout`, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('refreshToken') }
          })
            .then(() => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              //디스패치
              dispatch(setMember(resetMember));
              window.location.replace("/login");
            })
        }
      }
      //디스패치
      accessToken = localStorage.getItem('accessToken').split('.')[1].replace(/-/g, '+').replace(/_/g, '/');

      accessTokenDecoded = JSON.parse(
        decodeURIComponent(
          window.atob(accessToken)
            .split('')
            .map((c) => {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        )
      );

      const member = {
        nickname: accessTokenDecoded.nickname,
        role: accessTokenDecoded.role,
        profileImg: accessTokenDecoded.profileImg,
        sub: accessTokenDecoded.sub
      }
      dispatch(setMember(member));
      setName(member.sub);
    }
  }, []);

  return (
    <>
      {!localStorage.getItem("accessToken") ? (
        <Routes>
          <Route path="/register" element={<JoinPage />} />
          <Route path='/*' element={<LoginPage />} />
        </Routes>
      ) : (
        <CssVarsProvider disableTransitionOnChange>
          <CssBaseline />
          <Box sx={{ display: "flex", minHeight: "100dvh" }}>
            <Header />
            <Sidebar />

            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/notice" element={<NoticePage />} />
              <Route path="/notice/:noticeId" element={<Notice />} />
              <Route path="/notice/:noticeId/edit" element={<NoticeEdit />} />
              <Route path="/quiz" element={<QuizMain />} />
              <Route path="/quiz/:quizId/write" element={<QuizWrite />} />
              <Route path="/quiz/:quizId" element={<Quiz />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/member" element={<AdminMember />} />
              <Route path="/admin/quiz/category" element={<QuizCategory />} />
              <Route path="/quiz/my-page" element={<QuizMyPage />} />
              <Route path="/voca" element={<VocaList />} />
              <Route path="/voca/write" element={<VocaCreate />} />
              <Route path="/voca/edit/:vocaId" element={<VocaEdit />} />
              <Route path="/voca/:vocaId" element={<Voca name={name} />} />
              <Route path="/voca/meaning/:vocaId" element={<VocaMeaning />} />
              <Route path="/voca/spelling/:vocaId" element={<VocaSpelling />} />
              <Route path="/voca/test/:vocaId" element={<VocaTest />} />
              <Route path="/voca/my-page" element={<VocaMyPage />} />
              <Route path="/voca/review/:id" element={<VocaReview />} />
              <Route path="/voca/review/meaning/:id" element={<Meaning />} />
              <Route path="/voca/review/spelling/:id" element={<Spelling />} />
              <Route path="/voca/review/test/:id" element={<Test />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </Box>
        </CssVarsProvider>
      )}

    </>
  );
}

export default App;
