import * as React from "react";
import axios from "axios";
import { Box, Typography, Button, Link, Sheet, Table } from "@mui/joy";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";

const VocaList = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/voca`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data;
        setData(data);
      });
  }, []);
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
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h1">단어</Typography>
        <Button
          component={Link}
          href="/voca/write"
          underline="none"
          color="primary"
          startDecorator={<HistoryEduRoundedIcon />}
        >
          작성
        </Button>
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
          mt: 3,
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
              <th style={{ padding: "12px 6px", textAlign: "center"}}>제목</th>
              <th style={{width: 150, padding: "12px 6px", textAlign: "center"}}>작성자</th>
              <th style={{width: 150, padding: "12px 6px", textAlign: "center"}}>작성날짜</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr key={`data+${e.id}`}>
                <td>
                  <Typography
                    level="title-sm"
                    component={Link}
                    href={`/voca/${e.id}`}
                  >
                    {e.title}
                  </Typography>
                </td>
                <td>
                  <Typography sx={{textAlign: "center"}}>
                    {e.createBy}
                  </Typography>
                </td>
                <td>
                  <Typography sx={{textAlign: "center"}}>
                    {e.createdDate.split("T")[0]}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
};

export default VocaList;
