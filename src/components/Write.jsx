import * as React from "react";
import Box from "@mui/joy/Box";
import ModalClose from "@mui/joy/ModalClose";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import Sheet from "@mui/joy/Sheet";
import { IconButton, Input, Stack, Typography } from "@mui/joy";
import FormatColorTextRoundedIcon from "@mui/icons-material/FormatColorTextRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import axios from "axios";
import { checkTokenExpiration } from "../modules/my";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Write = React.forwardRef(({ open, onClose }, ref) => {
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleFileChange = (event) => {
    const files = event.target.files;
    setUploadedFiles(files);
  };

  const handleSubmit = async () => {
    checkTokenExpiration();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append("files", uploadedFiles[i]);
    }

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/admin/notice/write`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        onClose();
        // navigate("/notice", {replace: true});
        window.location.replace("/notice");
      })
      .catch((error) => {
        if (error.response.status === 400 && error.response.data.title) {
          alert(error.response.data.title);
        }
      });
  };

  return (
    <Sheet
      ref={ref}
      sx={{
        alignItems: "center",
        px: 1.5,
        py: 1.5,
        ml: "auto",
        width: { xs: "90dvw", md: 600 },
        flexGrow: 1,
        border: "1px solid",
        borderRadius: "8px 8px 0 0",
        backgroundColor: "background.level1",
        borderColor: "neutral.outlinedBorder",
        boxShadow: "lg",
        zIndex: 1000,
        position: "fixed",
        bottom: 0,
        right: 24,
        transform: open ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s ease",
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography level="title-sm" sx={{ fontWeight: "bold" }}>
          새로운 공지사항
        </Typography>
        <ModalClose id="close-icon" onClick={onClose} />
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, flexShrink: 0 }}
      >
        <FormControl>
          <FormLabel>TITLE</FormLabel>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="공지제목을 입력해주세요."
            aria-label="Title"
          />
        </FormControl>

        <FormControl sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Textarea
            placeholder="내용을 입력해주세요."
            aria-label="Content"
            onChange={(e) => setContent(e.target.value)}
            minRows={8}
            maxRows={10}
            endDecorator={
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                flexGrow={1}
                sx={{
                  py: 1,
                  pr: 1,
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                <div>
                  <IconButton
                    size="sm"
                    variant="plain"
                    color="neutral"
                    component="label"
                  >
                    <AttachFileRoundedIcon />
                    <input
                      type="file"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    {uploadedFiles.length > 0 &&
                      uploadedFiles.length + "개 첨부"}
                  </IconButton>
                </div>
                <Button
                  color="primary"
                  sx={{ borderRadius: "sm" }}
                  onClick={handleSubmit}
                >
                  등록
                </Button>
              </Stack>
            }
            sx={{
              "& textarea:first-of-type": {
                minHeight: 72,
              },
            }}
          />
        </FormControl>
      </Box>
    </Sheet>
  );
});

export default Write;
