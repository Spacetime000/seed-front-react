import { Box, Input, Button, Link } from "@mui/joy";
import * as React from "react";

const Admin = () => {
  return (
    <Box
      sx={{
        width: "100%",
        pt: "calc(12px + var(--Header-height))",
        px: 6,
        marginBottom: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
        height: "100vh",
      }}
    >
      <Box sx={{display: "flex", gap: 1.5, justifyContent: "center"}}>
        <Button component={Link} href="/admin/quiz/category">
          Quiz 카테고리 관리
        </Button>
        <Button component={Link} href="/admin/member">
          로그인 회원 보기
        </Button>
      </Box>
    </Box>
  );
};

export default Admin;
