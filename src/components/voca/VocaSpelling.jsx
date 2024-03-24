import { Box, Sheet, Table, Button, Link } from "@mui/joy";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const VocaSpelling = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [status, setStatus] = React.useState([]);

  const fetchData = React.useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/voca/${params.vocaId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data;
        setData(data);
        setStatus(new Array(data.contents.length).fill(false));
      })
      .catch(() => {
        navigate("/voca", { replace: true });
      });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (<Box
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
            <th>뜻</th>
            <th>단어</th>
          </tr>
        </thead>
        <tbody>
          {data.contents &&
            data.contents.map((e, i) => (
              <tr key={`word-${i}`}>
                <td style={{ textAlign: "center" }}>{e.meaning}</td>
                {status[i] ? (
                  <td style={{ textAlign: "center" }}>{e.spelling}</td>
                ) : (
                  <td style={{ textAlign: "center" }}>
                    <Button
                      onClick={() => {
                        const newArray = [...status];
                        newArray[i] = !status[i];
                        setStatus(newArray);
                      }}
                    >
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
      <Button component={Link} href={`/voca/${params.vocaId}`}>전체보기</Button>
    </Box>
  </Box>)
};

export default VocaSpelling;
