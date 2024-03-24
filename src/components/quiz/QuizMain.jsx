import {
  Box,
  FormControl,
  FormLabel,
  Typography,
  Input,
  Select,
  Option,
  IconButton,
  Sheet,
  Table,
  Link,
  Button,
  iconButtonClasses,
  Modal,
  ModalDialog,
  DialogTitle,
  Stack,
} from "@mui/joy";
import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";

const QuizMain = () => {
  const limit = 10;
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [select, setSelect] = useState("");
  const [input, setInput] = useState("");

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/quiz/category`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => setCategories(res.data));
  };

  useEffect(() => {
    fetchData();

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/quiz`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  const offset = (currentPage - 1) * limit;

  const handleCreateClick = () => {
    const data = {
      title: title,
      category: category,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/quiz`, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        navigate(`/quiz/${res.data.id}/write`, { replace: true });
        return;
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleKeyUp = (e) => {
  
    let url = `${process.env.REACT_APP_BASE_URL}/quiz`;
    let params = "";

    if (e.key === "Enter") {
      if (input.trim()) {
        params = params.concat(`search=${input}`);
      }

      if (select) {
        if (params) {
          params = params.concat(`&`);
        }
        params = params.concat(`category=${select}`);
      }

      if (params) {
        url = url.concat("?");
      }

      url = url.concat(params);

      axios.get(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }).then((res) => setPosts(res.data));
    }
  };

  return (
    <Box
      sx={{
        pt: "calc(12px + var(--Header-height))",
        px: { xs: 2, md: 6 },
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minWidth: 0,
        height: "100dvh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2">문제</Typography>
        <Button
          color="primary"
          size="sm"
          startDecorator={<HistoryEduRoundedIcon />}
          underline="none"
          onClick={() => setWriteModalOpen(true)}
        >
          작성
        </Button>
      </Box>

      {/* PC */}
      <Box
        sx={{
          py: 2,
          display: { xs: "none", sm: "flex" },
          gap: 1.5,
          "& > *": {
            minWidth: "160px",
          },
        }}
      >
        <FormControl sx={{ flex: 1 }}>
          <FormLabel>Search</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
            onKeyUp={(e) => handleKeyUp(e)}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select size="sm" placeholder="All" onChange={(e, v) => setSelect(v)}>
            <Option value="">All</Option>
            {categories.map((e, i) => (
              <Option key={e.name} value={e.name}>{e.name}</Option>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Sheet
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
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
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 150, textAlign: "center", padding: "12px 6px" }}
              >
                분류
              </th>
              <th style={{ textAlign: "center", padding: "12px 6px" }}>제목</th>
              <th
                style={{ width: 150, padding: "12px 6px", textAlign: "center" }}
              >
                작성자
              </th>
              <th
                style={{ width: 150, padding: "12px 6px", textAlign: "center" }}
              >
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.slice(offset, offset + limit).map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: "center", padding: "12px 6px" }}>
                  <Typography level="body-sm">{row.category}</Typography>
                </td>
                <td style={{ padding: "12px 6px" }}>
                  <Typography
                    level="title-sm"
                    component={Link}
                    href={`/quiz/${row.id}`}
                  >
                    {row.title}
                  </Typography>
                </td>
                <td style={{ padding: "12px 6px", textAlign: "center" }}>
                  <Typography>{row.createBy}</Typography>
                </td>
                <td style={{ textAlign: "center", padding: "12px 6px" }}>
                  <Typography>{row.createdDate.split("T")[0]}</Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      {/* 모바일 */}
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flex: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
      </Box>

      {/* PC Page */}
      <Box
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: { xs: "none", sm: "flex" },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {Array(Math.ceil(posts.length / limit))
          .fill()
          .map((_, i) => (
            <IconButton
              sx={{
                color: currentPage === i + 1 && "red",
              }}
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              size="sm"
              variant="outlined"
            >
              {i + 1}
            </IconButton>
          ))}
        <Box sx={{ flex: 1 }} />
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
          disabled={currentPage === Math.ceil(posts.length / limit)}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </Box>
      {/* PC Page */}

      <Modal open={writeModalOpen} onClose={() => setWriteModalOpen(false)}>
        <ModalDialog>
          <DialogTitle>문제 생성</DialogTitle>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>제목</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>카테고리</FormLabel>
              <Select
                onChange={(e, value) => setCategory(value)}
                placeholder="선택해주세요."
              >
                {categories &&
                  categories.map((e) => (
                    <Option key={e.name} value={e.name}>
                      {e.name}
                    </Option>
                  ))}
              </Select>
            </FormControl>
            <Button onClick={handleCreateClick}>등록</Button>
          </Stack>
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default QuizMain;
