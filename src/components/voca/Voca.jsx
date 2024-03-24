import { Box, Sheet, Table, Typography, Button, Link } from "@mui/joy";
import axios from "axios";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Voca = (props) => {
  const { name } = props;
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/voca/${params.vocaId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then((res) => {
      const data = res.data;
      setData(data);
    }).catch((err) => {
      navigate("/voca", {replace: true})
    }); 

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
      <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <Typography level="h3">{data.title}</Typography>
        {data.createBy === name && <Button underline="none" component={Link} href={`/voca/edit/${params.vocaId}`}>수정</Button>}
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
          // flex: 1,
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
            {data.contents && data.contents.map((e, i) => (
              <tr key={`word-${i}`}>
                <td style={{textAlign: "center"}}>{e.spelling}</td>
                <td style={{wordBreak: "break-all", textAlign: "center"}}>{e.meaning}</td>
                <td>{e.example}</td>
                <td style={{wordBreak: "break-all"}}>{e.exampleMeaning}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      {/* 버튼 */}
      <Box sx={{display: "flex", justifyContent: "center", gap: 3, mb: 3}}>
        <Button underline="none" component={Link} href={`/voca/meaning/${params.vocaId}`}>연습모드-뜻</Button>
        <Button underline="none" component={Link} href={`/voca/spelling/${params.vocaId}`}>연습모드-스펠링</Button>
        <Button underline="none" component={Link} href={`/voca/test/${params.vocaId}`}>테스트</Button>
      </Box>
    </Box>
  );
};

export default Voca;
