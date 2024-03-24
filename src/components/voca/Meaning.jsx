import { Box, Button, Sheet, Table, Link } from "@mui/joy";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Meaning = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([]);
  const [status, setStatus] = useState([]);

  const fetchData = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/review/${params.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setTitle(res.data.title);
        setContents(res.data.contents);
        setStatus(new Array(res.data.contents.length).fill(false));
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
            </tr>
          </thead>
          <tbody>
            {contents.map((e, i) => (
              <tr key={`word-${i}`}>
                <td style={{ textAlign: "center" }}>{e.spelling}</td>
                {status[i] ? (
                    <td style={{ textAlign: "center" }}>{e.meaning}</td>
                ) : (
                    <td style={{textAlign: "center"}}>
                        <Button onClick={() => {
                            const newArray = [...status];
                            newArray[i] = !status[i];
                            setStatus(newArray);
                        }}>
                            보기
                        </Button>
                    </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button component={Link} href={`/voca/review/${params.id}`}>전체보기</Button>
      </Box>
    </Box>
  );
};

export default Meaning;
