import { Box, Sheet, Table, Typography, Button } from "@mui/joy";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";


const AdminMember = () => {
  const [members, setMembers] = useState([]);

  const fetchData = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/member-login-list`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setMembers(res.data);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = (id) => {
    const data = {
      id : id
    };
    axios.post(`${process.env.REACT_APP_BASE_URL}/forced-logout`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then(() => {
      setMembers(members.filter(member => member !== id));
    })
  };

  return (
    <Box
      sx={{
        pt: "calc(12px + var(--Header-height))",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        px: 6,
        height: "100dvh",
      }}
    >
      <Typography level="h3">로그인 회원</Typography>
      <Sheet
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
          my: 3,
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
              <th>회원 ID</th>
              <th style={{ width: "144px" }}></th>
            </tr>
          </thead>
          <tbody>
            {members.map((e) => (
              <tr key={e}>
                <td style={{ textAlign: "center" }}>{e}</td>
                <td>
                  <Button size="sm" variant="soft" color="danger" onClick={() => handleLogout(e)}>
                    로그아웃
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
};

export default AdminMember;
