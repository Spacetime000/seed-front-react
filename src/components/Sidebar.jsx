import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Profile from "./Profile";
import { setMember } from "../modules/member";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import { closeSidebar } from "../utils";
import IconButton from "@mui/joy/IconButton";
import IcecreamRoundedIcon from "@mui/icons-material/IcecreamRounded";
import Typography from "@mui/joy/Typography";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ListItemContent from "@mui/joy/ListItemContent";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import List from "@mui/joy/List";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import AbcRoundedIcon from "@mui/icons-material/AbcRounded";
import Divider from "@mui/joy/Divider";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Link from "@mui/joy/Link";
import axios from "axios";
import { useLocation } from "react-router-dom";
import DisplaySettingsRoundedIcon from "@mui/icons-material/DisplaySettingsRounded";

import ColorSchemeToggle from "./ColorSchemeToggle";

function Toggler({ defaultExpanded = false, renderToggle, children }) {
  const [open, setOpen] = React.useState(defaultExpanded);

  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

const Sidebar = () => {
  const member = useSelector((state) => state.member);
  const currentRoute = useLocation().pathname;

  const resetMember = {
    nickname: "",
    role: "",
    profileImg: "",
    sub: "",
  };
  const dispatch = useDispatch();

  function logout() {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/logout`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("refreshToken"),
        },
      })
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // dispatch(setMember(resetMember));
        window.location.reload(true);
      });
  }
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton variant="soft" color="primary" size="sm">
          <IcecreamRoundedIcon />
        </IconButton>
        <Typography level="title-lg">Seed Oasis</Typography>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem component={Link} href="/">
            <ListItemButton selected={currentRoute.endsWith("/")}>
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Home</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem component={Link} href="/notice">
            <ListItemButton selected={currentRoute.includes("notice")}>
              <NotificationsActiveRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" sx={{ fontWeight: "bold" }}>
                  공지
                </Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem component={Link} href="/quiz">
            <ListItemButton selected={currentRoute.includes("quiz")}>
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" sx={{ fontWeight: "bold" }}>
                  문제
                </Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem component={Link} href="/voca">
            <ListItemButton selected={currentRoute.includes("voca")}>
              <AbcRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" sx={{ fontWeight: "bold" }}>
                  단어
                </Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <PeopleRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm" sx={{ fontWeight: "bold" }}>
                      내정보
                    </Typography>
                  </ListItemContent>
                  <KeyboardArrowDownRoundedIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton>프로필 이미지 변경</ListItemButton>
                </ListItem>
                <ListItem component={Link} href="/quiz/my-page">
                  <ListItemButton>
                    <Typography level="title-sm">내가 작성한 문제</Typography>
                    </ListItemButton>
                </ListItem>
                <ListItem component={Link} href="/voca/my-page">
                  <ListItemButton>
                    <Typography level="title-sm">단어 관리</Typography>
                    </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          {member.role === "ROLE_ADMIN" && (
            <ListItem component={Link} href="/admin">
              <ListItemButton>
                <DisplaySettingsRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm" sx={{ fontWeight: "bold" }}>
                    관리자 메뉴
                  </Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Profile
          imgSrc={`${process.env.REACT_APP_BASE_URL}${member.profileImg}`}
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm" sx={{ fontWeight: "bold" }}>
            {member.nickname}
          </Typography>
          <Typography level="body-xs">{member.sub}</Typography>
        </Box>
        <IconButton onClick={logout} size="sm" variant="plain" color="neutral">
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
};

export default Sidebar;
