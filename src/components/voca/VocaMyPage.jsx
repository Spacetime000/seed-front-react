import { Box, Sheet, Table, Typography, Button } from "@mui/joy";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VocaMyPage = () => {
  const [todo, setTodo] = useState([]);
  const [review, setReview] = useState([]);

  const handleDeleteButton = (i, id) => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios.delete(`${process.env.REACT_APP_BASE_URL}/review/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }).then(() => {
        setReview((prev) => {
          const newArray = [...prev];
          newArray.splice(i, 1);
          return newArray;
        });
      });
      
    }
  };

  const fetchData = useCallback(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/review/priorToToday`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
    .then((res) => {
      setTodo(res.data);
    });

    axios.get(`${process.env.REACT_APP_BASE_URL}/review`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
    .then((res) => {
      setReview(res.data);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box
      sx={{
        width: "100%",
        pt: "calc(12px + var(--Header-height))",
        px: 6,
        marginBottom: 3,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100vh",
      }}
    >
      <Box maxHeight="50vh">
        <Typography level="h1">TO DAY</Typography>
        <Sheet
          variant="outlined"
          sx={{
            width: "100%",
            borderRadius: "sm",
            flexShrink: 1,
            overflow: "auto",
            minHeight: 0,
            my: 2,
          }}
        >
          <Table
            stickyHeader
            hoverRow
            size="sm"
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
              td: {
                textAlign: "center"
              }
            }}
          >
            <thead>
              <tr>
                <th>복습 날짜</th>
                <th>횟수</th>
                <th>제목</th>
              </tr>
            </thead>
            <tbody>
                {todo.map((e, idx) => (
                  <tr key={`todo+${idx}`}>
                    <td>{e.reviewDate}</td>
                    <td>{e.count}</td>
                    <td><Link to={`/voca/review/${e.id}`}>{e.vocaTitle}</Link></td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Sheet>
      </Box>
      <Box maxHeight="50vh">
        <Typography level="h1">전체 조회</Typography>
        <Sheet
          variant="outlined"
          sx={{
            width: "100%",
            borderRadius: "sm",
            flexShrink: 1,
            overflow: "auto",
            minHeight: 0,
            my: 2,
          }}
        >
          <Table
            stickyHeader
            hoverRow
            size="sm"
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
              td: {
                textAlign: "center"
              }
            }}
          >
            <thead>
              <tr>
                <th>복습 날짜</th>
                <th>횟수</th>
                <th>제목</th>
                <th>처음 날짜</th>
                <th style={{width: "144px"}} />
              </tr>
            </thead>
            <tbody>
                {review.map((e, idx) => (
                  <tr key={`review+${idx}`}>
                    <td>{e.reviewDate}</td>
                    <td>{e.count}</td>
                    <td><Link to={`/voca/review/${e.id}`}>{e.vocaTitle}</Link></td>
                    <td>{e.createdDate.split("T")[0]}</td>
                    <td>
                      <Button size="sm" variant="soft" color="danger" onClick={() => handleDeleteButton(idx, e.id)}>제거</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Sheet>
      </Box>
    </Box>
  );
};

export default VocaMyPage;
