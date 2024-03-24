import {
  Sheet,
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Divider,
  Card,
  CardOverflow,
  AspectRatio,
  Button,
} from "@mui/joy";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import * as React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const Notice = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [createdDate, setCreatedDate] = React.useState("");
  const [noticeAttachmentList, setNoticeAttachmentList] = React.useState([]);
  const params = useParams();
  const member = useSelector((state) => state.member);

  const handleClick = async (url, fileName) => {
    const file = await fetch(url);
    const blob = await file.blob();
    const curl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = fileName;
    link.href = curl;
    document.body.appendChild(link);
    link.click();
    link.remove();
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
        setCreatedDate(data.createdDate);
        setNoticeAttachmentList(data.noticeAttachmentList);
      });
  }, []);

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
        }}
      >
        <Typography
          level="title-lg"
          sx={{
            mb: 1,
          }}
        >
          {title}
        </Typography>
        <Typography
          level="title-sm"
          sx={{
            mb: 2,
          }}
        >
          {createdDate.split("T")[0]}
        </Typography>
        <Divider />
        <Typography level="body-sm" mt={2} mb={2} sx={{whiteSpace: 'pre-line'}}>
          {content}
        </Typography>
        <Divider />
        {/* 첨부파일 */}
        {Array.isArray(noticeAttachmentList) &&
        noticeAttachmentList.length === 0 ? (
          <Typography
            level="title-sm"
            sx={{
              fontWeight: "bold",
            }}
            mt={2}
            mb={2}
          >
            첨부파일이 없습니다.
          </Typography>
        ) : (
          <>
            <Typography
              level="title-sm"
              sx={{
                fontWeight: "bold",
              }}
              mt={2}
              mb={2}
            >
              첨부파일
            </Typography>
            <Box
              sx={(theme) => ({
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                "& > div": {
                  boxShadow: "none",
                  "--Card-padding": "0px",
                  "--Card-radius": theme.vars.radius.sm,
                },
              })}
            >
              {noticeAttachmentList.map((e) => {
                const ext = e.fileName
                  .substr(e.fileName.lastIndexOf(".") + 1)
                  .toLowerCase();
                if (
                  ext == "jpg" ||
                  ext == "png" ||
                  ext == "gif" ||
                  ext == "bmp"
                ) {
                  return (
                    <Card variant="outlined">
                      <AspectRatio ratio="1" sx={{ minWidth: 80 }} component={Link} onClick={() => handleClick(`${process.env.REACT_APP_BASE_URL}${e.filePath}`, e.originalName)}>
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}${e.filePath}`}
                          alt={e.originalName}
                        />
                      </AspectRatio>
                    </Card>
                  );
                } else {
                  return <Card variant="outlined" orientation="horizontal">
                  <CardOverflow>
                    <AspectRatio ratio="1" sx={{ minWidth: 80 }}>
                      <div>
                        <FolderIcon />
                      </div>
                    </AspectRatio>
                  </CardOverflow>
                  <Box sx={{ py: { xs: 1, sm: 2 }, pr: 2 }}>
                    <Typography level="title-sm" color="primary" component={Link} onClick={() => handleClick(`${process.env.REACT_APP_BASE_URL}${e.filePath}`, e.originalName)} >
                      {e.originalName}
                    </Typography>
                    <Typography level="body-xs">
                      {
                        e.fileSize < 1024 ? `${e.fileSize}Byte`
                        : e.fileSize < (1024 * 1024) ? `${(e.fileSize/1024).toFixed(2)} KB`
                        : e.fileSize < (1024 * 1024 * 1024) ? `${(e.fileSize/(1024*1024)).toFixed(2)} MB`
                        : `${(e.fileSize/(1024*1024*1024)).toFixed(2)} GB`
                      }
                    </Typography>
                  </Box>
                </Card>
                }
              })}
            </Box>
          </>
        )}


      </Sheet>
    </Box>
  );
};

export default Notice;
