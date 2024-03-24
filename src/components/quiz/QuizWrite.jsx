import {
  Box,
  Chip,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Sheet,
  Typography,
  Input,
  Button,
  Divider,
  Card,
} from "@mui/joy";
import axios from "axios";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";

const QuizWrite = () => {
  const params = useParams();
  const navigate = useNavigate();
  const inputRef = React.useRef([]);
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [selectCategory, setSelectCategory] = React.useState("객관식");
  const [inputQuestion, setInputQuestion] = React.useState("");
  const [uploadFile, setUploadFile] = React.useState();
  const [answerNumber, setAnswerNumber] = React.useState(0);
  const [questions, setQuestions] = React.useState([]);
  const [inputAnswer, setInputAnswer] = React.useState("");

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/quiz/${params.quizId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data;

        const base64 = localStorage
          .getItem("accessToken")
          .replace("Bearer ", "")
          .split(".")[1]
          .replace(/-/g, "+")
          .replace(/_/g, "/");
        const decoded = JSON.parse(
          decodeURIComponent(
            window
              .atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          )
        );

        if (decoded.sub !== data.createBy) {
          navigate("/quiz");
          return;
        }

        setTitle(data.title);
        setCategory(data.category);
        if (data.questions !== null) {
          setQuestions(data.questions);
        }
      });
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        pt: "calc(12px + var(--Header-height))",
        marginBottom: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: {
            xs: "100%",
            sm: "600px",
            lg: "1200px",
          },
          p: 5,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <Chip color="primary">{category}</Chip>
        <Typography level="h3">{title}</Typography>
        <RadioGroup
          orientation="horizontal"
          value={selectCategory}
          onChange={(e) => setSelectCategory(e.target.value)}
          sx={{
            minHeight: 48,
            padding: "4px",
            borderRadius: "12px",
            bgcolor: "neutral.softBg",
            "--RadioGroup-gap": "4px",
            "--Radio-actionRadius": "8px",
          }}
        >
          {["객관식", "주관식"].map((item) => (
            <Radio
              key={item}
              color="neutral"
              value={item}
              disableIcon
              label={item}
              variant="plain"
              sx={{
                px: 2,
                alignItems: "center",
                fontWeight: "bold",
                flex: 1,
                textAlign: "center",
              }}
              slotProps={{
                action: ({ checked }) => ({
                  sx: {
                    ...(checked && {
                      bgcolor: "background.surface",
                      boxShadow: "sm",
                      "&:hover": {
                        bgcolor: "background.surface",
                      },
                    }),
                  },
                }),
              }}
            />
          ))}
        </RadioGroup>

        {/* 추가 필드 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <FormControl>
            <FormLabel
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              문제
            </FormLabel>
            <Input
              value={inputQuestion}
              size="sm"
              onChange={(e) => setInputQuestion(e.target.value)}
            />
          </FormControl>
          <Button
            component="label"
            variant="outlined"
            color="neutral"
            startDecorator={<AttachFileRoundedIcon />}
          >
            {uploadFile ? "이미지가 첨부됨" : "이미지 업로드"}
            <input
              onChange={(e) => {
                setUploadFile(e.target.files[0]);
              }}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
          </Button>
        </Box>
        {selectCategory === "객관식" ? (
          <>
            <RadioGroup
              sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
              onChange={(e) => setAnswerNumber(Number(e.target.value))}
            >
              {Array(5)
                .fill()
                .map((_, i) => (
                  <Box
                    key={`op${i}`}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Radio checked={answerNumber === i} value={i} />
                    <Input
                      slotProps={{
                        input: {
                          ref: (e) => (inputRef.current[i] = e),
                        },
                      }}
                      sx={{ flex: 1 }}
                    />
                  </Box>
                ))}
            </RadioGroup>
            <Button
              onClick={() => {
                const quiz = {
                  question: inputQuestion,
                  category: selectCategory,
                  options: inputRef.current.map((e) => e.value),
                  answer: inputRef.current[answerNumber].value,
                  img: uploadFile,
                };

                axios
                  .post(
                    `${process.env.REACT_APP_BASE_URL}/quiz/${params.quizId}`,
                    quiz,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization:
                          "Bearer " + localStorage.getItem("accessToken"),
                      },
                    }
                  )
                  .then((res) => {
                    setQuestions(res.data);
                  })
                  .catch((error) => {
                    if (error.response && error.response.status === 403) {
                      alert("접근 권한이 없습니다.");
                    }
                  });
              }}
            >
              추가
            </Button>
          </>
        ) : (
          <>
            <Input
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
            />
            <Button
              onClick={() => {
                const quiz = {
                  question: inputQuestion,
                  category: selectCategory,
                  answer: inputAnswer,
                  img: uploadFile,
                };

                axios
                  .post(
                    `${process.env.REACT_APP_BASE_URL}/quiz/${params.quizId}`,
                    quiz,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization:
                          "Bearer " + localStorage.getItem("accessToken"),
                      },
                    }
                  )
                  .then((res) => {
                    setQuestions(res.data);
                  })
                  .catch((error) => {
                    if (error.response && error.response.status === 403) {
                      alert("접근 권한이 없습니다.");
                    }
                  });
              }}
            >
              추가
            </Button>
          </>
        )}

        {/* 문제 list */}
        {questions.map((e, idx) => (
          <Box key={`question${idx}`}>
            <Divider />
            <Chip
              sx={{ mt: 1 }}
              color={{ 객관식: "danger", 주관식: "primary" }[e.category]}
            >
              {e.category}
            </Chip>
            <Typography
              level="title-md"
              sx={{ fontWeight: "bold", my: 2, wordBreak: "break-all" }}
            >
              {`${idx + 1}. ${e.question}`}
            </Typography>
            {e.img && (
              <img
                style={{ marginBottom: "20px" }}
                src={`${process.env.REACT_APP_BASE_URL}${e.img}`}
              />
            )}
            {e.options && (
              <RadioGroup size="lg" sx={{ gap: 1.5, my: 2 }}>
                {e.options.map((opt, optIdx) => (
                  <Sheet
                    key={`r-${idx}-${optIdx}`}
                    sx={{ p: 1, borderRadius: "md", boxShadow: "sm" }}
                  >
                    <Radio
                      label={opt}
                      disableIcon
                      overlay
                      checked={opt === e.answer}
                      slotProps={{
                        label: ({ checked }) => ({
                          sx: {
                            fontWeight: "lg",
                            fontSize: "md",
                            color: checked && "red",
                          },
                        }),
                        action: ({ checked }) => ({
                          sx: (theme) => ({
                            ...(checked && {
                              "--variant-borderWidth": "2px",
                              "&&": {
                                borderColor: theme.vars.palette.primary[500],
                              },
                            }),
                          }),
                        }),
                      }}
                    />
                  </Sheet>
                ))}
              </RadioGroup>
            )}
            {e.category === "주관식" && (
              <Card variant="outlined">
                <Typography level="h4">{e.answer}</Typography>
              </Card>
            )}
          </Box>
        ))}
      </Sheet>
    </Box>
  );
};

export default QuizWrite;
