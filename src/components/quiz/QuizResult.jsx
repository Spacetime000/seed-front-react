import {
  Box,
  Button,
  Chip,
  Divider,
  Radio,
  RadioGroup,
  Sheet,
  Typography,
} from "@mui/joy";
import * as React from "react";

const QuizResult = (props) => {
  const { rows, userAnswer } = props;
  const [right, setRight] = React.useState(0);
  const [wrong, setWrong] = React.useState(0);

  React.useEffect(() => {
    let answerCounter = 0;
    let wrongCounter = 0;

    rows.forEach((row, idx) => {
      if (row.answer === userAnswer[idx]) {
        answerCounter += 1;
      } else {
        wrongCounter += 1;
      }
    });

    setRight(answerCounter);
    setWrong(wrongCounter);
  }, []);

  return (
    <Box>
      <Typography level="h2" color="primary">
        정답률 : {right > 0 ? `${((right / rows.length) * 100).toFixed(2)}` : 0}{" "}
        %
      </Typography>
      <Typography level="h2" color="success">
        맞춘 갯수 : {right} 개
      </Typography>
      <Typography level="h2" color="danger">
        틀린 갯수 : {wrong} 개
      </Typography>
      {rows.map((e, i) => (
        <>
          <Divider sx={{ marginBottom: 2 }} />
          <Box sx={{ my: 2 }}>
            <Chip
              color={
                {
                  객관식: "danger",
                  주관식: "primary",
                }[e.category]
              }
            >
              {e.category}
            </Chip>
            <Typography
              level="title-md"
              sx={{ fontWeight: "bold", my: 2 }}
              color={e.answer === userAnswer[i] ? "success" : "danger"}
            >
              {e.question}
            </Typography>

            {e.img && (
              <img
                style={{ marginBottom: "20px" }}
                src={`${process.env.REACT_APP_BASE_URL}${e.img}`}
              />
            )}

            {e.category === "객관식" ? (
              <>
                <RadioGroup size="lg" sx={{ gap: 1.5, my: 2 }}>
                  {e.options.map((value) => (
                    <Sheet sx={{ p: 1, borderRadius: "md", boxShadow: "sm" }}>
                      <Radio
                        overlay
                        checked={value === userAnswer[i] || e.answer === value}
                        disableIcon
                        label={value}
                        slotProps={{
                          label: ({ checked }) => ({
                            sx: (theme) => ({
                              ...(checked && {
                                color:
                                  value === userAnswer[i]
                                    ? theme.vars.palette.success[500]
                                    : theme.vars.palette.danger[500],
                              }),
                              fontWeight: "lg",
                              fontSize: "md",
                            }),
                          }),
                          action: ({ checked }) => ({
                            sx: (theme) => ({
                              ...(checked && {
                                "--variant-borderWidth": "2px",
                                "&&": {
                                  borderColor:
                                    value === userAnswer[i]
                                      ? theme.vars.palette.success[500]
                                      : theme.vars.palette.danger[500],
                                },
                              }),
                            }),
                          }),
                        }}
                      />
                    </Sheet>
                  ))}
                </RadioGroup>
                <Typography>답 : {e.answer}</Typography>
              </>
            ) : (
              <>
                <Typography level="title-lg">내가 작성한 답안</Typography>
                <Typography>{userAnswer[i] || "미기입"}</Typography>
                <Typography level="title-lg" mt={2}>
                  답
                </Typography>
                <Typography>{e.answer}</Typography>
              </>
            )}
          </Box>
        </>
      ))}
    </Box>
  );
};

export default QuizResult;
