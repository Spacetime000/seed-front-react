import { Box, Sheet, Table, Typography, Button, Link } from "@mui/joy";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VocaReview = () => {
  const params = useParams();
  const [contents, setContents] = useState([]);
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(1);

  const fetchData = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/review/${params.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setTitle(res.data.vocaTitle);
        setContents(res.data.contents);
        setCount(res.data.count);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

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
      <Typography level="h3">{title}</Typography>

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
              <th>단어</th>
              <th>뜻</th>
              <th>예문</th>
              <th>예문 해석</th>
            </tr>
          </thead>
          <tbody>
            {contents.map((e, i) => (
              <tr key={`word-${i}`}>
                <td style={{ textAlign: "center" }}>{e.spelling}</td>
                <td style={{ wordBreak: "break-all", textAlign: "center" }}>
                  {e.meaning}
                </td>
                <td>{e.example}</td>
                <td style={{ wordBreak: "break-all" }}>{e.exampleMeaning}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 3 }}>
        <Button underline="none" component={Link} href={`/voca/review/meaning/${params.id}`}>
          연습모드-뜻
        </Button>
        <Button underline="none" component={Link} href={`/voca/review/spelling/${params.id}`}>
          연습모드-스펠링
        </Button>
        <Button underline="none" component={Link} href={`/voca/review/test/${params.id}`}>
          테스트
        </Button>
      </Box>
    </Box>
  );
};

export default VocaReview;
