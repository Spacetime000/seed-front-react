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
import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const VocaCreate = () => {
  const navigate = useNavigate();
  const [inputContent, setInputContent] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState([]);


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

  const handleDeleteButton = (i) => {
    setContent((prev) => {
      const newArray = [...prev];
      newArray.splice(i, 1);
      return newArray;
    });
  };

  const handleSubmit = () => {
    const data = {
      title: title,
      contents: content
    };

    axios.post(`${process.env.REACT_APP_BASE_URL}/voca`, data, {
      headers: {
        Authorization : "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then((res) => {
      const data = res.data;
      navigate(`/voca/${data.id}`, {replace: true})
    })
  };

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
      <Typography level="h1" sx={{ mb: 2 }}>
        단어 생성
      </Typography>
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />
      </FormControl>
      <FormControl sx={{ my: 2 }}>
        <FormLabel>입력</FormLabel>
        <Input
          value={inputContent}
          onChange={(e) => {
            setInputContent(e.target.value);
          }}
          onKeyUp={handleInputEnter}
          size="sm"
          placeholder="단어, 뜻, 예문, 예문 해석 순으로 작성 ex) apple|사과|This is an apple|이것은 사과다"
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
      {/* 위치 바꾸기 */}
      <Button size="lg" sx={{my: 2,}} onClick={() => handleSubmit()}>저장</Button> 
    </Box>
  );
};

export default VocaCreate;
