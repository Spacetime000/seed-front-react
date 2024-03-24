import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Sheet from "@mui/joy/Sheet";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/joy/IconButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Checkbox from "@mui/joy/Checkbox";
import Link from "@mui/joy/Link";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Chip from "@mui/joy/Chip";
import Dropdown from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ContentPasteRoundedIcon from "@mui/icons-material/ContentPasteRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";

const rows = [
  {
    id: "1",
    title: "초코칩 쿠키",
    status: "Success",
    category: "정보처리기사",
    date: "2015.01.19",
  },
  {
    id: "2",
    title: "머랭쿠키",
    status: "Plan",
    category: "영단어",
    date: "2017.01.18",
  },
  {
    id: "3",
    title: "두비두밥",
    status: "Pend",
    category: "펀드투자상담사",
    date: "2017.01.18",
  },
  {
    id: "4",
    title: "아메리카노",
    status: "Pend",
    category: "펀드투자상담사",
    date: "2017.01.18",
  },
  {
    id: "5",
    title: "대머리 독수리",
    status: "Pend",
    category: "정보처리기사",
    date: "2017.01.18",
  },
  {
    id: "6",
    title: "가발",
    status: "Success",
    category: "펀드투자상담사",
    date: "2017.01.18",
  }
];

const rowss = [
  {
    id: "INV-1234",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "O",
      name: "Olivia Ryhe",
      email: "olivia@email.com",
    },
  },
  {
    id: "INV-1233",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "S",
      name: "Steve Hampton",
      email: "steve.hamp@email.com",
    },
  },
  {
    id: "INV-1232",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "C",
      name: "Ciaran Murray",
      email: "ciaran.murray@email.com",
    },
  },
  {
    id: "INV-1231",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "M",
      name: "Maria Macdonald",
      email: "maria.mc@email.com",
    },
  },
  {
    id: "INV-1230",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "C",
      name: "Charles Fulton",
      email: "fulton@email.com",
    },
  },
  {
    id: "INV-1229",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "J",
      name: "Jay Hooper",
      email: "hooper@email.com",
    },
  },
  {
    id: "INV-1228",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "K",
      name: "Krystal Stevens",
      email: "k.stevens@email.com",
    },
  },
  {
    id: "INV-1227",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "S",
      name: "Sachin Flynn",
      email: "s.flyn@email.com",
    },
  },
  {
    id: "INV-1226",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "B",
      name: "Bradley Rosales",
      email: "brad123@email.com",
    },
  },
  {
    id: "INV-1225",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "O",
      name: "Olivia Ryhe",
      email: "olivia@email.com",
    },
  },
  {
    id: "INV-1224",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "S",
      name: "Steve Hampton",
      email: "steve.hamp@email.com",
    },
  },
  {
    id: "INV-1223",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "C",
      name: "Ciaran Murray",
      email: "ciaran.murray@email.com",
    },
  },
  {
    id: "INV-1221",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "M",
      name: "Maria Macdonald",
      email: "maria.mc@email.com",
    },
  },
  {
    id: "INV-1220",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "C",
      name: "Charles Fulton",
      email: "fulton@email.com",
    },
  },
  {
    id: "INV-1219",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "J",
      name: "Jay Hooper",
      email: "hooper@email.com",
    },
  },
  {
    id: "INV-1218",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "K",
      name: "Krystal Stevens",
      email: "k.stevens@email.com",
    },
  },
  {
    id: "INV-1217",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "S",
      name: "Sachin Flynn",
      email: "s.flyn@email.com",
    },
  },
  {
    id: "INV-1216",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "B",
      name: "Bradley Rosales",
      email: "brad123@email.com",
    },
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

const renderFilters = () => (
  <>
    <FormControl size="sm">
      <FormLabel>분류</FormLabel>
      <Select size="sm" placeholder="All">
        <Option value="all">All</Option>
        <Option value="t">정보처리기사</Option>
        <Option value="a">펀드투자상담사</Option>
        <Option value="s">영단어</Option>
      </Select>
    </FormControl>
    <FormControl size="sm">
      <FormLabel>상태</FormLabel>
      <Select size="sm" placeholder="All">
        <Option value="all">All</Option>
        <Option value="t">예정</Option>
        <Option value="a">보류</Option>
        <Option value="s">완료</Option>
      </Select>
    </FormControl>
  </>
);

const Schedule = () => {
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [selected, setSelected] = React.useState([]);

  return (
    <>
      {/* 모바일 필터 */}
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
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          sx={{ zIndex: "10000" }}
        >
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>

      {/* 필터 */}
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
          />
        </FormControl>
        {renderFilters()}
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
              <th
                style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
              >
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== rows.length
                  }
                  checked={selected.length === rows.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? rows.map((row) => row.id) : []
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === rows.length
                      ? "primary"
                      : undefined
                  }
                  sx={{ verticalAlign: "text-bottom" }}
                />
              </th>
              <th style={{ width: "auto", padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform:
                        order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                    },
                  }}
                >
                  제목
                </Link>
              </th>
              <th style={{ width: 160, padding: "12px 6px", textAlign: "center" }}>Status</th>
              <th style={{ width: 160, padding: "12px 6px", textAlign: "center" }}>Date</th>
              <th style={{ width: 50, padding: "12px 6px" }}> </th>
            </tr>
          </thead>
          <tbody>
            {stableSort(rows, getComparator(order, "title")).map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: "center", width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    color={selected.includes(row.id) ? "primary" : undefined}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.id)
                          : ids.filter((itemId) => itemId !== row.id)
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </td>
                <td>
                  <Typography level="body-xs">{row.title}</Typography>
                </td>

                <td style={{textAlign: "center"}}>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        Success: <CheckRoundedIcon />,
                        Plan: <ContentPasteRoundedIcon />,
                        Pend: <HourglassEmptyRoundedIcon />,
                      }[row.status]
                    }
                    color={
                      {
                        Success: "success",
                        Plan: "neutral",
                        Pend: "danger",
                      }[row.status]
                    }
                  >
                    {row.status}
                  </Chip>
                </td>
                <td>
                  <Typography sx={{ textAlign: "center" }} level="body-xs">
                    {row.date}
                  </Typography>
                </td>
                <td>
                  <Box sx={{ alignItems: "center" }}>
                    <RowMenu />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

    </>
  );
};

export default Schedule;
