import {
  Box,
  Button,
  Checkbox,
  Chip,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Radio,
  RadioGroup,
  Sheet,
  Typography,
} from "@mui/joy";
import * as React from "react";
import QuizResult from "./QuizResult";
import { useParams } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const params = useParams();
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [questions, setQuestions] = React.useState();
  const [inputAnswer, setInputAnswer] = React.useState("");
  const [openResult, setOpenResult] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState([]);


  const handleNext = () => {
    // setQuizzes(
    //   quizzes.map((quiz, idx) =>
    //     index === idx ? { ...quiz, userAnswer: selected } : quiz
    //   )
    // );
    setIndex(index + 1);
    // setSelected("");
  };

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/quiz/${params.quizId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data;
        setTitle(data.title);
        setCategory(data.category);
        setQuestions(data.questions);
      });
  }, []);

  return (
    <Box
      sx={{
        pt: "calc(12px + var(--Header-height))",
        px: { xs: 2, md: 6 },
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        flex: 1,
        minWidth: 0,
        height: "100dvh",
        overflow: "auto",
      }}
    >
      <Chip color="primary">{category}</Chip>
      <Typography level="h1" sx={{ textAlign: "center" }}>
        {title}
      </Typography>

      {questions && (
        <Sheet
          variant="outlined"
          sx={{
            width: {
              xs: "100%",
              sm: "600px",
              lg: "1200px",
            },
            p: 5,
            mb: 5,
          }}
        >
          {openResult ? (
            <QuizResult rows={questions} userAnswer={selectedAnswer} />
          ) : (
            <>
              <Chip
                color={
                  {
                    객관식: "danger",
                    주관식: "primary",
                  }[questions[index].category]
                }
              >
                {questions[index].category}
              </Chip>
              <Typography level="title-md" sx={{ fontWeight: "bold", my: 2 }}>
                {questions[index].question}
              </Typography>

              {questions[index].img && (
                <img
                  src={`${process.env.REACT_APP_BASE_URL}${questions[index].img}`}
                />
              )}

              {questions[index].category === "객관식" ? (
                <RadioGroup
                  size="lg"
                  sx={{ gap: 1.5, my: 2 }}
                  value={inputAnswer}
                  onChange={(e) => setInputAnswer(e.target.value)}
                >
                  {questions[index].options.map((option, idx) => (
                    <Sheet
                      key={`option-${idx}`}
                      sx={{ p: 1, borderRadius: "md", boxShadow: "sm" }}
                    >
                      <Radio
                        label={`${option}`}
                        overlay
                        disableIcon
                        value={option}
                        slotProps={{
                          label: ({ checked }) => ({
                            sx: {
                              fontWeight: "lg",
                              fontSize: "md",
                              color: checked
                                ? "text.primary"
                                : "text.secondary",
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
              ) : (
                <Input
                  value={inputAnswer}
                  onChange={(e) => setInputAnswer(e.target.value)}
                  sx={{ my: 2 }}
                  placeholder="정답을 입력해주세요."
                />
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: [
                    questions.length <= index + 1 ? "center" : "space-between",
                  ],
                }}
              >
                {questions.length <= index + 1 ? (
                  <Button onClick={() => {
                    setSelectedAnswer(selectedAnswer.concat(inputAnswer));
                    setOpenResult(!openResult);
                  }}>결과보기</Button>
                ) : (
                  <>
                    <Typography>{`${index + 1} / ${questions.length
                      }`}</Typography>
                    <Button onClick={async () => {
                      setSelectedAnswer(selectedAnswer.concat(inputAnswer));
                      setInputAnswer("");
                      setIndex(index + 1);
                      }}>다음</Button>
                  </>
                )}
              </Box>
            </>
          )}
        </Sheet>
      )}
    </Box>

    /*<Box
      sx={{
        width: "100%",
        marginTop: "80px",
        marginBottom: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {result ? (
        <QuizResult rows={quizzes} />
      ) : (
        <Sheet
          variant="outlined"
          sx={{
            width: {
              xs: "100%",
              sm: "600px",
            },
            p: 5,
          }}
        >
          <Chip
            color={
              {
                객관식: "danger",
                주관식: "primary",
              }[quizzes[index].category]
            }
          >
            {quizzes[index].category}
          </Chip>
          <Typography level="title-md" sx={{ fontWeight: "bold", my: 2 }}>
            {quizzes[index].question}
          </Typography>
          {quizzes[index].hasOwnProperty("img") && (
            <img
              src={`${process.env.REACT_APP_BASE_URL}${quizzes[index].img}`}
            />
          )}
          {quizzes[index].hasOwnProperty("options") ? (
            <RadioGroup size="lg" sx={{ gap: 1.5, my: 2 }}>
              {quizzes[index].options.map((value) => (
                <Sheet
                  key={value}
                  sx={{ p: 1, borderRadius: "md", boxShadow: "sm" }}
                >
                  <Radio
                    label={`${value}`}
                    overlay
                    disableIcon
                    value={value}
                    checked={selected == value}
                    onChange={handleChange}
                    slotProps={{
                      label: ({ checked }) => ({
                        sx: {
                          fontWeight: "lg",
                          fontSize: "md",
                          color: checked ? "text.primary" : "text.secondary",
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
          ) : (
            <Input
              value={selected}
              onChange={handleChange}
              sx={{ my: 2 }}
              placeholder="정답을 입력해주세요."
            />
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button disabled={index < 1} onClick={() => setIndex(index - 1)}>
              이전
            </Button>
            <Typography level="title-lg">{`${index + 1}/${
              quizzes.length
            }`}</Typography>

            {quizzes.length > index + 1 ? (
              <Button
                onClick={() => handleNext()}
              >
                다음
              </Button>
            ) : (
              <Button onClick={() => {
                handleNext();
                setResult(!result);
              }}>제출</Button>
            )}
          </Box>
        </Sheet>
      )}
    </Box>*/
  );
};

export default Quiz;
