import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Schedule from "../components/Schedule";
import axios from "axios";
import { FormControl, FormLabel, Input } from "@mui/joy";

const MainPage = () => {
  const [notices, setNotices] = useState([]);
  const [reviews, setReviews] = useState([]);

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/notice/recent?size=3`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setNotices(res.data);
      });

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/review/today`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setReviews(res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        px: { xs: 2, md: 6 },
        pt: {
          xs: "calc(12px + var(--Header-height))",
          sm: "calc(12px + var(--Header-height))",
          md: 3,
        },
        pb: { xs: 2, sm: 2, md: 3 },
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        height: "100dvh",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="sm" />}
          sx={{ pl: 0 }}
        >
          <Link underline="none" color="primary" href="/" aria-label="Home">
            <HomeRoundedIcon />
            <Typography fontWeight={500} fontSize={12}>
              Home
            </Typography>
          </Link>
        </Breadcrumbs>
      </Box>

      <Box
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" component="h1">
          Home
        </Typography>
      </Box>

      <Box>
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: "sm",
            gridColumn: "1/-1",
            display: "flex",
          }}
        >
          <Table
            hoverRow
            size="sm"
            borderAxis="none"
            variant="soft"
            sx={{
              "--TableCell-paddingX": "1rem",
              "--TableCell-paddingY": "1rem",
            }}
          >
            <thead>
              <tr>
                <th>
                  <Typography level="title-sm" sx={{ fontWeight: "bold" }}>
                    제목
                  </Typography>
                </th>
                <th>
                  <Typography level="title-sm">날짜</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice, idx) => (
                <tr key={`notice-${idx}`}>
                  <td>
                    <Typography
                      level="title-sm"
                      component={Link}
                      href={`/notice/${notice.id}`}
                    >
                      {notice.title}
                    </Typography>
                  </td>
                  <td>
                    <Typography level="body-sm">
                      {notice.createdDate.split("T")[0]}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </Box>

      {/* PC */}
      <Typography level="h2">오늘 복습</Typography>
      <Sheet
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
            th: {
              textAlign: "center",
              padding: "12px 6px",
            },
          }}
        >
          <thead>
            <tr>
              <th>제목</th>
              <th>횟수</th>
              <th>처음 날짜</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((e, i) => (
              <tr key={`review-${e.id}`}>
                <td>
                  <Typography
                    level="title-sm"
                    component={Link}
                    href={`/voca/review/${e.id}`}
                  >
                    {e.vocaTitle}
                  </Typography>
                </td>
                <td style={{textAlign: "center"}}>{e.count}</td>
                <td style={{textAlign: "center"}}>{e.createdDate.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
};

export default MainPage;
