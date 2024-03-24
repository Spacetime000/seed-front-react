import React, { useCallback, useEffect, useState } from "react";
import { Box, Sheet, Table, Button, Link, Typography, Input } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const VocaTest = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [answerInput, setAnswerInput] = useState("");
  const [openResult, setOpenResult] = useState(false);
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);

  const fetchData = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/voca/${params.vocaId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data;
        setData(data);
        setMaxIndex(data.contents.length);
      })
      .catch(() => {
        navigate("/voca", { replace: true });
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleResult = () => {

    setAnswer(answer.concat(answerInput));
    const tmpAnswer = answer.concat(answerInput);
    setAnswerInput("");
    setOpenResult(!openResult);

    const contents = data.contents;
    let answerCounter = 0;
    let wrongCounter = 0;

    contents.forEach((content, idx) => {
      if (content.spelling === tmpAnswer[idx]) {
        answerCounter += 1;
      } else {
        wrongCounter += 1;
      }
    });
    setRight(answerCounter);
    setWrong(wrongCounter);
  };

  const handleClickNext = () => {
    setAnswer(answer.concat(answerInput));
    setAnswerInput("");
    setIndex(index + 1);
  };

  const handleInputEnter = (e, i) => {
    if (e.key === "Enter") {
      if (index + 1 === maxIndex) {
        handleResult();
      } else {
        setAnswer(answer.concat(answerInput));
        setAnswerInput("");
        setIndex(index + 1);
      }
    }
  };

  const handleReviewClick = (day) => {
    const data = {
      id : params.vocaId,
      day : day
    };

    axios.post(`${process.env.REACT_APP_BASE_URL}/review`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then(() => navigate("/voca/my-page", {replace: true}));
  };

  return (
    <Box
      sx={{
        width: "100%",
        pt: "calc(12px + var(--Header-height))",
        px: 6,
        marginBottom: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: openResult ? "initial" : "center",
        justifyContent: openResult ? "initial" : "center",
      }}
    >
      {openResult ? (
        <Box>
          <Typography level="h2" color="primary">
            정답률 :{" "}
            {right > 0
              ? `${((right / data.contents.length) * 100).toFixed(2)}`
              : 0}{" "}
            %
          </Typography>
          <Typography level="h2" color="success">
            맞춘 갯수 : {right} 개
          </Typography>
          <Typography level="h2" color="danger">
            틀린 갯수 : {wrong} 개
          </Typography>
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
                  <th>문제</th>
                  <th>답</th>
                  <th>내가 작성한 답</th>
                </tr>
              </thead>
              <tbody>
                {data.contents.map((e, i) => (
                  <tr key={`word-${i}`}>
                    <td style={{textAlign: "center"}}>{e.meaning}</td>
                    <td style={{textAlign: "center"}}>{e.spelling}</td>
                    <td style={{textAlign: "center"}}>{answer[i]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1.5
          }}>
            <Button color="success" onClick={() => handleReviewClick(5)}>쉬움 : 5일 뒤</Button>
            <Button color="primary" onClick={() => handleReviewClick(3)}>보통 : 3일 뒤</Button>
            <Button color="danger" onClick={() => handleReviewClick(1)}>어려움 : 1일 뒤</Button>
            <Button color="neutral" component={Link} underline="none" href="/voca">목록</Button>
          </Box>
        </Box>
      ) : maxIndex === 0 ? (
        <Typography level="h1" sx={{ textAlign: "center" }}>
          아무것도 없습니다.
        </Typography>
      ) : (
        <Sheet
          variant="outlined"
          sx={{ borderRadius: "sm", width: "600px", p: 3 }}
        >
          <Typography level="h3" sx={{ mb: 3 }}>
            {data.contents[index].meaning}
          </Typography>
          <Input
            value={answerInput}
            onChange={(e) => {
              setAnswerInput(e.target.value);
            }}
            placeholder="답을 입력해주세요."
            sx={{ mb: 3 }}
            onKeyUp={(e) => handleInputEnter(e)}
          />
          {index + 1 === maxIndex ? (
            <Button sx={{ width: "100%", mb: 3 }} onClick={handleResult}>
              결과보기
            </Button>
          ) : (
            <>
              <Button
                sx={{ width: "100%", mb: 3 }}
                onClick={() => handleClickNext()}
              >
                다음
              </Button>
              <Typography sx={{ textAlign: "center" }}>
                {index + 1} / {data.contents.length}
              </Typography>
            </>
          )}
        </Sheet>
      )}
    </Box>
  );
};

export default VocaTest;