import {
  Box,
  FormControl,
  FormLabel,
  Typography,
  Input,
  Select,
  Option,
  Button,
  Sheet,
  Table,
  Link,
  Chip,
  Dropdown,
  MenuButton,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/joy";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import axios from "axios";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const QuizMyPage = () => {
  const [categories, setCategories] = React.useState([]);
  const [quizzes, setQuizzes] = React.useState([]);
  const [inputSearch, setInputSearch] = React.useState("");
  const [selectCategory, setSelectCategory] = React.useState("");

  const handleToggleVisibility = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/quiz/${id}/toggle-visibility`,
        undefined,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      )
      .then(() => {
        setQuizzes((e) =>
          e.map((t) => (t.id === id ? { ...t, visibility: !t.visibility } : t))
        );
      });
  };

  const handleDeleteClick = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/quiz/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
      });
  };

  const handleSearch = (e) => {
    let url = `${process.env.REACT_APP_BASE_URL}/quiz/my-page`;
    let param = "";

    if (e.key === "Enter") {
      if (inputSearch.trim()) {
        param = param.concat(`search=${inputSearch}`);
      }

      if (selectCategory) {
        if (param) {
          param = param.concat(`&`);
        }
        param = param.concat(`category=${selectCategory}`)
      }

      if (param) {
        url = url.concat("?");
      }

      url = url.concat(param);

      axios.get(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }).then((res) => setQuizzes(res.data));
    }
  };

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/quiz/category`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => setCategories(res.data));

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/quiz/my-page`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => setQuizzes(res.data));
  }, []);

  return (
    <Box
      sx={{
        pt: "calc(12px + var(--Header-height))",
        px: { xs: 2, md: 6 },
        minWidth: 0,
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <Typography level="h2">작성한 문제 목록</Typography>

      {/* 검색 목록 및 필터 */}
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
            onKeyUp={handleSearch}
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>분류</FormLabel>
          <Select
            size="sm"
            placeholder="All"
            onChange={(_, value) => setSelectCategory(value)}
          >
            <Option value="">All</Option>
            {categories.map((e) => (
              <Option key={e.name} value={e.name}>
                {e.name}
              </Option>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* 테이블 */}
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
              <th
                style={{ width: 150, textAlign: "center", padding: "12px 6px" }}
              >
                분류
              </th>
              <th style={{ textAlign: "center", padding: "12px 6px" }}>제목</th>
              <th
                style={{ width: 150, padding: "12px 6px", textAlign: "center" }}
              >
                작성일
              </th>
              <th
                style={{
                  width: 150,
                  padding: "12px 6px",
                  textAlign: "center",
                }}
              >
                공개/비공개
              </th>
              <th style={{ width: 50, padding: "12px 6px" }}> </th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((e) => (
              <tr key={e.id}>
                <td style={{ textAlign: "center" }}>
                  <Typography level="body-xs">{e.category}</Typography>
                </td>
                <td>
                  <Typography
                    level="body-xs"
                    component={Link}
                    href={`/quiz/${e.id}`}
                  >
                    {e.title}
                  </Typography>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Typography>{e.createdDate.split("T")[0]}</Typography>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        true: <LockOpenRoundedIcon />,
                        false: <LockRoundedIcon />,
                      }[e.visibility]
                    }
                    color={
                      {
                        true: "primary",
                        false: "danger",
                      }[e.visibility]
                    }
                  >
                    {e.visibility === true ? "공개" : "비공개"}
                  </Chip>
                </td>
                <td>
                  <Dropdown>
                    <MenuButton
                      slots={{ root: IconButton }}
                      slotProps={{
                        root: {
                          variant: "plain",
                          color: "neutral",
                          size: "sm",
                        },
                      }}
                    >
                      <MoreHorizRoundedIcon />
                    </MenuButton>
                    <Menu size="sm" sx={{ minWidth: 140 }}>
                      {e.visibility === true ? (
                        <MenuItem onClick={() => handleToggleVisibility(e.id)}>
                          비공개
                        </MenuItem>
                      ) : (
                        <MenuItem onClick={() => handleToggleVisibility(e.id)}>
                          공개
                        </MenuItem>
                      )}
                      <MenuItem component={Link} href={`/quiz/${e.id}/write`}>
                        Edit
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        color="danger"
                        onClick={() => handleDeleteClick(e.id)}
                      >
                        Delete
                      </MenuItem>
                    </Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
};

export default QuizMyPage;
