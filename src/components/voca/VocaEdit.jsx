import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Typography,
  Button,
  Sheet,
  Table,
} from "@mui/joy";

const VocaEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [title, setTitle] = useState([]);
  const [inputContent, setInputContent] = useState([]);
  const [content, setContent] = useState([]);

  const handleDeleteButton = (i) => {
    setContent((prev) => {
      const newArray = [...prev];
      newArray.splice(i, 1);
      return newArray;
    });
  };

  const handleInputEnter = (e) => {
    if (e.key === "Enter") {
      const inp = inputContent.split("|");
      if (inp.length >= 2 && inp[0].trim().length !== 0 && inp[1].trim().length !== 0) {
        setContent(content.concat({
          spelling: inp[0],
          meaning : inp[1],
          example : inp[2],
          exampleMeaning : inp[3]
        }));
        setInputContent("");
      } else {
        alert("단어와 뜻은 필수로 입력해주세요");
      }
    }
  };

  const handleSubmit = () => {
    const data = {
      id: params.vocaId,
      title: title,
      contents: content
    };

    axios.put(`${process.env.REACT_APP_BASE_URL}/voca`, data, {
      headers: {
        Authorization : "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then(() => {
      navigate(`/voca/${params.vocaId}`, {replace: true})
    }).catch(() => {
      navigate(`/voca`, {replace: true})
    });
  };

  const fetchData = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/voca/${params.vocaId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.contents);
      })
      .catch(() => {
        navigate("/voca", { replace: true });
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
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100dvh",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography level="h1" sx={{ mb: 2 }}>
          단어 수정
        </Typography>
        <Button sx={{ height: "30px" }} onClick={handleSubmit}>저장</Button>
      </Box>
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ my: 2 }}>
        <FormLabel>입력</FormLabel>
        <Input
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          size="sm"
          placeholder="단어, 뜻, 예문, 예문 해석 순으로 작성 ex) apple|사과|This is apple|이것은 사과다"
          onKeyUp={handleInputEnter}
        />
      </FormControl>
      <Sheet
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
          flex: 1,
          my: 2,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
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
          }} 
        >
          <thead>
            <tr>
              <th style={{textAlign: "center", padding: "12px 6px"}}>
                단어
              </th>
              <th style={{textAlign: "center", padding: "12px 6px"}}>
                뜻
              </th>
              <th style={{textAlign: "center", padding: "12px 6px"}}>
                예문
              </th>
              <th style={{textAlign: "center", padding: "12px 6px"}}>
                예문 해석
              </th>
              <th style={{width: "144px"}} />
            </tr>
          </thead>
          <tbody>
            {content.map((e, i) => (
              <tr key={`word-${i}`}>
                <td style={{textAlign: "center"}}>{e.spelling}</td>
                <td style={{wordBreak: "break-all", textAlign: "center"}}>{e.meaning}</td>
                <td>{e.example}</td>
                <td style={{wordBreak: "break-all"}}>{e.exampleMeaning}</td>
                <td style={{textAlign: "center"}}>
                  <Button size="sm" variant="soft" color="danger" onClick={() => handleDeleteButton(i)}>제거</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
};

export default VocaEdit;
