import React, { useState } from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";

const Quill = styled(ReactQuill)`
  height: 400px;
  margin: 0px;
  margin-bottom: 50px;
  padding: 10px;
  width: 100%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  @media (min-width: 768px) {
    width: 768px;
  }

  @media (min-width: 1024px) {
    width: 1024px;
  }
`;

const Editor = () => {
  const [quillText, setQuillText] = useState("");

  console.log(quillText);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block", "link", "image"],
    ],
  };
  return (
    <Quill
      theme="snow"
      placeholder="내용을 작성해주세요."
      modules={modules}
      value={quillText}
      onChange={setQuillText}
    />
  );
};

export default Editor;
