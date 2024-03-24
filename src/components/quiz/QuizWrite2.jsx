import {
  Box,
  Button,
  RadioGroup,
  Sheet,
  Typography,
  Radio,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Select,
  Option,
  Chip,
  Divider,
} from "@mui/joy";
import * as React from "react";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import axios from "axios";
// import AddRoundedIcon from "@mui/icons-material/AddRounded";
// import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

// const categories = [
//   { code: "영어 코드", name: "코드" },
//   { code: "영코", name: "한코" },
// ];

const QuizWrite2 = () => {
  const [uploadedFile, setUploadedFile] = React.useState("");
  const [questionType, setQuestionType] = React.useState("객관식");
  const [question, setQuestion] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [answerNumber, setAnswerNumber] = React.useState(0);
  const inputRef = React.useRef([]);
  const [category, setCategory] = React.useState("");
  const [quizzes, setQuizzes] = React.useState([]);
  const [inputAnswer, setInputAnswer] = React.useState("");
  const [categories, setCategories] = React.useState(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/quiz/category`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then((res) => setCategories(res.data));
  });

  // const [optionCount, setOptionCount] = React.useState(2);

  const handleFileChange = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setAnswerNumber(Number(e.target.value));
  };

  const handleCategoryChange = (e, value) => {
    setCategory(value);
  };

  const handleCreateClick = () => {
    // console.log(title);
    // console.log(category);
    // console.log(quizzes);
    console.log(categories);
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("category", category);
    // formData.append("quizzes", quizzes);

    // await axios.post(`${process.env.REACT_APP_BASE_URL}/quiz`, formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: "Bearer " + localStorage.getItem("accessToken"),
    //   },
    // }).then(() => {console.log("완")});

  };

  // const handleOptionCount = (e) => {
  //   setAnswerNumber(0);

  //   if (e.currentTarget.name === "plus") {
  //     if (optionCount < 5) {
  //       setOptionCount(optionCount + 1);
  //     } else {
  //       alert("최대 5개 까지입니다.");
  //     }
  //   } else if (e.currentTarget.name === "minus") {
  //     if (optionCount > 2) {
  //       setOptionCount(optionCount - 1);
  //     } else {
  //       alert("최소 2개입니다.");
  //     }
  //   }
  // };

  //내용 다시 쓰는 경우가 꽤 있음.
  const handleClickAdd = () => {
    const quiz = {
      question: question,
      category: questionType,
      options: inputRef.current.map((e) => e.value),
      answer: inputRef.current[answerNumber].value,
      img: uploadedFile,
    };
    setQuizzes(quizzes.concat(quiz));

  };

  const handleClickAdd2 = () => {
    const quiz = {
      question: question,
      category: questionType,
      answer: inputAnswer,
      img: uploadedFile,
    };

    setQuizzes(quizzes.concat(quiz));
  };

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
          },
          p: 5,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {/* 머리 + 버튼 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography level="h3">문제 등록</Typography>
          <Button
            color="primary"
            size="sm"
            startDecorator={<HistoryEduRoundedIcon />}
            onClick={handleCreateClick}
          >
            등록
          </Button>
        </Box>

        {/* 카테고리 */}
        <FormControl>
          <FormLabel sx={{ fontWeight: "bold", fontSize: "16px" }}>
            카테고리
          </FormLabel>
          <Select onChange={handleCategoryChange} placeholder="선택해주세요.">
            {/* {categories.map((e) => (
              <Option key={e.code} value={e.code}>
                {e.name}
              </Option>
            ))} */}
            {
              categories.map((e) => (
                <Option key={e.name} value={e.name}>
                  {e.name}
                </Option>
              ))
            }
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            제목
          </FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="sm"
            placeholder="제목을 입력해주세요."
          />
        </FormControl>
        <RadioGroup
          orientation="horizontal"
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
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
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
              size="sm"
              placeholder="문제를 입력해주세요."
            />
          </FormControl>
          <Button
            component="label"
            variant="outlined"
            color="neutral"
            startDecorator={<AttachFileRoundedIcon />}
          >
            {uploadedFile ? "이미지가 첨부됨" : "이미지 업로드"}
            <input
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
          </Button>
        </Box>
        {questionType === "객관식" ? (
          <>
            {/* <Box sx={{ display: "flex" }}>
              <IconButton
                name="plus"
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={handleOptionCount}
              >
                <AddRoundedIcon />
              </IconButton>
              <IconButton size="sm" variant="outlined" color="neutral">
                {optionCount}
              </IconButton>
              <IconButton
                name="minus"
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={handleOptionCount}
              >
                <RemoveRoundedIcon />
              </IconButton>
            </Box> */}
            <RadioGroup
              sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
            >
              {Array(5)
                .fill()
                .map((_, i) => (
                  <Box
                    key={`ra${i}`}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Radio
                      checked={answerNumber === i}
                      value={i}
                      onChange={handleChange}
                    />
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
            <Button onClick={handleClickAdd}>추가</Button>
          </>
        ) : (
          <>
            <Input value={inputAnswer} onChange={(e) => setInputAnswer(e.target.value)} placeholder="해답을 입력해주세요." />
            <Button onClick={handleClickAdd2}>추가</Button>
          </>
        )}

        {quizzes.map((e, idx) => (
          <Box>
            <Divider />
            <Chip
              sx={{ mt: 1 }}
              color={{ 객관식: "danger", 주관식: "primary" }[e.category]}
            >
              {e.category}
            </Chip>
            <Typography level="title-md" sx={{ fontWeight: "bold", my: 2, wordBreak: "break-all" }}>
              {`${idx + 1}. ${e.question}`}
            </Typography>
            {e.img && <img src={URL.createObjectURL(e.img)} alt={e.img.name} />}
            {e.hasOwnProperty("options") && (
              <RadioGroup size="lg" sx={{ gap: 1.5, my: 2 }}>
                {e.options.map((opt) => (
                  <Sheet sx={{ p: 1, borderRadius: "md", boxShadow: "sm" }}>
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
            {e.category === "주관식" && <Typography>{e.answer}</Typography>}
          </Box>
        ))}
      </Sheet>
    </Box>
  );
};

export default QuizWrite2;
