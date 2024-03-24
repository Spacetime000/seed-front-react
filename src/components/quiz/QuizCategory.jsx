import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Input,
  Button,
  Link,
  Sheet,
  Typography,
  FormControl,
  FormLabel,
  Table,
} from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const QuizCategory = () => {
  const [category, setCategory] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const fetchData = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/quiz/category`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setCategory(res.data);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const submit = () => {
    const data = {
      name : inputValue
    }
    axios.post(`${process.env.REACT_APP_BASE_URL}/quiz/category`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then(() => {
      setCategory(category.concat(data));
      setInputValue("");
    });
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  const handleDeleteClick = (name) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/quiz/category/${name}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then(() => {
      setCategory(category.filter(o => o.name !== name));
    });
  };

  return (
    <Box
      sx={{
        pt: "calc(12px + var(--Header-height))",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        px: { xs: 2, md: 6 },
        height: "100dvh",
      }}
    >
      <Typography level="h3">카테고리 관리</Typography>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", gap: 1.5 }}>
        <FormControl sx={{ flex: 1 }}>
          <FormLabel>카테고리</FormLabel>
          <Input
            size="sm"
            placeholder="추가할 카테고리를 입력해주세요."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            startDecorator={<SearchIcon />}
            onKeyUp={(e) => handleKeyUp(e)}
          />
        </FormControl>
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "end"}}>
          <Button onClick={() => submit()}>추가</Button>
        </Box>
      </Box>
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
              <th>카테고리</th>
              <th style={{ width: "144px" }}></th>
            </tr>
          </thead>
          <tbody>
            {category.map((e, i) => (
              <tr key={`category-${i}`}>
                <td style={{ textAlign: "center" }}>{e.name}</td>
                <td>
                  <Button size="sm" variant="soft" color="danger" onClick={() => handleDeleteClick(e.name)}>
                    제거
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

export default QuizCategory;
