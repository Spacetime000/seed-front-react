import * as React from "react";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import { FocusTrap } from "@mui/base/FocusTrap";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import Sheet from "@mui/joy/Sheet";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Table from "@mui/joy/Table";
import Dropdown from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";
import IconButton from "@mui/joy/IconButton";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListDivider from "@mui/joy/ListDivider";
import Chip from "@mui/joy/Chip";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import { useDispatch, useSelector } from "react-redux";
import Write from "../components/Write";
import { jwtPayLoad, checkTokenExpiration } from "../modules/my";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NoticePage = () => {
  const [open, setOpen] = React.useState(false);
  const [notice, setNotice] = React.useState([]);
  const [original, setOriginal] = React.useState([]);
  const payload = jwtPayLoad(localStorage.getItem("accessToken"));
  const member = useSelector((state) => state.member);
  const [edit, setEdit] = React.useState(false);

  const toggleVisibility = (id) => {
    checkTokenExpiration();
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_BASE_URL}/admin/notice/${id}/toggle-visibility`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then(() => {
      setOriginal((e) =>
        e.map((t) => (t.id === id ? { ...t, status: !t.status } : t))
      );
      setNotice((e) =>
        e.map((t) => (t.id === id ? { ...t, status: !t.status } : t))
      );
    });
  };

  const handleDeleteClick = (id) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}/notice/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then(() => {
      setOriginal((e) => e.filter((t) => t.id !== id));
      setNotice((e) => e.filter((t) => t.id !== id));
    });
  };

  function RowMenu(id, status) {
    return (
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{
            root: { variant: "plain", color: "neutral", size: "sm" },
          }}
        >
          <MoreHorizRoundedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          {status == true ? (
            <MenuItem onClick={() => toggleVisibility(id)}>Private</MenuItem>
          ) : (
            <MenuItem onClick={() => toggleVisibility(id)}>Public</MenuItem>
          )}
          <MenuItem component={Link} href={`/notice/${id}/edit`}>
            Edit
          </MenuItem>
          <Divider />
          <MenuItem color="danger" onClick={() => handleDeleteClick(id)}>
            Delete
          </MenuItem>
        </Menu>
      </Dropdown>
    );
  }

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setNotice(
        original.filter((value) => value.title.includes(e.target.value))
      );
      e.target.value = "";
    }
  };

  // React.useEffect(() => {
  //   checkTokenExpiration();
  //   if (payload.role === "ROLE_ADMIN") {
  //     axios
  //       .get(`${process.env.REACT_APP_BASE_URL}/admin/notice`, {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("accessToken"),
  //         },
  //       })
  //       .then((response) => {
  //         const notices = response.data.map((e) => ({
  //           id: e.id,
  //           title: e.title,
  //           createdDate: e.createdDate,
  //           status: e.status,
  //         }));
  //         setNotice(notices);
  //         setOriginal(notices);
  //       });
  //   } else {
  //     axios
  //       .get(`${process.env.REACT_APP_BASE_URL}/notice`, {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("accessToken"),
  //         },
  //       })
  //       .then((response) => {
  //         const notices = response.data.map((e) => ({
  //           id: e.id,
  //           title: e.title,
  //           createdDate: e.createdDate,
  //         }));
  //         setNotice(notices);
  //         setOriginal(notices);
  //       });
  //   }
  // }, []);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/notice`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (member.role === "ROLE_ADMIN") {
          const notices = res.data.map((e) => ({
            id: e.id,
            title: e.title,
            createdDate: e.createdDate,
            status: e.status,
          }));
          setNotice(notices);
          setOriginal(notices);
        } else {
          const notices = res.data.map((e) => ({
            id: e.id,
            title: e.title,
            createdDate: e.createdDate,
          }));
          setNotice(notices);
          setOriginal(notices);
        }
      });
  }, [member]);

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
          <Link
            underline="none"
            color="primary"
            href="/notice"
            aria-label="Notice"
          >
            <NotificationsActiveRoundedIcon />
            <Typography fontWeight={500} fontSize={12}>
              Notice
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
        <Typography level="h2">
          공지사항
        </Typography>
        {member.role === "ROLE_ADMIN" && (
          <Button
            color="primary"
            startDecorator={<HistoryEduRoundedIcon />}
            size="sm"
            onClick={() => setOpen(true)}
          >
            작성
          </Button>
        )}
      </Box>

      {/* 모바일 검색 필드 */}
      <Sheet
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
          sx={{ flexGrow: 1 }}
          onKeyUp={handleSearch}
        />
      </Sheet>

      {/* 검색 필드 */}
      <Box
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
            onKeyUp={handleSearch}
          />
        </FormControl>
      </Box>

      {/* 테이블 */}
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
              <th style={{ width: "auto", padding: "12px" }}>제목</th>
              {member.role === "ROLE_ADMIN" && (
                <th
                  style={{
                    width: 150,
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  공개/비공개
                </th>
              )}

              <th
                style={{ width: 150, padding: "12px 6px", textAlign: "center" }}
              >
                작성날짜
              </th>
              {member.role === "ROLE_ADMIN" && (
                <th style={{ width: 50, padding: "12px 6px" }}> </th>
              )}
            </tr>
          </thead>
          <tbody>
            {notice.map((e) => (
              <tr key={e.id}>
                <td style={{ padding: "0 12px" }}>
                  <Typography
                    level="body-xs"
                    component={Link}
                    href={`/notice/${e.id}`}
                  >
                    {e.title}
                  </Typography>
                </td>
                {member.role === "ROLE_ADMIN" && (
                  <td style={{ textAlign: "center" }}>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={
                        {
                          true: <LockOpenRoundedIcon />,
                          false: <LockRoundedIcon />,
                        }[e.status]
                      }
                      color={
                        {
                          true: "primary",
                          false: "danger",
                        }[e.status]
                      }
                    >
                      {e.status === true ? "public" : "private"}
                    </Chip>
                  </td>
                )}

                <td>
                  <Typography sx={{ textAlign: "center" }} level="body-xs">
                    {e.createdDate.split("T")[0]}
                  </Typography>
                </td>
                {member.role === "ROLE_ADMIN" && (
                  <td>
                    <Box sx={{ alignItems: "center" }}>
                      {RowMenu(e.id, e.status)}
                    </Box>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      {/* 모바일 테이블 */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        {notice.map((e) => (
          <List
            key={e.id}
            size="sm"
            sx={{
              "--ListItem-paddingX": 0,
            }}
          >
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <ListItemContent
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <div>
                  <Typography fontWeight={600} gutterBottom>
                    {e.title}
                  </Typography>
                  {member.role === "ROLE_ADMIN" && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 0.5,
                        mb: 1,
                      }}
                    >
                      <Chip
                        variant="soft"
                        size="sm"
                        startDecorator={
                          {
                            true: <LockOpenRoundedIcon />,
                            false: <LockRoundedIcon />,
                          }[e.status]
                        }
                        color={
                          {
                            true: "primary",
                            false: "danger",
                          }[e.status]
                        }
                      >
                        {e.status === true ? "public" : "private"}
                      </Chip>
                      <Typography level="body-xs">
                        {e.createdDate.split("T")[0]}
                      </Typography>
                    </Box>
                  )}
                </div>
                {member.role === "ROLE_ADMIN" && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    {RowMenu(e.id, e.status)}
                  </Box>
                )}
              </ListItemContent>
            </ListItem>
            <ListDivider />
          </List>
        ))}
      </Box>

      <FocusTrap open={open} disableAutoFocus disableEnforceFocus>
        <Write open={open} onClose={() => setOpen(false)} />
      </FocusTrap>
    </Box>
  );
};

export default NoticePage;
