import * as React from "react";
import {
  Sheet,
  Box,
  Breadcrumbs,
  Button,
  Link,
  Typography,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Divider,
  IconButton,
  Stack,
  List,
  ListItem,
  ListItemContent,
} from "@mui/joy";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";

const NoticeEdit = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [noticeAttachmentList, setNoticeAttachmentList] = React.useState([]);
  const [removeAttachmentList, setRemoveAttachmentList] = React.useState([]);
  const params = useParams();
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const files = event.target.files;
    setUploadedFiles(files);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("id", params.noticeId);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("removeAttachmentIds", removeAttachmentList);

    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append("files", uploadedFiles[i]);
    }

    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/notice/${params.noticeId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      )
      .then(() => {
        navigate(`/notice/${params.noticeId}`, { replace: true });
      });
  };

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/notice/${params.noticeId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        const data = response.data;
        setTitle(data.title);
        setContent(data.content);
        setNoticeAttachmentList(data.noticeAttachmentList);
      });
  }, [params.noticeId]);

  return (
    <Box
      sx={{
        px: { xs: 2, md: 6 },
        pt: {
          xs: "calc(12px + var(--Header-height))",
          sm: "calc(12px + var(--Header-height))",
          md: 3,
        },
        pb: { xs: 2, sm: 2, md: 3 },
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="sm" />}
          sx={{ pl: 0 }}
        >
          <Link
            underline="none"
            color="primary"
            href="/notice"
            aria-label="Notice"
          >
            <NotificationsActiveRoundedIcon />
            <Typography fontWeight={500} fontSize={12}>
              Notice
            </Typography>
          </Link>
        </Breadcrumbs>
      </Box>

      <Sheet
        variant="outlined"
        sx={{
          borderRadius: "sm",
          p: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          flexShrink: 0,
        }}
      >
        <FormControl>
          <Box
            sx={{
              display: "flex",
              mb: 1,
              gap: 1,
              justifyContent: "space-between",
            }}
          >
            <FormLabel>TITLE</FormLabel>
            <Button
              color="primary"
              startDecorator={<HistoryEduRoundedIcon />}
              size="sm"
              onClick={handleSubmit}
            >
              수정
            </Button>
          </Box>

          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>CONTENT</FormLabel>
          <Textarea
            maxRows={20}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></Textarea>
        </FormControl>
        <Divider />
        <Stack direction="row" alignItems="center" flexGrow={1}>
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
            {uploadedFiles.length > 0 && uploadedFiles.length + "개 첨부"}
          </IconButton>
        </Stack>
        {Array.isArray(noticeAttachmentList) &&
          noticeAttachmentList.length > 0 && (
            <List>
              {noticeAttachmentList.map((e) => (
                <ListItem sx={{ marginY: "3px" }}>
                  <ListItemContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: "bold",
                    }}
                  >
                    <Typography level="body-sm" noWrap>
                      {e.originalName}
                    </Typography>
                    <Button
                      size="sm"
                      variant="soft"
                      sx={{ whiteSpace: "noWrap", marginX: "5px" }}
                      onClick={() => {
                        setRemoveAttachmentList([
                          ...removeAttachmentList,
                          e.id,
                        ]);
                        setNoticeAttachmentList(
                          noticeAttachmentList.filter((at) => at.id !== e.id)
                        );
                      }}
                    >
                      삭제
                    </Button>
                  </ListItemContent>
                </ListItem>
              ))}
            </List>
          )}
      </Sheet>
    </Box>
  );
};

export default NoticeEdit;
